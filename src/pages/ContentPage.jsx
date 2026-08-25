import { Link } from 'react-router-dom'

function ContentPage({ eyebrow, title, description, links = [] }) {
  return (
    <section className="page-section">
      <div className="container narrow-container">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-description">{description}</p>

        {links.length > 0 && (
          <div className={`card-grid page-link-grid${links.length === 4 ? ' is-four-up' : ''}${links.length === 5 ? ' is-five-up' : ''}${links.length === 6 ? ' is-six-up' : ''}`} aria-label={`${title} 세부 과정`}>
            {links.map(([to, label, cardDescription, example], index) => (
              <article className="card" key={to}>
                <span className="step-number" aria-hidden="true">{index + 1}</span>
                <h2>{label}</h2>
                <p>{cardDescription ?? '이 과정의 자세한 학습 자료와 실습 내용이 이곳에 준비될 예정이에요.'}</p>
                {example && <p className="card-example"><strong>예를 들면</strong>{example}</p>}
                <Link className="text-link" to={to}>살펴보기 <span aria-hidden="true">→</span></Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ContentPage
