import Breadcrumb from '../components/Breadcrumb.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import LottoPractice from '../components/LottoPractice.jsx'
import PageNav from '../components/PageNav.jsx'

const parts = [
  ['제목과 안내', '로또 번호 생성기라는 제목과 짧은 설명을 보여줘요.'],
  ['번호 자리', '나중에 생성될 번호가 들어갈 동그란 자리 6개를 보여줘요.'],
  ['생성 버튼', '아직 작동하지 않지만 버튼이 놓일 위치와 모양을 보여줘요.'],
  ['색과 배치', '눈에 잘 띄는 색과 여백으로 화면을 보기 편하게 만들어요.'],
  ['반응형 화면', '컴퓨터에서도, 휴대전화에서도 깨지지 않고 잘 보이게 해요.'],
]

const weakScreenPrompt = [
  '"로또 생성기 만들어줘" — 무엇을 화면에 넣을지 알려주지 않았어요.',
  '"예쁘게 해줘" — 어떤 색, 어떤 크기를 원하는지 알 수 없어요.',
]

const goodScreenPrompt = [
  '"제목, 번호가 들어갈 자리 6개, 생성 버튼을 넣어줘. 기능은 아직 만들지 마."',
  '"휴대전화 화면 너비에서도 버튼과 번호가 잘리지 않게 해줘."',
]

const frontendExamples = [
  ['시간표 화면', '요일과 교시가 표로 나열된 화면이에요.', '월~금, 1~6교시가 표로 보이는 시간표 화면을 만들어줘. 아직 과목은 비워둬.'],
  ['출석 체크 화면', '학생 이름과 출석 버튼이 나열된 화면이에요.', '학생 이름 5명과 그 옆에 출석 확인 버튼이 있는 화면을 만들어줘.'],
  ['자기소개 카드', '이름과 좋아하는 것을 적는 카드 화면이에요.', '이름, 좋아하는 색, 좋아하는 음식을 적는 자기소개 카드 화면을 만들어줘.'],
  ['설문 응답 화면', '질문과 선택지가 나열된 화면이에요.', '좋아하는 계절을 고르는 설문 화면을 만들어줘. 선택지는 4개로 해줘.'],
]

const frontendPrompt = `로또 번호 생성기 화면을 만들어줘.

아직 번호를 만들거나 선택하는 기능은 넣지 말고 화면 모양만 보여줘.

화면에는 아래 내용을 넣어줘.
- "로또 번호 생성기"라는 제목
- 간단한 안내 문장
- 번호가 들어갈 동그란 자리 6개
- "번호 생성하기" 버튼 한 개

버튼을 눌러도 아무 일도 일어나지 않게 해줘.
휴대전화에서도 보기 편하게 만들어줘.
코딩을 처음 배우는 사람도 이해할 수 있게 간단히 설명해줘.`

function VibeStartGeminiPage() {
  return (
    <section className="page-section">
      <div className="container narrow-container">
        <Breadcrumb eyebrow="로또 생성기 만들기 · 3/6" />
        <h1>프런트엔드: 화면 모양 만들기</h1>
        <p className="page-description">기능을 넣기 전에 로또 생성기가 어떻게 보일지 먼저 만들어요.</p>

        <p>
          프런트엔드는 로또 판매점의 안내판과 같아요. 제목, 번호가 나타날 자리, 버튼의 위치처럼
          사용자의 눈에 보이는 부분을 먼저 만들어요. 이 단계에서는 버튼을 눌러도 번호가 만들어지지 않아요.
        </p>
        <p>
          "왜 기능부터 안 만들고 화면부터 만들까요?" 궁금하실 수 있어요. 화면을 먼저 보면 무엇이 어디에
          있는지 눈으로 확인할 수 있어서, 이후에 기능을 이야기할 때도 "저 버튼을 누르면"처럼 정확하게
          가리키며 대화할 수 있어요. 그래서 프런트엔드를 가장 먼저 만들어요.
        </p>

        <h2>먼저 화면에 놓을 것</h2>
        <ul className="checklist">
          {parts.map(([title, description]) => <li key={title}><strong>{title}</strong>: {description}</li>)}
        </ul>

        <h2>화면 설명, 이렇게 다르면 결과가 달라져요</h2>
        <div className="compare-grid">
          <article className="card">
            <h3>🙁 아쉬운 설명</h3>
            <ul className="checklist">
              {weakScreenPrompt.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
          <article className="card">
            <h3>🙂 좋은 설명</h3>
            <ul className="checklist">
              {goodScreenPrompt.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        </div>

        <h2>AI에게 요청할 프롬프트</h2>
        <CodeBlock label="프런트엔드 프롬프트" code={frontendPrompt} />

        <LottoPractice stage="frontend" />

        <h2>다양한 화면, 이렇게 시작해보세요</h2>
        <p>로또 생성기가 아니어도 같은 방식으로 화면부터 부탁할 수 있어요. 아래 예시를 눌러 확인해보세요.</p>
        <div className="site-example-list">
          {frontendExamples.map(([title, description, prompt], index) => (
            <details key={title} open={index === 0}>
              <summary>{title}</summary>
              <p>{description}</p>
              <p className="example-prompt"><strong>제미나이에게 말하기</strong>{prompt}</p>
            </details>
          ))}
        </div>

        <PageNav
          prev={['/vibe-coding/how-to', '바이브 코딩 과정']}
          next={['/vibe-coding/prompt-tips', '백엔드 실습']}
        />
      </div>
    </section>
  )
}

export default VibeStartGeminiPage
