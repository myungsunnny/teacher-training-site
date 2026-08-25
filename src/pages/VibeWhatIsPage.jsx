import { useState } from 'react'
import Breadcrumb from '../components/Breadcrumb.jsx'
import PageNav from '../components/PageNav.jsx'
import InteractiveExample from '../components/InteractiveExample.jsx'

const audience = [
  '코딩을 한 번도 배워본 적 없는 선생님',
  '반복되는 학교 업무를 자동화하고 싶은 선생님',
  '아이디어는 있지만 코드를 몰라 망설였던 선생님',
]

const checkItems = [
  '한 번도 코딩을 배워본 적이 없어요',
  '반복되는 업무를 자동화하고 싶어요',
  '아이디어는 있지만 시작이 막막했어요',
  'AI 도구를 써본 적이 거의 없어요',
]

const traditionalCoding = [
  '프로그래밍 언어 문법을 처음부터 익혀야 해요',
  '원하는 기능을 한 줄 한 줄 직접 타이핑해요',
  '오류(에러)가 나면 원인을 혼자 찾아야 해요',
]

const vibeCoding = [
  '평소 말투로 설명하면 AI가 코드 초안을 만들어요',
  '완성된 화면을 보며 대화하듯 고쳐가요',
  '오류가 나면 그대로 AI에게 물어보면 돼요',
]

const useCases = [
  ['🗓️', '자동 출석부', '이름을 누르면 출석 여부가 자동으로 표시돼요.'],
  ['🏆', '상장 생성기', '이름과 상장 종류를 입력하면 상장 문구를 만들어줘요.'],
  ['📝', '객관식 자동채점기', '정답표와 비교해 점수를 자동으로 계산해줘요.'],
  ['👥', '모둠 자동 편성기', '학생 이름을 넣으면 무작위로 모둠을 나눠줘요.'],
  ['🗳️', '학급 투표 화면', '여러 선택지 중 하나를 고르는 투표 화면이에요.'],
  ['📅', '시간표 생성기', '요일과 과목을 입력하면 시간표 화면을 보여줘요.'],
]

const demoSteps = [
  {
    label: '부탁하기',
    status: '사람이 AI에게 원하는 것을 설명해요.',
    title: '먼저 목적을 말해요',
    body: '누가, 언제, 무엇을 사용할지 알려주면 AI가 엉뚱하게 추측할 일이 줄어요.',
    result: '"1부터 45까지 중 중복 없는 번호 6개를 뽑는 로또 생성기를 만들어줘."',
  },
  {
    label: '결과 보기',
    status: 'AI가 첫 번째 결과를 만들어요.',
    title: '완성품이 아니라 초안을 확인해요',
    body: '버튼이 작거나 설명이 부족한 부분처럼 고칠 곳을 직접 찾아봐요.',
    result: '번호 6개와 다시 생성 버튼이 있는 첫 화면',
  },
  {
    label: '고쳐가기',
    status: '사람이 피드백하고 AI가 다시 수정해요.',
    title: '대화하며 원하는 모습에 가까워져요',
    body: '마음에 들지 않는 부분을 구체적으로 말하면 AI가 코드를 다시 고쳐줘요.',
    result: '"번호를 오름차순으로 보여주고, 마음에 드는 조합은 저장하게 해줘."',
  },
]

function VibeWhatIsPage() {
  const [checked, setChecked] = useState([])

  const toggleCheck = (item) => {
    setChecked((current) => current.includes(item)
      ? current.filter((value) => value !== item)
      : [...current, item])
  }

  return (
    <section className="page-section">
      <div className="container narrow-container">
        <Breadcrumb eyebrow="바이브 코딩 기초 · 1/6" />
        <h1>바이브 코딩: AI와 함께 만드는 코딩</h1>
        <p className="page-description">AI에게 원하는 것을 말로 설명하고, 결과를 보며 함께 다듬어가는 코딩 방식이에요.</p>
        <p>바이브 코딩은 요리를 잘하는 AI 셰프에게 주문하는 것과 비슷해요. &ldquo;매콤하지 않은 파스타를 만들어줘&rdquo;라고 말하면 AI가 첫 접시를 만들고, 맛을 본 뒤 &ldquo;소스를 조금 더 진하게 해줘&rdquo;라고 요청하며 원하는 결과에 가까워져요. 코드를 한 줄씩 외우기보다, 무엇을 만들지 또렷하게 설명하는 능력이 중요한 시작점이에요.</p>
        <p>그동안 코딩이라고 하면 알 수 없는 영어 단어와 기호로 가득한 화면을 떠올리셨을 거예요. 바이브 코딩에서는 그 화면을 직접 들여다볼 필요가 없어요. 선생님은 &ldquo;무엇을&rdquo;, &ldquo;누구를 위해&rdquo;, &ldquo;어떻게 보이게&rdquo; 만들지만 또렷하게 설명하면 되고, 문법과 기호를 다루는 일은 AI가 맡아요.</p>

        <h2>기존 코딩과 무엇이 다를까요?</h2>
        <div className="compare-grid">
          <article className="card">
            <h3>🧑‍💻 기존 코딩 방식</h3>
            <ul className="checklist">
              {traditionalCoding.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
          <article className="card">
            <h3>💬 바이브 코딩 방식</h3>
            <ul className="checklist">
              {vibeCoding.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        </div>

        <h2>이런 분께 잘 맞아요</h2>
        <ul className="checklist">
          {audience.map((item) => <li key={item}>{item}</li>)}
        </ul>

        <div className="lotto-lab">
          <div className="lotto-lab-heading">
            <h2>나도 시작할 수 있을까요? 해당하는 것을 눌러보세요</h2>
            <p>하나라도 해당하면 이 연수는 선생님을 위한 연수예요.</p>
          </div>
          <div className="lotto-actions">
            {checkItems.map((item) => (
              <button
                className={checked.includes(item) ? 'deploy-check is-complete' : 'deploy-check'}
                key={item}
                type="button"
                aria-pressed={checked.includes(item)}
                onClick={() => toggleCheck(item)}
              >
                <span aria-hidden="true">{checked.includes(item) ? '✓' : '선택'}</span>
                {item}
              </button>
            ))}
          </div>
          {checked.length > 0 && (
            <div className="deploy-result is-ready" aria-live="polite">
              <strong>잘 오셨어요!</strong>
              <p>지금 고르신 내용이 바로 이 연수가 만들어진 이유예요. 다음 페이지에서 실제 과정을 따라가 볼게요.</p>
            </div>
          )}
        </div>

        <h2>선생님도 이렇게 만들 수 있어요</h2>
        <p>거창한 프로그램이 아니어도 괜찮아요. 교실에서 매번 손으로 반복하던 일들이 좋은 시작점이 돼요.</p>
        <div className="card-grid three-columns">
          {useCases.map(([icon, title, description]) => (
            <article className="card" key={title}>
              <span className="card-icon" aria-hidden="true">{icon}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>

        <InteractiveExample
          title="AI 셰프에게 주문해보기"
          description="버튼을 차례로 눌러 바이브 코딩의 대화 과정을 살펴보세요."
          steps={demoSteps}
        />
        <PageNav next={['/vibe-coding/how-to', '바이브 코딩 과정']} />
      </div>
    </section>
  )
}

export default VibeWhatIsPage
