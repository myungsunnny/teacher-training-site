import { useState } from 'react'

function CodeBlock({ label, code, wrap = false }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // ponytail: clipboard permission can be denied by the browser; button simply stays "복사" and user can select the text manually
    }
  }

  return (
    <div className="code-block">
      <div className="code-block-header">
        <span>{label}</span>
        <button type="button" className="code-copy-button" onClick={handleCopy}>
          {copied ? '복사됨!' : '복사'}
        </button>
      </div>
      <pre style={wrap ? { whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' } : undefined}><code>{code}</code></pre>
    </div>
  )
}

export default CodeBlock
