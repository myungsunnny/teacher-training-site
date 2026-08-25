function StepGuide({ steps }) {
  return (
    <ol className="step-guide">
      {steps.map(({ title, description }, index) => (
        <li className="step-guide-item" key={title}>
          <span className="step-number" aria-hidden="true">{index + 1}</span>
          <div>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

export default StepGuide
