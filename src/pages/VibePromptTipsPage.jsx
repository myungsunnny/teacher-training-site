import Breadcrumb from '../components/Breadcrumb.jsx'
import Callout from '../components/Callout.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import LottoPractice from '../components/LottoPractice.jsx'
import PageNav from '../components/PageNav.jsx'

const jobs = [
  ['요청 받기', '프런트엔드에서 번호 생성 요청이 들어왔는지 확인해요.'],
  ['번호 섞기', '1부터 45까지의 숫자 순서를 무작위로 섞어요.'],
  ['6개 고르기', '앞에서 6개만 꺼내 중복 없는 조합을 만들어요.'],
  ['결과 보내기', '번호를 오름차순으로 정렬해 화면에 돌려줘요.'],
]

const backendExamples = [
  ['조건에 맞게 걸러내기(필터링)', '전체 목록에서 원하는 조건에 맞는 것만 골라내요.', '점수 목록에서 80점 이상인 학생만 골라 보여줘.'],
  ['순서대로 나열하기(정렬)', '이름순, 점수순처럼 기준에 따라 순서를 맞춰요.', '학생 명단을 이름 가나다순으로 정렬해줘.'],
  ['세거나 더하기(집계)', '전체 개수를 세거나 합계, 평균을 계산해요.', '제출한 숙제 개수와 전체 학생 수를 비교해서 제출률을 계산해줘.'],
  ['무작위로 고르기(추첨)', '여러 개 중 정해진 개수를 무작위로 뽑아요.', '학생 이름 중 발표자 한 명을 무작위로 뽑아줘.'],
]

const backendPrompt = `앞에서 만든 로또 번호 생성기 화면에 번호 만드는 기능을 넣어줘.

"번호 생성하기" 버튼을 누르면 1부터 45까지 중에서 번호 6개를 뽑아줘.
같은 번호가 두 번 나오지 않게 해줘.
뽑은 번호는 작은 숫자부터 차례대로 보여줘.

기존 화면은 그대로 사용해줘.
코딩을 처음 배우는 사람도 이해할 수 있게 쉽게 설명해줘.`

function VibePromptTipsPage() {
  return (
    <section className="page-section">
      <div className="container narrow-container">
        <Breadcrumb eyebrow="로또 생성기 만들기 · 4/6" />
        <h1>백엔드: 번호를 만드는 규칙</h1>
        <p className="page-description">화면 뒤에서 중복 없는 번호 6개를 무작위로 만들어요.</p>

        <p>
          백엔드는 번호 추첨기 안쪽의 장치와 같아요. 사용자는 생성 버튼만 누르지만, 안에서는 숫자를 섞고,
          중복을 막고, 6개가 맞는지 확인한 뒤 결과를 화면으로 보내요.
        </p>
        <p>
          프런트엔드가 "무엇이 보이는가"라면, 백엔드는 "어떤 규칙으로 처리하는가"예요. 화면은 그대로 두고
          "이렇게 계산해줘", "이 조건일 때만 보여줘"처럼 규칙만 바꿔달라고 말하면 백엔드 부분만 고쳐져요.
        </p>

        <h2>번호 생성 순서</h2>
        <ul className="checklist">
          {jobs.map(([title, description]) => <li key={title}><strong>{title}</strong>: {description}</li>)}
        </ul>

        <h2>AI에게 요청할 프롬프트</h2>
        <CodeBlock label="백엔드 프롬프트" code={backendPrompt} />

        <LottoPractice stage="backend" />

        <h2>다양한 백엔드 규칙, 이렇게 부탁해보세요</h2>
        <p>번호를 뽑는 규칙 말고도 교실에서 자주 쓰는 처리 규칙이 많아요. 아래 예시를 눌러 확인해보세요.</p>
        <div className="site-example-list">
          {backendExamples.map(([title, description, prompt], index) => (
            <details key={title} open={index === 0}>
              <summary>{title}</summary>
              <p>{description}</p>
              <p className="example-prompt"><strong>제미나이에게 말하기</strong>{prompt}</p>
            </details>
          ))}
        </div>

        <Callout tone="warning" title="학습용 무작위 번호예요">
          이 프로그램은 번호 생성 원리를 배우기 위한 예시예요. 당첨 번호를 예측하거나 당첨 가능성을 높여주지 않아요.
        </Callout>

        <PageNav
          prev={['/vibe-coding/start-gemini', '프런트엔드 실습']}
          next={['/vibe-coding/database', '데이터베이스 실습']}
        />
      </div>
    </section>
  )
}

export default VibePromptTipsPage
