import { useEffect, useState } from 'react'
import Callout from '../components/Callout.jsx'

const emptyForm = { title: '', author: '', description: '', link: '' }

function SubmitForm({ onSubmitted }) {
  const [form, setForm] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const updateField = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }))

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const response = await fetch('/api/works', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || '제출에 실패했어요.')
      setForm(emptyForm)
      onSubmitted()
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="callout">
      <span className="callout-icon" aria-hidden="true">🙌</span>
      <div style={{ flex: 1 }}>
        <p className="callout-title">선생님이 만든 결과물을 올려주세요</p>
        <p>결과물 제목, 이름(또는 학교), 링크를 적어 제출하면 바로 아래 갤러리에 올라가요.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="work-title">결과물 제목</label>
            <input id="work-title" className="form-input" value={form.title} onChange={updateField('title')} required maxLength={80} />
          </div>
          <div className="form-field">
            <label htmlFor="work-author">이름 또는 학교</label>
            <input id="work-author" className="form-input" value={form.author} onChange={updateField('author')} required maxLength={60} />
          </div>
          <div className="form-field">
            <label htmlFor="work-link">결과물 링크</label>
            <input id="work-link" type="url" className="form-input" value={form.link} onChange={updateField('link')} required placeholder="https://" maxLength={500} />
          </div>
          <div className="form-field">
            <label htmlFor="work-description">한 줄 소개</label>
            <input id="work-description" className="form-input" value={form.description} onChange={updateField('description')} maxLength={200} />
          </div>

          {error && <p className="form-error">{error}</p>}

          <button className="button button-primary" type="submit" disabled={submitting}>
            {submitting ? '제출 중...' : '결과물 제출하기'}
          </button>
        </form>
      </div>
    </div>
  )
}

function PracticeGalleryPage() {
  const [works, setWorks] = useState(null)
  const [loadError, setLoadError] = useState(false)

  const loadWorks = () => {
    setLoadError(false)
    fetch('/api/works')
      .then((response) => {
        if (!response.ok) throw new Error('load failed')
        return response.json()
      })
      .then((data) => setWorks(data.works))
      .catch(() => setLoadError(true))
  }

  useEffect(() => {
    loadWorks()
  }, [])

  return (
    <section className="page-section">
      <div className="container narrow-container">
        <p className="eyebrow">실습 / 자료실</p>
        <h1>선생님들의 결과물 갤러리</h1>
        <p className="page-description">
          연수에 참여한 선생님들이 직접 만든 수업 도구를 소개하는 공간이에요.
        </p>

        <SubmitForm onSubmitted={loadWorks} />

        {loadError && (
          <Callout tone="warning" title="목록을 불러오지 못했어요">
            잠시 후 페이지를 새로고침해서 다시 시도해주세요.
          </Callout>
        )}

        {works === null && !loadError && <p className="lotto-empty">불러오는 중...</p>}

        {works !== null && works.length === 0 && (
          <div className="thumbnail-placeholder empty-state" role="img" aria-label="아직 공유된 작품이 없습니다">
            <p>아직 공유된 작품이 없어요.</p>
            <p>첫 번째 주인공이 되어보세요!</p>
          </div>
        )}

        {works !== null && works.length > 0 && (
          <div className="card-grid three-columns">
            {works.map((work) => (
              <article className="card resource-card" key={work.id}>
                <div className="thumbnail-placeholder" role="img" aria-label={`${work.title} 미리보기 영역`}>
                  미리보기
                </div>
                <h3>{work.title}</h3>
                <p className="card-example"><strong>{work.author}</strong>{work.description}</p>
                <a className="button button-secondary" href={work.link} target="_blank" rel="noreferrer">결과물 보러가기</a>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default PracticeGalleryPage
