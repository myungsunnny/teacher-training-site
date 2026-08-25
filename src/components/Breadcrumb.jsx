import { Link } from 'react-router-dom'

function Breadcrumb({ eyebrow, to = '/vibe-coding', label = '목록으로' }) {
  return (
    <div className="heading-with-link">
      <p className="eyebrow">{eyebrow}</p>
      <Link className="text-link" to={to}>{label} <span aria-hidden="true">→</span></Link>
    </div>
  )
}

export default Breadcrumb
