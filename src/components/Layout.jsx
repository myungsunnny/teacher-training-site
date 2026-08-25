import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

const navigation = [
  ['/', '홈'],
  ['/vibe-coding', '바이브 코딩 기초'],
  ['/sheets-appsscript', '구글스프레드시트 X 앱스크립트'],
  ['/lesson-plan', '수업 교안 만들기'],
  ['/practice', '실습 / 자료실'],
  ['/faq', 'FAQ'],
]

function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to="/" onClick={closeMenu}>
          <span aria-hidden="true">🏫</span>
          <span>AI 수업 도구 만들기 연수</span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="primary-navigation"
          className={`primary-navigation${isOpen ? ' is-open' : ''}`}
          aria-label="주요 메뉴"
        >
          <ul>
            {navigation.map(([to, label]) => (
              <li key={to}>
                <NavLink
                  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                  end={to === '/'}
                  to={to}
                  onClick={closeMenu}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <NavLink className="button button-primary header-cta" to="/about" onClick={closeMenu}>
            연수 소개 <span aria-hidden="true">→</span>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="brand footer-brand" to="/">
            <span aria-hidden="true">🏫</span>
            <span>AI 수업 도구 만들기 연수</span>
          </Link>
          <p>선생님의 아이디어를 AI와 함께 수업 도구로 만들어봐요.</p>
        </div>
        <div>
          <h2>이 연수에 대하여</h2>
          <ul>
            <li><Link to="/about">연수 소개</Link></li>
            <li><Link to="/faq">자주 묻는 질문</Link></li>
            <li><Link to="/about">문의하기</Link></li>
          </ul>
        </div>
        <div>
          <h2>바로가기</h2>
          <ul>
            <li><Link to="/vibe-coding">바이브 코딩 기초</Link></li>
            <li><Link to="/sheets-appsscript">시트 × 앱스크립트</Link></li>
            <li><Link to="/lesson-plan">수업 교안 만들기</Link></li>
            <li><Link to="/practice">실습 / 자료실</Link></li>
          </ul>
        </div>
      </div>
      <div className="container footer-note">
        이 자료는 교육 목적의 연수 자료입니다.
      </div>
    </footer>
  )
}

function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <a className="skip-link" href="#main-content">본문으로 바로가기</a>
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
