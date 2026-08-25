import { useState } from 'react'
import Breadcrumb from '../components/Breadcrumb.jsx'
import Callout from '../components/Callout.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import InteractiveExample from '../components/InteractiveExample.jsx'
import StepGuide from '../components/StepGuide.jsx'

const withoutGem = [
  '매번 "너는 ~한 역할이야"부터 다시 설명해야 해요',
  '대화창을 닫으면 이전에 정한 말투와 규칙이 사라져요',
  '동료 교사와 같은 방식으로 쓰려면 설명을 복사해서 알려줘야 해요',
]

const withGem = [
  '역할과 말투를 한 번만 정해두면 계속 같은 방식으로 답해줘요',
  '새 대화를 열어도 저장해둔 규칙이 그대로 적용돼요',
  '링크를 공유하면 동료 교사도 같은 Gem을 바로 쓸 수 있어요',
]

const buildSteps = [
  { title: 'Gemini 접속하고 Gems 메뉴 열기', description: '왼쪽 메뉴에서 "Gem 관리자"를 선택해요. 처음 만든다면 빈 목록이 보여요.' },
  { title: '새 Gem 만들기', description: '"새로 만들기" 버튼을 누르면 이름과 지침을 입력하는 화면이 나와요.' },
  { title: '이름과 지침 작성하기', description: '어떤 역할을 맡을지, 어떤 말투로 답할지, 결과를 어떤 형태로 보여줄지 적어요.' },
  { title: '저장하고 계속 재사용하기', description: '저장하면 다음부터는 이 Gem을 열기만 해도 같은 방식으로 답해줘요.' },
]

const demoSteps = [
  {
    label: '이름 정하기',
    status: '어떤 일을 맡길 Gem인지 이름부터 정해요.',
    title: '역할이 드러나는 이름이 좋아요',
    body: '"채점 도우미"처럼 무슨 일을 하는지 바로 알 수 있는 이름을 지어요.',
    result: 'Gem 이름: "학부모 안내문 도우미"',
  },
  {
    label: '지침 쓰기',
    status: '이 Gem이 항상 지켜야 할 규칙을 적어요.',
    title: '역할 · 말투 · 형식을 함께 적어요',
    body: '한 번만 자세히 적어두면 이후에는 매번 설명하지 않아도 같은 방식으로 답해줘요.',
    result: '"너는 학급 안내문을 정중하고 다정한 말투로 써주는 도우미야. 항상 인사말-본문-준비물 순서로 정리해줘."',
  },
  {
    label: '바로 쓰기',
    status: '저장한 Gem을 열어 실제 요청을 해봐요.',
    title: '이제부터는 짧게 부탁해도 충분해요',
    body: '역할과 규칙이 이미 저장돼 있어서, 필요한 내용만 말하면 형식에 맞춰 답이 나와요.',
    result: '"다음 주 현장체험학습 안내문 써줘. 날짜는 9월 3일, 장소는 과학관이야." → 형식에 맞춘 안내문 완성',
  },
]

const gemExamples = [
  {
    title: '학생 눈높이 설명 도우미',
    description: '어려운 개념을 초등학생이 이해하기 쉬운 말과 비유로 풀어줘요.',
    instruction: '너는 초등학생에게 어려운 개념을 설명하는 도우미야.\n어려운 낱말 대신 쉬운 말과 일상 속 비유를 사용해줘.\n설명 뒤에는 이해를 확인하는 질문을 하나 만들어줘.',
  },
  {
    title: '학부모 안내문 도우미',
    description: '학급 행사·준비물 안내문을 정중한 말투로 정리해줘요.',
    instruction: '너는 학부모님께 보내는 안내문을 쓰는 도우미야.\n항상 정중하고 다정한 말투를 사용하고, 인사말-본문-준비물-문의처 순서로 정리해줘.\n분량은 5문장을 넘지 않게 해줘.',
  },
  {
    title: '채점 피드백 도우미',
    description: '학생 답안에 대한 격려 중심 피드백 문장을 만들어줘요.',
    instruction: '너는 학생 답안에 피드백을 남기는 도우미야.\n잘한 점을 먼저 칭찬하고, 고칠 점은 부드러운 제안 형태로 말해줘.\n마지막 문장은 항상 응원하는 말로 끝내줘.',
  },
  {
    title: '수업 아이디어 도우미',
    description: '단원 주제에 맞는 활동 아이디어를 여러 개 제안해줘요.',
    instruction: '너는 초등 수업 활동을 제안하는 도우미야.\n내가 단원과 학년을 말하면 준비물이 적게 드는 활동 3가지를 번호 목록으로 제안해줘.\n각 활동은 소요 시간도 함께 적어줘.',
  },
  {
    title: '퀴즈 문제 생성 도우미',
    description: '학습 내용을 알려주면 객관식 퀴즈 문제를 만들어줘요.',
    instruction: '너는 객관식 퀴즈를 만드는 도우미야.\n내가 알려준 내용으로 4지선다 문제 5개를 만들고, 마지막에 정답표를 따로 정리해줘.',
  },
]

const myGemInstruction = `[역할 부여]
당신은 구글 워크스페이스(Google Workspace) 기반 웹 개발과 교육 공학에 능통한 수석 풀스택 개발자입니다.

[목표]
초등학교 학생들을 위한 학습용 웹 애플리케이션과 교사용 대시보드를 구축하려고 합니다. Gemini Canvas 기능을 활용하여 제가 바로 수정하고 적용할 수 있도록 전체 코드와 설치 가이드 문서를 작성해 주세요.

[기술 스택]
- 프론트엔드: HTML, CSS, JavaScript (단일 파일 또는 기능별 분리)
- 백엔드 & API: Google Apps Script (GAS)
- 데이터베이스: Google 스프레드시트

[세부 요구사항]
1. 데이터베이스(스프레드시트) 설계
   - 학생 정보와 학습 상황을 기록할 시트의 구조(헤더 행 데이터)를 명확히 제시해 주세요.
2. 학생 로그인 및 계정 생성
   - 업로드된 학생명단.pdf의 데이터를 바탕으로 학생들의 아이디(ID)는 학생이름으로 하고 비밀번호는 '1234'로 해줘.
   - 웹 접속 시 띄워질 학생용 로그인 UI를 만들어 주세요.
   - 로그인 후 학생들이 자신의 비밀번호를 바꿀 수 있는 기능을 추가해주세요.
3. 학습 페이지 구성
   - 로그인 성공 시, 학생이 학습 상황을 입력하거나 볼 수 있는 간단한 메인 화면을 구성해 주세요.
4. 교사용 대시보드 (관리자 모드)
   - 교사가 전체 학생의 로그인 내역과 학습 진행 상황을 한눈에 조회할 수 있는 대시보드 UI를 만들어 주세요.
   - 관리자 페이지는 별도의 관리자 비밀번호를 입력해야만 접근할 수 있도록 로직을 분리해 주세요.
   - 학생을 추가하거나 삭제할 수 있도록 해주세요.
   - 학생의 비밀번호를 초기화할 수 있도록 해주세요.
5. 설치 방법 문서화
   - 구글 스프레드시트 생성 → Apps Script 열기 → 코드 복사/붙여넣기 → '웹 앱으로 배포'하기까지의 전 과정을 코딩을 모르는 사람도 따라 할 수 있게 Step-by-Step 문서로 작성해 주세요.
   - 코드 수정을 요청하면 업데이트해 주세요.

[코드 검증 및 자체 테스트 (중요)]
- 코드를 출력하기 전에 반드시 내부적으로 코드를 가상 실행(Simulation)하고 논리 흐름을 단계별로 검증해 주세요.
- Google Apps Script 백엔드와 프론트엔드 간의 데이터 통신(google.script.run 등)에 문법적, 구조적 오류가 없는지 철저히 확인하세요.
- 잠재적인 버그와 오류를 최소화하고, 코드가 완벽하게 작동한다고 확신할 때만 최종 결과물을 제공해 주세요. 실행 시 오류가 발생하기 쉬운 주의 구간이 있다면 코드 내에 주석으로 반드시 경고해 주세요.

[출력 형식]
- Code.gs (Apps Script 백엔드 코드)
- Index.html (프론트엔드 및 UI 코드)
- 설치 및 배포 가이드.md`

const roles = [
  ['explain', '학생 눈높이 설명 도우미', '어려운 개념을 초등학생이 이해하기 쉬운 말로 풀어 설명하는 도우미야'],
  ['parent', '학부모 안내문 도우미', '학급 소식과 준비물을 학부모님께 안내하는 글을 쓰는 도우미야'],
  ['feedback', '채점 피드백 도우미', '학생 답안을 보고 격려하는 피드백 문장을 만드는 도우미야'],
  ['idea', '수업 아이디어 도우미', '단원 주제에 맞는 수업 활동 아이디어를 제안하는 도우미야'],
]

const tones = [
  ['friendly', '친근하고 다정하게'],
  ['formal', '정중하고 격식 있게'],
  ['concise', '간결하고 명확하게'],
]

const formats = [
  ['paragraph', '짧은 문단으로'],
  ['list', '번호 목록으로'],
  ['table', '표 형태로'],
]

function GemBuilder() {
  const [roleKey, setRoleKey] = useState('explain')
  const [toneKey, setToneKey] = useState('friendly')
  const [formatKey, setFormatKey] = useState('list')

  const role = roles.find((item) => item[0] === roleKey)
  const tone = tones.find((item) => item[0] === toneKey)
  const format = formats.find((item) => item[0] === formatKey)

  const instruction = `너는 ${role[2]}\n항상 ${tone[1]} 답해줘.\n결과는 ${format[1]} 정리해줘.\n학생 이름 등 개인정보는 실제 정보 대신 가상의 이름으로 예시를 들어줘.`

  return (
    <div className="lotto-lab">
      <div className="lotto-lab-heading">
        <h2>실습: 나만의 Gem 지침 만들어보기</h2>
        <p>역할, 말투, 결과 형식을 골라보세요. 고를 때마다 아래 지침이 실시간으로 바뀌어요.</p>
      </div>

      <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>1. 어떤 역할을 맡길까요?</p>
      <div className="lotto-actions">
        {roles.map(([key, label]) => (
          <button
            className={roleKey === key ? 'deploy-check is-complete' : 'deploy-check'}
            key={key}
            type="button"
            aria-pressed={roleKey === key}
            onClick={() => setRoleKey(key)}
          >
            <span aria-hidden="true">{roleKey === key ? '✓' : '선택'}</span>
            {label}
          </button>
        ))}
      </div>

      <p style={{ fontWeight: 700, margin: '1.25rem 0 0.5rem' }}>2. 어떤 말투로 답할까요?</p>
      <div className="lotto-actions">
        {tones.map(([key, label]) => (
          <button
            className={toneKey === key ? 'deploy-check is-complete' : 'deploy-check'}
            key={key}
            type="button"
            aria-pressed={toneKey === key}
            onClick={() => setToneKey(key)}
          >
            <span aria-hidden="true">{toneKey === key ? '✓' : '선택'}</span>
            {label}
          </button>
        ))}
      </div>

      <p style={{ fontWeight: 700, margin: '1.25rem 0 0.5rem' }}>3. 결과는 어떤 형식으로 보여줄까요?</p>
      <div className="lotto-actions">
        {formats.map(([key, label]) => (
          <button
            className={formatKey === key ? 'deploy-check is-complete' : 'deploy-check'}
            key={key}
            type="button"
            aria-pressed={formatKey === key}
            onClick={() => setFormatKey(key)}
          >
            <span aria-hidden="true">{formatKey === key ? '✓' : '선택'}</span>
            {label}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <CodeBlock label="완성된 지침 (그대로 복사해서 써보세요)" code={instruction} />
      </div>
    </div>
  )
}

function GeminiGemsPage() {
  return (
    <section className="page-section">
      <div className="container narrow-container">
        <Breadcrumb eyebrow="실습 / 자료실" to="/practice" label="목록으로" />
        <h1>Gemini Gems: 나만의 AI 조수 만들기</h1>
        <p className="page-description">역할과 말투를 한 번만 정해두면, 매번 다시 설명하지 않아도 같은 방식으로 도와주는 전용 AI를 만들 수 있어요.</p>

        <p>
          Gems는 학교에 계신 업무 전담 선생님과 비슷해요. 학부모 안내문은 그 일을 맡은 선생님께,
          채점 피드백은 또 다른 담당 선생님께 부탁하듯, 미리 역할을 정해둔 나만의 AI 조수에게 부탁하는 방식이에요.
          한 번 만들어두면 다음부터는 필요한 내용만 짧게 말해도 항상 같은 규칙으로 답해줘요.
        </p>

        <h2>일반 채팅 vs Gemini Gems</h2>
        <div className="compare-grid">
          <article className="card">
            <h3>💬 일반 채팅</h3>
            <ul className="checklist">
              {withoutGem.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
          <article className="card">
            <h3>💎 Gemini Gems</h3>
            <ul className="checklist">
              {withGem.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        </div>

        <h2>만드는 순서</h2>
        <StepGuide steps={buildSteps} />

        <InteractiveExample
          title="Gem 만들기 과정 살펴보기"
          description="버튼을 눌러 이름 정하기부터 실제로 쓰기까지의 과정을 확인하세요."
          steps={demoSteps}
        />

        <GemBuilder />

        <h2>바로 활용할 수 있는 Gem</h2>
        <CodeBlock label="앱스크립트 활용 활동지 웹 개발 · Gem 지침" code={myGemInstruction} />
        <Callout tone="warning" title="실제로 배포하기 전에 꼭 확인하세요">
          지침에 적힌 학생 기본 비밀번호나 관리자 비밀번호는 예시일 뿐이에요. 실제 학생에게 배포하기 전에
          반드시 우리 학교만의 값으로 바꾸고, 완성된 웹 앱 주소를 검색 엔진에 노출되는 곳에는 올리지 마세요.
        </Callout>

        <h2>선생님들이 만들 수 있는 Gem 예시</h2>
        <p>아래 예시를 눌러 지침 내용을 확인하고, 그대로 복사해서 나만의 Gem을 만들어보세요.</p>
        <div className="site-example-list">
          {gemExamples.map((gem, index) => (
            <details key={gem.title} open={index === 0}>
              <summary>{gem.title}</summary>
              <p>{gem.description}</p>
              <p className="example-prompt"><strong>Gem 지침 예시</strong>{gem.instruction}</p>
            </details>
          ))}
        </div>

        <Callout tone="warning" title="학생 개인정보는 지침과 대화에 넣지 마세요">
          Gem을 만들 때도 실제 학생 이름, 연락처, 성적 같은 개인정보는 사용하지 마세요. 연습할 때는
          가상의 이름과 상황으로 대신하고, 실제 업무에 쓸 때는 학교의 개인정보 처리 지침을 먼저 확인하세요.
        </Callout>
      </div>
    </section>
  )
}

export default GeminiGemsPage
