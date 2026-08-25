import { useState } from 'react'
import Breadcrumb from '../components/Breadcrumb.jsx'
import InteractiveExample from '../components/InteractiveExample.jsx'
import PageNav from '../components/PageNav.jsx'

const concepts = [
  ['셀', '정보를 적는 한 칸이에요. A1, B2처럼 각 칸마다 주소가 있어요.'],
  ['행과 열', '행은 가로줄, 열은 세로줄이에요. 한 행에 학생 한 명의 정보를 정리할 수 있어요.'],
  ['함수', '합계나 평균처럼 반복되는 계산을 자동으로 해주는 식이에요.'],
  ['공유', '한 파일을 여러 사람이 함께 보고 수정할 수 있어요.'],
]

const paperVsSheet = [
  '종이가 찢어지거나 없어지면 자료도 사라져요',
  '합계나 평균을 손으로 다시 계산해야 해요',
  '동료에게 보여주려면 복사하거나 직접 전달해야 해요',
]

const digitalSheet = [
  '인터넷에 저장돼 컴퓨터가 바뀌어도 그대로 남아 있어요',
  '함수 하나로 합계, 평균, 개수를 바로 계산해요',
  '링크나 공유 버튼 하나로 동료와 함께 볼 수 있어요',
]

const functions = [
  ['SUM (합계)', '숫자를 모두 더해요.', '=SUM(B2:B31) → 반 전체 점수 합계'],
  ['AVERAGE (평균)', '숫자의 평균값을 구해요.', '=AVERAGE(B2:B31) → 반 평균 점수'],
  ['COUNTIF (조건별 개수)', '조건에 맞는 칸의 개수를 세요.', '=COUNTIF(C2:C31,"제출") → 과제 제출 인원'],
  ['IF (조건별 결과)', '조건에 따라 다른 값을 보여줘요.', '=IF(B2>=60,"통과","재시험") → 합격 여부 자동 표시'],
]

const sheetUseCases = [
  ['🗓️', '자동 출석부', '요일별 출석 여부를 기록하고 COUNTIF로 결석 일수를 세요.'],
  ['📊', '성적 관리표', '점수를 입력하면 평균과 등수를 자동으로 계산해요.'],
  ['📝', '설문 결과 정리', '구글 설문 응답이 시트에 자동으로 쌓여요.'],
  ['📚', '도서 대출 대장', '누가 어떤 책을 빌렸는지 표로 관리해요.'],
  ['📅', '시간표 관리', '요일과 교시별 과목을 표로 정리해요.'],
  ['👥', '모둠 편성표', '학생 이름과 모둠 번호를 한눈에 정리해요.'],
]

const sampleScores = [88, 92, 76, 95, 60, 84]

const scoreFunctions = [
  ['sum', '합계 구하기', 'SUM', (values) => values.reduce((total, value) => total + value, 0)],
  ['average', '평균 구하기', 'AVERAGE', (values) => Math.round((values.reduce((total, value) => total + value, 0) / values.length) * 10) / 10],
  ['max', '최고점 찾기', 'MAX', (values) => Math.max(...values)],
  ['pass', '60점 이상 인원', 'COUNTIF', (values) => values.filter((value) => value >= 60).length],
]

function FunctionLab() {
  const [activeKey, setActiveKey] = useState(null)

  const active = scoreFunctions.find((item) => item[0] === activeKey)

  return (
    <div className="lotto-lab">
      <div className="lotto-lab-heading">
        <h2>실습: 함수 버튼을 눌러 계산해보세요</h2>
        <p>6명의 점수 [{sampleScores.join(', ')}] 로 원하는 계산을 골라 결과를 확인하세요.</p>
      </div>
      <div className="lotto-actions">
        {scoreFunctions.map(([key, label]) => (
          <button
            className={activeKey === key ? 'deploy-check is-complete' : 'deploy-check'}
            key={key}
            type="button"
            aria-pressed={activeKey === key}
            onClick={() => setActiveKey(key)}
          >
            <span aria-hidden="true">{activeKey === key ? '✓' : '선택'}</span>
            {label}
          </button>
        ))}
      </div>
      <div className="lotto-response" aria-live="polite">
        {active ? `=${active[2]}(B2:B7) → 결과: ${active[3](sampleScores)}` : '위 버튼을 눌러 함수 결과를 확인해보세요.'}
      </div>
    </div>
  )
}

const demoSteps = [
  {
    label: '자료 적기',
    status: '표의 한 줄에 학생 한 명의 정보를 적어요.',
    title: '종이 명단처럼 차례로 입력해요',
    body: 'A열에는 이름, B열에는 출석 여부처럼 정보의 종류마다 자리를 정하면 찾기 쉬워요.',
    result: 'A2: 김하늘 / B2: 출석 / C2: 과제 제출',
  },
  {
    label: '자동 계산',
    status: '함수가 필요한 값을 바로 계산해요.',
    title: '출석 학생 수를 손으로 세지 않아요',
    body: 'COUNTIF 함수로 "출석"이라고 적힌 칸의 개수를 자동으로 셀 수 있어요.',
    result: '=COUNTIF(B2:B31, "출석") / 결과: 27명',
  },
  {
    label: '함께 보기',
    status: '같은 파일을 동료와 안전하게 공유해요.',
    title: '목적에 맞게 권한을 정해요',
    body: '함께 기록할 사람은 편집자, 확인만 할 사람은 뷰어로 초대할 수 있어요.',
    result: '5학년 담임: 편집 가능 / 학년 부장: 보기 가능',
  },
]

function SheetsBasicsPage() {
  return (
    <section className="page-section">
      <div className="container narrow-container">
        <Breadcrumb eyebrow="구글스프레드시트 X 앱스크립트 · 1/3" />
        <h1>구글 스프레드시트란?</h1>
        <p className="page-description">인터넷에서 여러 사람이 함께 쓰는 똑똑한 표예요.</p>

        <p>
          구글 스프레드시트는 칸이 많이 그려진 온라인 공책과 같아요. 학생 명단, 출석, 점수처럼
          학교에서 자주 다루는 자료를 표로 정리하고, 계산하고, 동료와 공유할 수 있어요.
          웹브라우저에서 열리므로 별도 프로그램을 설치하지 않아도 돼요.
        </p>
        <p>
          이 강좌 전체에서 스프레드시트는 <strong>데이터베이스(DB)</strong> 역할을 맡아요. 학생 명단, 점수,
          설문 응답처럼 프로그램이 다뤄야 할 자료를 저장하는 창고인 셈이에요. 다음 페이지에서 배울
          앱스크립트가 이 창고를 읽고 쓰는 방법을 알려줄 거예요.
        </p>

        <h2>종이 기록부와 무엇이 다를까요?</h2>
        <div className="compare-grid">
          <article className="card">
            <h3>📋 종이 기록부</h3>
            <ul className="checklist">
              {paperVsSheet.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
          <article className="card">
            <h3>💻 구글 스프레드시트</h3>
            <ul className="checklist">
              {digitalSheet.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        </div>

        <h2>먼저 알아둘 네 가지</h2>
        <div className="card-grid four-columns">
          {concepts.map(([title, description]) => (
            <article className="card" key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>

        <h2>자주 쓰는 함수 4가지</h2>
        <p>함수는 반복 계산을 대신 해주는 식이에요. 셀에 등호(=)와 함수 이름을 적으면 바로 계산돼요.</p>
        <div className="site-example-list">
          {functions.map(([title, description, example], index) => (
            <details key={title} open={index === 0}>
              <summary>{title}</summary>
              <p>{description}</p>
              <p className="example-prompt"><strong>이렇게 써요</strong>{example}</p>
            </details>
          ))}
        </div>

        <FunctionLab />

        <InteractiveExample
          title="온라인 출석부 살펴보기"
          description="버튼을 눌러 자료 입력, 자동 계산, 공유가 어떻게 이어지는지 확인하세요."
          steps={demoSteps}
        />

        <h2>선생님도 이렇게 활용할 수 있어요</h2>
        <div className="card-grid three-columns">
          {sheetUseCases.map(([icon, title, description]) => (
            <article className="card" key={title}>
              <span className="card-icon" aria-hidden="true">{icon}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>

        <PageNav next={['/sheets-appsscript/appsscript-101', '앱스크립트란?']} />
      </div>
    </section>
  )
}

export default SheetsBasicsPage
