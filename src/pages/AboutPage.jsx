function AboutPage() {
  return (
    <section className="page-section">
      <div className="container narrow-container">
        <p className="eyebrow">연수 안내</p>
        <h1>연수 소개</h1>
        <p className="page-description">
          코딩 경험이 거의 없는 초등학교 교원을 위한 자기주도형 AI 수업 도구 제작 연수입니다.
        </p>

        <h2>이런 목적으로 만들었어요</h2>
        <p>
          구글 제미나이와 스프레드시트 · 앱스크립트만으로 선생님이 직접 수업 도구와 학교 업무
          자동화 자료를 만들 수 있도록 돕기 위해 이 연수를 준비했어요.
        </p>

        <h2>이렇게 진행돼요</h2>
        <p>
          정해진 시간에 모이는 대신, 선생님이 편한 시간에 순서대로 페이지를 따라가며 학습하는
          자기주도형 방식이에요. &ldquo;바이브 코딩 기초&rdquo;와 &ldquo;시트 × 앱스크립트&rdquo; 두 트랙을
          원하는 순서로 진행하면 돼요.
        </p>

        <h2>문의하기</h2>
        <p>
          궁금한 점이 있다면 <a className="text-link" href="mailto:training-support@example.com">training-support@example.com</a>으로
          편하게 문의해주세요.
        </p>
      </div>
    </section>
  )
}

export default AboutPage
