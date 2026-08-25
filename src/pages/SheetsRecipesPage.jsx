import { useState } from 'react'
import Breadcrumb from '../components/Breadcrumb.jsx'
import Callout from '../components/Callout.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import InteractiveExample from '../components/InteractiveExample.jsx'
import PageNav from '../components/PageNav.jsx'
import StepGuide from '../components/StepGuide.jsx'

const recipes = [
  {
    title: '자동 출석부',
    difficulty: '쉬움',
    badgeClass: 'badge',
    time: '15분',
    summary: '이름 옆 출석 칸을 체크하면 출석 인원과 결석자를 자동으로 정리해줘요.',
    steps: [
      { title: '학생 명단 준비하기', description: 'A열에 학생 이름을 한 명씩 적어요.' },
      { title: '출석 칸 만들기', description: 'B열에 "출석"이라고 적을 칸을 만들어요.' },
      { title: '자동으로 세기', description: '=COUNTIF(B2:B31,"출석")로 출석 인원을 계산해요.' },
      { title: '결석자만 걸러보기', description: '필터 기능으로 "출석"이 아닌 줄만 모아 볼 수 있어요.' },
    ],
    prompt: '학생 이름과 출석 여부를 입력하면 출석 인원과 결석자 명단을 자동으로 보여주는 앱스크립트를 만들어줘.',
  },
  {
    title: '객관식 자동채점기',
    difficulty: '보통',
    badgeClass: 'badge badge-secondary',
    time: '25분',
    summary: '정답표와 학생 답안을 비교해 점수를 자동으로 계산해줘요.',
    steps: [
      { title: '정답표 만들기', description: '한 행에 문제별 정답을 순서대로 적어요.' },
      { title: '학생 답안 입력받기', description: '학생마다 한 행에 답안을 순서대로 적어요.' },
      { title: '정답과 비교하기', description: 'Code.gs가 정답표와 답안을 한 칸씩 비교해요.' },
      { title: '점수 표시하기', description: '맞은 개수를 세어 점수 칸에 자동으로 적어줘요.' },
    ],
    code: `function gradeQuiz() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const answers = sheet.getRange('B1:F1').getValues()[0];
  const rows = sheet.getRange(2, 2, sheet.getLastRow() - 1, 5).getValues();

  rows.forEach((row, index) => {
    const score = row.filter((value, col) => value === answers[col]).length;
    sheet.getRange(index + 2, 7).setValue(score);
  });
}`,
    prompt: '정답표와 학생 답안을 비교해서 점수를 G열에 자동으로 적어주는 앱스크립트를 만들어줘.',
  },
  {
    title: '모둠 자동 편성기',
    difficulty: '보통',
    badgeClass: 'badge badge-secondary',
    time: '20분',
    summary: '학생 이름을 무작위로 섞어 정해진 인원수만큼 모둠을 나눠줘요.',
    steps: [
      { title: '학생 명단 준비하기', description: '모둠을 나눌 학생 이름을 목록으로 적어요.' },
      { title: '순서 섞기', description: 'Code.gs가 이름 순서를 무작위로 섞어요.' },
      { title: '모둠별로 나누기', description: '정해둔 인원수만큼 앞에서부터 잘라 모둠을 만들어요.' },
      { title: '새 시트에 정리하기', description: '모둠별 명단을 새 시트에 표로 정리해줘요.' },
    ],
    prompt: '학생 이름 목록을 무작위로 섞어서 4명씩 모둠으로 나누고 새 시트에 정리해주는 앱스크립트를 만들어줘.',
  },
  {
    title: '시간표 생성기',
    difficulty: '도전',
    badgeClass: 'badge badge-warn',
    time: '30분',
    summary: '요일과 교시별 과목을 입력하면 표 형태의 시간표로 정리해줘요.',
    steps: [
      { title: '과목 목록 준비하기', description: '요일, 교시, 과목을 한 줄씩 나열해 적어요.' },
      { title: '표 틀 만들기', description: '요일을 열로, 교시를 행으로 하는 빈 표를 만들어요.' },
      { title: '자동으로 채우기', description: 'Code.gs가 목록을 읽어 알맞은 칸에 과목을 채워줘요.' },
      { title: '완성 확인하기', description: '빈칸이 있으면 "미배정"으로 표시해 놓치지 않게 해요.' },
    ],
    prompt: '요일, 교시, 과목이 적힌 목록을 읽어서 요일별 시간표 표를 자동으로 만들어주는 앱스크립트를 만들어줘.',
  },
]

const surveyResponses = [
  ['1반', 5], ['1반', 4], ['2반', 3], ['2반', 4], ['3반', 5], ['3반', 5], ['1반', 5], ['2반', 2],
]

function SurveyLab() {
  const [summary, setSummary] = useState(null)

  const aggregate = () => {
    const totals = {}
    surveyResponses.forEach(([classroom, score]) => {
      if (!totals[classroom]) totals[classroom] = []
      totals[classroom].push(score)
    })
    const result = Object.entries(totals).map(([classroom, scores]) => (
      `${classroom} 평균 ${Math.round((scores.reduce((sum, value) => sum + value, 0) / scores.length) * 10) / 10}점`
    ))
    setSummary(result)
  }

  return (
    <div className="lotto-lab">
      <div className="lotto-lab-heading">
        <h2>실습: 설문 결과 자동 정리해보기</h2>
        <p>버튼을 누르면 반별 만족도 응답 {surveyResponses.length}건을 모아 반 평균을 계산해요.</p>
      </div>
      <div className="lotto-request"><strong>원본 응답</strong>{surveyResponses.map(([classroom, score]) => `${classroom}:${score}`).join(', ')}</div>
      <div className="lotto-response" aria-live="polite">
        {summary ? summary.join(' / ') : 'aggregateByClass() 실행 결과를 기다리고 있어요.'}
      </div>
      <div className="lotto-actions">
        <button className="button button-primary" type="button" onClick={aggregate}>반별 평균 계산</button>
        {summary && <button className="button button-secondary" type="button" onClick={() => setSummary(null)}>초기화</button>}
      </div>
    </div>
  )
}

const benefits = [
  ['쉬운 코딩', 'AI에게 평소 말로 필요한 기능을 설명하면 코드 초안을 받을 수 있어요. 문법을 모두 외우지 않아도 작은 기능부터 시작할 수 있어요.'],
  ['쉬운 실행과 배포', '코드는 구글 계정에서 실행돼 별도 서버 설치가 필요 없어요. 시트를 공유하거나 웹 앱으로 배포해 다른 사람과 사용할 수 있어요.'],
  ['스프레드시트로 데이터 관리', '학생 명단과 설문 결과를 익숙한 표에서 직접 보고 고칠 수 있어요. 별도 데이터베이스 화면을 만들지 않아도 돼요.'],
  ['구글 도구 연결', '설문 응답을 시트에 모으고, 문서를 만든 뒤, Gmail로 안내하는 흐름을 하나로 연결할 수 있어요.'],
  ['빠른 확인과 수정', '실행 결과가 셀에 바로 보여서 잘못된 부분을 찾기 쉬워요. 결과를 보고 AI에게 수정 요청을 이어갈 수 있어요.'],
]

const demoSteps = [
  {
    label: '말로 요청',
    status: '만들고 싶은 기능과 현재 시트의 구조를 AI에게 알려줘요.',
    title: '코드 대신 필요한 결과부터 설명해요',
    body: '열 이름, 처리 조건, 원하는 결과를 함께 말하면 더 알맞은 코드가 나와요.',
    result: '"A열 학급과 B열 만족도를 읽어 반별 평균을 새 시트에 정리해줘."',
  },
  {
    label: '사본에서 시험',
    status: 'AI가 만든 코드를 연습용 시트에서 먼저 실행해요.',
    title: '결과를 눈으로 바로 확인해요',
    body: '원본을 복사한 시트에서 실행하면 실수해도 원본 자료를 지킬 수 있어요.',
    result: '반별 평균 시트 생성 / 1반 4.2, 2반 3.8, 3반 4.4',
  },
  {
    label: '공유하고 개선',
    status: '잘 작동하면 필요한 사람에게 공유하고 계속 다듬어요.',
    title: '설치 파일 없이 구글 계정으로 사용해요',
    body: '시트를 공유하거나 Apps Script 웹 앱으로 배포할 수 있어요. 학교 계정 정책에 따라 관리자 승인이 필요할 수 있어요.',
    result: '동료 교사에게 시트 공유 / 다음 요청: "평균이 3점 미만인 반만 표시해줘."',
  },
]

function SheetsRecipesPage() {
  return (
    <section className="page-section">
      <div className="container narrow-container">
        <Breadcrumb eyebrow="구글스프레드시트 X 앱스크립트 · 3/3" />
        <h1>둘을 활용한 바이브 코딩</h1>
        <p className="page-description">익숙한 표와 AI를 연결하면 코딩, 데이터 관리, 공유가 한곳에서 이어져요.</p>

        <p>
          스프레드시트가 데이터를 올려두는 작업대라면 앱스크립트는 반복 작업을 맡는 로봇이에요.
          AI는 선생님의 요청을 로봇이 알아듣는 코드로 바꿔주는 통역사 역할을 해요.
        </p>

        <h2>처음 바이브 코딩하기 좋은 이유</h2>
        <div className="benefit-list">
          {benefits.map(([title, description]) => (
            <article className="benefit-item" key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>

        <InteractiveExample
          title="설문 결과 자동 정리하기"
          description="AI에게 요청하고, 사본에서 시험하고, 공유하는 과정을 눌러보세요."
          steps={demoSteps}
        />

        <SurveyLab />

        <figure className="screenshot-figure">
          <img src="/sheets-mockup-survey.png" alt="실제 구글 스프레드시트에서 원본 응답 옆에 AVERAGEIF 함수로 반별 평균(1반 4.7, 2반 3, 3반 5)을 계산해 놓은 화면" />
          <figcaption>실제 스프레드시트에서는 이렇게 보여요. 오른쪽 &ldquo;평균&rdquo; 열이 AVERAGEIF 함수로 자동 계산된 결과예요.</figcaption>
        </figure>

        <h2>교과별 실전 레시피</h2>
        <p>아래 레시피를 눌러 단계와 예시 코드를 확인하고, 마지막 프롬프트를 그대로 AI에게 부탁해보세요.</p>
        <div className="recipe-list">
          {recipes.map((recipe) => (
            <details className="card recipe-card" key={recipe.title}>
              <summary>
                <div className="recipe-summary-text">
                  <h3>{recipe.title}</h3>
                  <p>{recipe.summary}</p>
                </div>
                <div className="recipe-meta">
                  <span className={recipe.badgeClass}>{recipe.difficulty}</span>
                  <span className="recipe-time">⏱ {recipe.time}</span>
                </div>
              </summary>
              <div className="recipe-detail">
                <StepGuide steps={recipe.steps} />
                {recipe.code && <CodeBlock label={`${recipe.title} · Code.gs`} code={recipe.code} />}
                <CodeBlock label="AI에게 요청할 프롬프트" code={recipe.prompt} />
              </div>
            </details>
          ))}
        </div>

        <h2>실제로는 이렇게 보여요</h2>
        <p>레시피의 프롬프트를 AI에게 그대로 전달하면, 스프레드시트와 앱스크립트 화면은 실제로 이런 모습이 돼요.</p>

        <figure className="screenshot-figure">
          <img src="/sheets-mockup-attendance.png" alt="실제 구글 스프레드시트의 자동 출석부 화면. 이름과 출석 여부가 정리되어 있고 COUNTIF 함수로 출석 인원 6명이 계산되어 있음" />
          <figcaption>&ldquo;자동 출석부&rdquo;를 완성하면 실제 스프레드시트가 이렇게 보여요. COUNTIF 함수가 출석 인원을 자동으로 세줘요.</figcaption>
        </figure>

        <figure className="screenshot-figure">
          <img src="/appsscript-mockup-grading.png" alt="실제 구글 앱스크립트 편집기 화면. gradeQuiz 함수 코드와 실행 버튼, 그리고 실행 로그에 채점 결과가 표시됨" />
          <figcaption>&ldquo;객관식 자동채점기&rdquo;의 Code.gs를 실행하면 실제 앱스크립트 편집기와 실행 로그가 이렇게 보여요.</figcaption>
        </figure>

        <Callout tone="tip" title="작게 시작하면 쉬워요">
          한 번에 완성하려 하지 말고 한 가지 기능부터 시험하세요. AI가 만든 코드도 틀릴 수 있으므로
          원본 시트의 사본에서 먼저 실행하고, 권한과 결과를 직접 확인해야 해요.
        </Callout>

        <PageNav prev={['/sheets-appsscript/appsscript-101', '앱스크립트란?']} />
      </div>
    </section>
  )
}

export default SheetsRecipesPage
