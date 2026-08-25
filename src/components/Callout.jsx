const icons = {
  tip: '💡',
  warning: '⚠️',
}

function Callout({ tone = 'tip', title, children }) {
  return (
    <div className={`callout callout-${tone}`}>
      <span className="callout-icon" aria-hidden="true">{icons[tone]}</span>
      <div>
        {title && <p className="callout-title">{title}</p>}
        <p>{children}</p>
      </div>
    </div>
  )
}

export default Callout
