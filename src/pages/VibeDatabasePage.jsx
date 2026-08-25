import Breadcrumb from '../components/Breadcrumb.jsx'
import Callout from '../components/Callout.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import LottoPractice from '../components/LottoPractice.jsx'
import PageNav from '../components/PageNav.jsx'

const fields = [
  ['번호 조합', '생성된 숫자 6개를 한 묶음으로 저장해요.'],
  ['생성 시각', '언제 만든 번호인지 함께 기록할 수 있어요.'],
  ['사용자 정보', '로그인 기능이 있다면 누구의 기록인지 연결할 수 있어요.'],
]

const withoutStorage = [
  '화면에 만든 결과가 잠깐 보였다가 새로고침하면 사라져요',
  '어제 만든 자료를 오늘 다시 확인할 수 없어요',
  '여러 사람이 만든 기록을 한곳에 모을 수 없어요',
]

const withStorage = [
  '한 번 저장하면 다시 접속해도 그대로 남아 있어요',
  '지난 기록을 목록으로 다시 확인할 수 있어요',
  '여러 사람의 기록을 표처럼 모아서 볼 수 있어요',
]

const databaseExamples = [
  ['출석 기록', '날짜별로 학생의 출석 여부를 저장해요.', '학생 이름과 날짜, 출석 여부를 저장하고 목록으로 볼 수 있는 화면을 만들어줘.'],
  ['퀴즈 점수', '퀴즈를 풀 때마다 점수를 기록해 모아요.', '퀴즈를 풀면 이름과 점수를 저장하고, 저장된 점수를 순위대로 보여줘.'],
  ['도서 대출 기록', '누가 어떤 책을 빌렸는지 기록해요.', '학생 이름과 빌린 책 제목을 저장하고 반납하면 목록에서 지울 수 있게 해줘.'],
  ['상담 일지', '상담 날짜와 간단한 메모를 저장해요.', '상담 날짜와 메모를 저장하고 나중에 목록에서 다시 볼 수 있게 해줘.'],
]

const databasePrompt = `로또 번호 생성기에 번호 저장 기능을 넣어줘.

생성한 번호 아래에 "저장하기" 버튼을 만들어줘.
버튼을 누르면 번호 6개를 아래 목록에 저장해줘.
저장한 번호를 지울 수 있는 "삭제" 버튼도 만들어줘.
같은 번호는 한 번만 저장되게 해줘.

지금까지 만든 화면에 이어서 만들어줘.
어려운 말은 줄이고 초보자도 이해할 수 있게 설명해줘.`

function VibeDatabasePage() {
  return (
    <section className="page-section">
      <div className="container narrow-container">
        <Breadcrumb eyebrow="로또 생성기 만들기 · 5/6" />
        <h1>데이터베이스: 번호를 보관하는 곳</h1>
        <p className="page-description">마음에 드는 번호 조합을 저장하고 나중에 다시 불러와요.</p>

        <p>
          데이터베이스는 번호 조합을 넣어두는 이름표 달린 보관함과 같아요. 생성한 번호를 화면에만 보여주면
          페이지를 닫을 때 사라지지만, 데이터베이스에 저장하면 다시 찾아보거나 삭제할 수 있어요.
        </p>

        <h2>저장하지 않으면 vs 저장하면</h2>
        <div className="compare-grid">
          <article className="card">
            <h3>🙁 저장하지 않으면</h3>
            <ul className="checklist">
              {withoutStorage.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
          <article className="card">
            <h3>🙂 데이터베이스에 저장하면</h3>
            <ul className="checklist">
              {withStorage.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        </div>

        <h2>한 기록에 담을 정보</h2>
        <ul className="checklist">
          {fields.map(([title, description]) => <li key={title}><strong>{title}</strong>: {description}</li>)}
        </ul>

        <h2>AI에게 요청할 프롬프트</h2>
        <CodeBlock label="데이터베이스 프롬프트" code={databasePrompt} />

        <LottoPractice stage="database" />

        <h2>다양한 데이터베이스 활용 예시</h2>
        <p>번호 저장이 아니어도 같은 원리로 교실 기록을 저장할 수 있어요. 아래 예시를 눌러 확인해보세요.</p>
        <div className="site-example-list">
          {databaseExamples.map(([title, description, prompt], index) => (
            <details key={title} open={index === 0}>
              <summary>{title}</summary>
              <p>{description}</p>
              <p className="example-prompt"><strong>제미나이에게 말하기</strong>{prompt}</p>
            </details>
          ))}
        </div>

        <Callout tone="warning" title="이 화면의 저장은 연습용이에요">
          아래 실습은 현재 페이지의 메모리에만 저장돼요. 실제 서비스에서는 데이터베이스와 사용자 권한을 연결해야 해요.
        </Callout>

        <PageNav
          prev={['/vibe-coding/prompt-tips', '백엔드 실습']}
          next={['/vibe-coding/deploy', '배포 실습']}
        />
      </div>
    </section>
  )
}

export default VibeDatabasePage
