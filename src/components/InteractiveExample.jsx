import { useState } from 'react'

function InteractiveExample({ title, description, steps, resultLabel = '화면에서 보이는 예시' }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeStep = steps[activeIndex]

  return (
    <section className="concept-demo" aria-labelledby="concept-demo-title">
      <div className="concept-demo-heading">
        <h2 id="concept-demo-title">{title}</h2>
        <p>{description}</p>
      </div>

      <div className="concept-demo-tabs" aria-label={`${title} 단계`}>
        {steps.map((step, index) => (
          <button
            className={index === activeIndex ? 'concept-demo-tab is-active' : 'concept-demo-tab'}
            key={step.label}
            type="button"
            aria-pressed={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          >
            <span>{index + 1}</span>
            {step.label}
          </button>
        ))}
      </div>

      <div className="concept-demo-panel" aria-live="polite">
        <p className="concept-demo-status">{activeStep.status}</p>
        <h3>{activeStep.title}</h3>
        <p>{activeStep.body}</p>
        <div className="concept-demo-result"><strong>{resultLabel}</strong>{activeStep.result}</div>
      </div>
    </section>
  )
}

export default InteractiveExample
