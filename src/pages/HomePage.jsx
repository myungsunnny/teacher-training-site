import { Link } from 'react-router-dom'

const values = [
  ['🎯', '나만의 수업 도구', '출석부, 채점기, 퀴즈까지 직접 만들어요.'],
  ['🤖', 'AI가 코드를 대신 써줘요', '코딩을 몰라도 제미나이에게 말로 설명하면 돼요.'],
  ['⏱️', '반복 업무 시간 절약', '한 번 만든 도구를 매 학기 다시 활용할 수 있어요.'],
]

const resources = ['자동 출석부', '객관식 자동채점기', '모둠 자동 편성기']

function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <p className="eyebrow">초등학교 교원 연수</p>
          <h1>코딩 몰라도 괜찮아요, 선생님!<br />AI와 함께 수업 도구를 직접 만들어봐요</h1>
          <p>구글 제미나이와 스프레드시트만 있으면 충분합니다. 지금 시작해볼까요?</p>
          <div className="button-group">
            <Link className="button button-primary" to="/vibe-coding">바이브 코딩 시작하기</Link>
            <Link className="button button-secondary" to="/sheets-appsscript">시트 × 앱스크립트 시작하기</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">배움의 이유</p>
            <h2>왜 배워야 할까요?</h2>
          </div>
          <div className="card-grid three-columns">
            {values.map(([icon, title, description]) => (
              <article className="card" key={title}>
                <span className="card-icon" aria-hidden="true">{icon}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft-section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">두 가지 학습 경로</p>
            <h2>어떤 것부터 시작해볼까요?</h2>
          </div>
          <div className="card-grid track-grid">
            <article className="card track-card">
              <span className="badge">3단계로 배워요</span>
              <h3>① 바이브 코딩 기초</h3>
              <p>제미나이에게 원하는 것을 설명하며 AI와 함께 코드를 만들어봐요.</p>
              <Link className="button button-primary" to="/vibe-coding">시작하기</Link>
            </article>
            <article className="card track-card">
              <span className="badge badge-secondary">3단계로 배워요</span>
              <h3>② 구글시트 × 앱스크립트</h3>
              <p>스프레드시트에 자동화 기능을 더해 실제 수업 자료를 만들어봐요.</p>
              <Link className="button button-secondary" to="/sheets-appsscript">시작하기</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">학습 순서</p>
            <h2>어떻게 진행되나요?</h2>
          </div>
          <ol className="progress-list">
            {['개념 이해하기', '따라 해보기', '나만의 자료 만들기', '갤러리에 공유하기'].map((step, index) => (
              <li key={step}>
                <span>{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section soft-section">
        <div className="container">
          <div className="section-heading heading-with-link">
            <div>
              <p className="eyebrow">자료실 미리보기</p>
              <h2>바로 쓰는 템플릿</h2>
            </div>
            <Link className="text-link" to="/practice/templates">전체 보기 <span aria-hidden="true">→</span></Link>
          </div>
          <div className="card-grid three-columns">
            {resources.map((resource) => (
              <article className="card resource-card" key={resource}>
                <div className="thumbnail-placeholder" role="img" aria-label={`${resource} 화면 미리보기 영역`}>
                  미리보기
                </div>
                <h3>{resource}</h3>
                <Link className="button button-secondary" to="/practice/templates">사본 만들기</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container narrow-container">
          <div className="section-heading heading-with-link">
            <div>
              <p className="eyebrow">도움말</p>
              <h2>자주 묻는 질문</h2>
            </div>
            <Link className="text-link" to="/faq">FAQ 전체 보기 <span aria-hidden="true">→</span></Link>
          </div>
          <div className="faq-list">
            {[
              '코딩을 한 번도 해보지 않았는데 괜찮을까요?',
              'Apps Script 실행 시 권한 승인이 필요한가요?',
              '학교 계정에서도 제미나이를 사용할 수 있나요?',
            ].map((question) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>자세한 안내 내용이 이곳에 준비될 예정이에요.</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
