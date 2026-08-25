const templates = [
  ['자동 출석부 템플릿', '오늘 날짜를 자동으로 기록하는 출석 시트예요.'],
  ['객관식 자동채점기 템플릿', '응답을 정답표와 비교해 점수를 매겨요.'],
  ['모둠 자동 편성기 템플릿', '학생 명단을 무작위로 모둠 편성해줘요.'],
  ['시간표 생성기 템플릿', '교과 시수에 맞춰 시간표 초안을 만들어줘요.'],
]

function PracticeTemplatesPage() {
  return (
    <section className="page-section">
      <div className="container narrow-container">
        <p className="eyebrow">실습 / 자료실</p>
        <h1>바로 쓰는 템플릿</h1>
        <p className="page-description">
          수업과 학교 업무에 맞게 사본을 만들어 바로 활용할 수 있는 구글 시트 템플릿이에요.
        </p>

        <div className="card-grid three-columns">
          {templates.map(([title, description]) => (
            <article className="card resource-card" key={title}>
              <div className="thumbnail-placeholder" role="img" aria-label={`${title} 미리보기 영역`}>
                미리보기
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
              <a className="button button-secondary" href="#copy">사본 만들기</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PracticeTemplatesPage
