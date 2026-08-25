import { useState } from 'react'
import Callout from '../components/Callout.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import StepGuide from '../components/StepGuide.jsx'

const weakPrompts = [
  '"교안 만들어줘" — 학년, 과목, 주제를 몰라 AI가 짐작으로 채워요',
  '"수학 수업 준비해줘" — 어떤 단원인지, 몇 분 수업인지 알 수 없어요',
  '"재미있게 해줘" — 어떤 활동을 원하는지 구체적이지 않아요',
]

const goodPrompts = [
  '"초등 4학년 수학 \'삼각형\' 단원 40분 수업 교안을 만들어줘"',
  '"도입 5분, 전개 30분, 정리 5분 흐름으로 표로 정리해줘"',
  '"모둠 활동 중심으로 하고, 교사의 발문과 예상 답변도 넣어줘"',
]

const buildSteps = [
  { title: '주제와 목표 정하기', description: '어느 학년, 어느 과목, 어떤 단원의 수업인지 정하고 이번 차시에 도달할 목표를 한 문장으로 적어봐요.' },
  { title: '프롬프트 만들기', description: '아래 실습 도구로 학년·과목·수업 형태를 고르면 교안 요청 프롬프트가 완성돼요. 주제만 채우면 돼요.' },
  { title: '제미나이에게 요청하기', description: '완성한 프롬프트를 복사해 제미나이에 붙여넣어요. 몇 초 만에 교안 초안이 나와요.' },
  { title: '대화하며 다듬기', description: '"전개 활동을 놀이로 바꿔줘", "평가 문항을 2개 더 만들어줘"처럼 부족한 부분을 말로 고쳐가요.' },
  { title: '문서로 정리하기', description: '완성된 교안을 구글 문서에 붙여넣어 학교 양식에 맞게 정리하고 저장해요.' },
]

const grades = [
  ['low', '1~2학년', '초등학교 1~2학년'],
  ['mid', '3~4학년', '초등학교 3~4학년'],
  ['high', '5~6학년', '초등학교 5~6학년'],
]

const subjects = [
  ['korean', '국어'],
  ['math', '수학'],
  ['social', '사회'],
  ['science', '과학'],
  ['english', '영어'],
  ['etc', '예체능·기타'],
]

const styles = [
  ['lecture', '설명·문답 중심', '교사의 설명과 발문 중심으로 진행하고, 학생과 주고받을 질문과 예상 답변을 구체적으로'],
  ['group', '모둠 탐구 활동', '모둠별 탐구 활동 중심으로 진행하고, 모둠 과제와 역할 나누기 방법을 구체적으로'],
  ['play', '놀이·게임 활동', '놀이와 게임 중심으로 진행하고, 규칙 설명과 준비물을 구체적으로'],
  ['project', '만들기·프로젝트', '직접 만들고 표현하는 활동 중심으로 진행하고, 단계별 제작 과정을 구체적으로'],
]

function PlanBuilder() {
  const [gradeKey, setGradeKey] = useState('mid')
  const [subjectKey, setSubjectKey] = useState('math')
  const [styleKey, setStyleKey] = useState('group')

  const grade = grades.find((item) => item[0] === gradeKey)
  const subject = subjects.find((item) => item[0] === subjectKey)
  const style = styles.find((item) => item[0] === styleKey)

  const prompt = `${grade[2]} ${subject[1]} 수업 교안을 만들어줘.

- 주제(단원): (여기에 단원이나 주제를 적어주세요)
- 수업 시간: 40분 1차시
- 수업 형태: ${style[1]}

교안에는 아래 내용을 표 형식으로 정리해줘.
- 학습 목표 (1~2개)
- 도입(5분) - 전개(30분) - 정리(5분) 단계별 교사와 학생 활동
- 준비물과 유의점
- 형성평가 문항 2개

${style[2]} 적어줘.
${grade[1]} 눈높이에 맞는 쉬운 말을 사용해줘.`

  return (
    <div className="lotto-lab">
      <div className="lotto-lab-heading">
        <h2>실습: 교안 프롬프트 만들어보기</h2>
        <p>학년, 과목, 수업 형태를 고르면 아래 프롬프트가 실시간으로 완성돼요. 복사해서 주제만 채우면 바로 쓸 수 있어요.</p>
      </div>

      <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>1. 어느 학년 수업인가요?</p>
      <div className="lotto-actions">
        {grades.map(([key, label]) => (
          <button
            className={gradeKey === key ? 'deploy-check is-complete' : 'deploy-check'}
            key={key}
            type="button"
            aria-pressed={gradeKey === key}
            onClick={() => setGradeKey(key)}
          >
            <span aria-hidden="true">{gradeKey === key ? '✓' : '선택'}</span>
            {label}
          </button>
        ))}
      </div>

      <p style={{ fontWeight: 700, margin: '1.25rem 0 0.5rem' }}>2. 어떤 과목인가요?</p>
      <div className="lotto-actions">
        {subjects.map(([key, label]) => (
          <button
            className={subjectKey === key ? 'deploy-check is-complete' : 'deploy-check'}
            key={key}
            type="button"
            aria-pressed={subjectKey === key}
            onClick={() => setSubjectKey(key)}
          >
            <span aria-hidden="true">{subjectKey === key ? '✓' : '선택'}</span>
            {label}
          </button>
        ))}
      </div>

      <p style={{ fontWeight: 700, margin: '1.25rem 0 0.5rem' }}>3. 어떤 수업 형태인가요?</p>
      <div className="lotto-actions">
        {styles.map(([key, label]) => (
          <button
            className={styleKey === key ? 'deploy-check is-complete' : 'deploy-check'}
            key={key}
            type="button"
            aria-pressed={styleKey === key}
            onClick={() => setStyleKey(key)}
          >
            <span aria-hidden="true">{styleKey === key ? '✓' : '선택'}</span>
            {label}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <CodeBlock label="완성된 교안 프롬프트 (복사해서 주제만 채우세요)" code={prompt} />
      </div>
    </div>
  )
}

const examples = [
  {
    title: '국어: 주장하는 글 쓰기 (토론 수업)',
    description: '찬반 토론으로 생각을 나눈 뒤 주장하는 글을 쓰는 수업이에요.',
    prompt: '초등학교 5~6학년 국어 수업 교안을 만들어줘.\n주제는 "주장하는 글 쓰기"야. 40분 1차시로,\n"급식에 디저트가 나와야 한다"를 주제로 찬반 토론을 한 뒤\n자기 주장을 글로 쓰는 흐름으로 구성해줘.\n토론 규칙 안내와 발문, 글쓰기 틀(주장-근거-마무리)도 넣어줘.',
  },
  {
    title: '수학: 분수의 덧셈 (놀이 수업)',
    description: '분수 카드 게임으로 분모가 같은 분수의 덧셈을 익히는 수업이에요.',
    prompt: '초등학교 3~4학년 수학 수업 교안을 만들어줘.\n주제는 "분모가 같은 분수의 덧셈"이야. 40분 1차시로,\n분수 카드를 뽑아 합을 만드는 짝 게임 중심으로 구성해줘.\n게임 규칙, 준비물(카드 만드는 방법 포함), 형성평가 문항 2개를 넣어줘.',
  },
  {
    title: '과학: 식물의 한살이 (관찰 수업)',
    description: '강낭콩 관찰 기록을 바탕으로 식물의 한살이를 정리하는 수업이에요.',
    prompt: '초등학교 3~4학년 과학 수업 교안을 만들어줘.\n주제는 "식물의 한살이"야. 40분 1차시로,\n모둠별로 강낭콩 관찰 기록을 비교하고 한살이 순서를 정리하는\n탐구 활동 중심으로 구성해줘. 관찰 기록지 양식도 함께 만들어줘.',
  },
  {
    title: '사회: 우리 지역의 문화유산 (프로젝트 수업)',
    description: '우리 지역 문화유산 소개 자료를 만드는 프로젝트 수업이에요.',
    prompt: '초등학교 3~4학년 사회 수업 교안을 만들어줘.\n주제는 "우리 지역의 문화유산"이야. 40분 1차시로,\n모둠별로 문화유산 소개 카드를 만드는 프로젝트 활동으로 구성해줘.\n조사 자료는 미리 나눠준다고 가정하고, 카드에 들어갈 항목과\n발표 방법도 안내해줘.',
  },
  {
    title: '창체: 학교 폭력 예방 교육 (역할극 수업)',
    description: '역할극으로 배려하는 말을 연습하는 창의적 체험활동 수업이에요.',
    prompt: '초등학교 어울리는 학년의 창의적 체험활동 교안을 만들어줘.\n주제는 "친구를 배려하는 말"이야. 40분 1차시로,\n상황 카드를 뽑아 역할극을 하고 바꿔 말하기를 연습하는 활동으로 구성해줘.\n상황 카드 예시 4개와 마무리 다짐 활동도 넣어줘.',
  },
]

function LessonPlanPage() {
  return (
    <section className="page-section">
      <div className="container narrow-container">
        <p className="eyebrow">AI와 함께 수업 준비</p>
        <h1>수업 교안 만들기</h1>
        <p className="page-description">
          학년, 과목, 수업 형태만 알려주면 AI가 교안 초안을 몇 초 만에 만들어줘요.
          선생님은 초안을 다듬는 데만 집중하면 돼요.
        </p>

        <p>
          교안 작성은 매주 반복되지만 시간이 많이 드는 일이에요. AI에게 수업의 조건을 구체적으로
          알려주면 도입-전개-정리 흐름, 발문, 준비물, 평가까지 갖춘 초안을 받을 수 있어요.
          중요한 것은 좋은 초안이 나오도록 조건을 또렷하게 말하는 것, 그리고 나온 초안을
          우리 반에 맞게 다듬는 거예요.
        </p>

        <h2>좋은 요청 vs 아쉬운 요청</h2>
        <div className="compare-grid">
          <article className="card">
            <h3>🙁 아쉬운 요청</h3>
            <ul className="checklist">
              {weakPrompts.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
          <article className="card">
            <h3>🙂 좋은 요청</h3>
            <ul className="checklist">
              {goodPrompts.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        </div>

        <h2>교안 만들기 5단계</h2>
        <StepGuide steps={buildSteps} />

        <PlanBuilder />

        <h2>교과별 예시 프롬프트</h2>
        <p>아래 예시를 눌러 프롬프트를 확인하고, 우리 반 상황에 맞게 바꿔서 사용해보세요.</p>
        <div className="site-example-list">
          {examples.map((example, index) => (
            <details key={example.title} open={index === 0}>
              <summary>{example.title}</summary>
              <p>{example.description}</p>
              <p className="example-prompt"><strong>제미나이에게 말하기</strong>{example.prompt}</p>
            </details>
          ))}
        </div>

        <Callout tone="tip" title="AI 교안은 초안이에요">
          AI가 만든 교안은 출발점이에요. 성취기준에 맞는지, 우리 반 학생 수준에 맞는지,
          활동 시간이 현실적인지는 선생님이 확인하고 다듬어야 해요. 다듬는 과정도
          &ldquo;전개 활동 시간을 20분으로 줄여줘&rdquo;처럼 AI에게 말로 부탁할 수 있어요.
        </Callout>

        <Callout tone="warning" title="학생 개인정보는 넣지 마세요">
          프롬프트에 실제 학생 이름이나 특성, 평가 결과 같은 개인정보를 넣지 마세요.
          &ldquo;발표를 어려워하는 학생이 있는 반&rdquo;처럼 상황만 일반적으로 설명하면 충분해요.
        </Callout>
      </div>
    </section>
  )
}

export default LessonPlanPage
