import { useState } from 'react'

const categories = ['전체', '제미나이 관련', '시트 · 앱스크립트 관련', '계정 · 권한']

const faqs = [
  { category: '제미나이 관련', question: '코딩을 한 번도 해보지 않았는데 괜찮을까요?', answer: '네, 괜찮아요. 바이브 코딩은 문법을 외우는 대신 원하는 것을 말로 설명하는 방식이라 코딩 경험이 없어도 시작할 수 있어요.' },
  { category: '제미나이 관련', question: '제미나이 답변이 이상하게 나오면 어떻게 하나요?', answer: '한 번에 완벽하지 않아도 괜찮아요. "이 부분을 이렇게 바꿔줘"처럼 이어서 구체적으로 요청하면 점점 원하는 결과에 가까워져요.' },
  { category: '시트 · 앱스크립트 관련', question: 'Apps Script 실행 시 권한 승인이 필요한가요?', answer: '네, 처음 실행할 때 한 번 권한 승인이 필요해요. 본인이 만든 스크립트라면 안심하고 승인해도 괜찮아요.' },
  { category: '시트 · 앱스크립트 관련', question: '코드에서 오류가 나면 어떻게 확인하나요?', answer: 'Apps Script 편집기 하단의 실행 로그에서 오류 메시지를 확인할 수 있어요. 오류 메시지를 제미나이에게 그대로 보여주고 고쳐달라고 요청해도 좋아요.' },
  { category: '계정 · 권한', question: '학교 계정에서도 제미나이를 사용할 수 있나요?', answer: '학교(교육청) 구글 워크스페이스 정책에 따라 다를 수 있어요. 접속이 제한된다면 담당 부서에 이용 가능 여부를 확인해보세요.' },
  { category: '계정 · 권한', question: '개인정보가 담긴 학생 자료를 사용해도 되나요?', answer: '실습 단계에서는 실제 학생 개인정보 대신 가상의 이름과 숫자로 연습하는 것을 권장해요.' },
]

function FaqPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('전체')

  const filtered = faqs.filter((faq) => {
    const matchesCategory = category === '전체' || faq.category === category
    const matchesQuery = faq.question.includes(query) || faq.answer.includes(query)
    return matchesCategory && matchesQuery
  })

  return (
    <section className="page-section">
      <div className="container narrow-container">
        <p className="eyebrow">문제 해결</p>
        <h1>자주 묻는 질문</h1>
        <p className="page-description">
          권한 승인, 실행 오류 등 연수 중 자주 막히는 지점의 해결 방법을 찾아보세요.
        </p>

        <input
          type="search"
          className="faq-search"
          placeholder="궁금한 점을 검색해보세요 (예: 권한 오류)"
          aria-label="FAQ 검색"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <div className="filter-chips" role="group" aria-label="카테고리 필터">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={`filter-chip${category === item ? ' active' : ''}`}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="faq-list">
            {filtered.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        ) : (
          <p className="faq-empty">검색 조건에 맞는 질문을 찾지 못했어요. 다른 검색어로 시도해보세요.</p>
        )}
      </div>
    </section>
  )
}

export default FaqPage
