import { Link } from 'react-router-dom'

function PageNav({ prev, next }) {
  if (!prev && !next) return null

  return (
    <nav className="page-pagination" aria-label="이전/다음 과정">
      {prev ? (
        <Link className="button button-secondary" to={prev[0]}>
          <span aria-hidden="true">←</span> 이전: {prev[1]}
        </Link>
      ) : <span />}
      {next ? (
        <Link className="button button-primary" to={next[0]}>
          다음: {next[1]} <span aria-hidden="true">→</span>
        </Link>
      ) : <span />}
    </nav>
  )
}

export default PageNav
