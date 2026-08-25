import { useState } from 'react'
import { generateLottoNumbers } from '../utils/lotto.js'

function LottoBalls({ numbers, emptyText = '아직 번호가 없어요.' }) {
  if (numbers.length === 0) return <p className="lotto-empty">{emptyText}</p>

  return (
    <div className="lotto-balls" aria-label={`선택된 번호 ${numbers.join(', ')}`}>
      {numbers.map((number) => <span className="lotto-ball" key={number}>{number}</span>)}
    </div>
  )
}

const frontendParts = [
  ['title', '제목과 안내'],
  ['balls', '번호 자리 6개'],
  ['button', '생성 버튼'],
]

function FrontendPractice() {
  const [added, setAdded] = useState([])

  const toggle = (key) => {
    setAdded((current) => current.includes(key)
      ? current.filter((item) => item !== key)
      : [...current, key])
  }

  return (
    <div className="lotto-lab">
      <div className="lotto-lab-heading">
        <h2>실습: 화면 부품을 직접 조립해보세요</h2>
        <p>아래 버튼을 눌러 부품을 하나씩 추가해보세요. 아직 기능은 없고, 화면에 무엇이 어떻게 보이는지만 확인해요.</p>
      </div>
      <div className="lotto-actions">
        {frontendParts.map(([key, label]) => (
          <button
            className={added.includes(key) ? 'deploy-check is-complete' : 'deploy-check'}
            key={key}
            type="button"
            aria-pressed={added.includes(key)}
            onClick={() => toggle(key)}
          >
            <span aria-hidden="true">{added.includes(key) ? '추가됨' : '추가'}</span>
            {label}
          </button>
        ))}
      </div>
      <div className="lotto-static-preview" aria-label="조립 중인 로또 번호 생성기 화면 예시">
        <p className="lotto-preview-label">화면 미리보기</p>
        {added.length === 0 && <p className="lotto-empty">아직 부품이 없어요. 위 버튼을 눌러 하나씩 추가해보세요.</p>}
        {added.includes('title') && (
          <>
            <h3>로또 번호 생성기</h3>
            <p>버튼을 누르면 번호 6개가 이곳에 나타나요.</p>
          </>
        )}
        {added.includes('balls') && <LottoBalls numbers={[7, 12, 19, 26, 34, 41]} />}
        {added.includes('button') && <span className="lotto-preview-button">번호 생성하기</span>}
        {added.length > 0 && <p className="lotto-preview-note">화면 모양만 보여주는 예시라서 버튼은 작동하지 않아요.</p>}
      </div>
    </div>
  )
}

function BackendPractice() {
  const [numbers, setNumbers] = useState([])

  return (
    <div className="lotto-lab">
      <div className="lotto-lab-heading">
        <h2>실습: 번호 생성 요청 처리하기</h2>
        <p>버튼을 누르면 백엔드 규칙이 1부터 45까지 중 중복 없는 6개를 뽑아 오름차순으로 돌려줘요.</p>
      </div>
      <div className="lotto-request"><strong>요청</strong>GET /api/lotto</div>
      <LottoBalls numbers={numbers} emptyText="번호 생성 요청을 보내보세요." />
      <div className="lotto-actions">
        <button className="button button-primary" type="button" onClick={() => setNumbers(generateLottoNumbers())}>번호 생성 요청</button>
        {numbers.length > 0 && <button className="button button-secondary" type="button" onClick={() => setNumbers([])}>결과 지우기</button>}
      </div>
      <p className="lotto-response" aria-live="polite">{numbers.length > 0 ? `응답: { "numbers": [${numbers.join(', ')}] }` : '응답을 기다리고 있어요.'}</p>
    </div>
  )
}

function DatabasePractice() {
  const [numbers, setNumbers] = useState(generateLottoNumbers)
  const [saved, setSaved] = useState([])

  const saveNumbers = () => {
    const key = numbers.join('-')
    setSaved((current) => current.some((item) => item.key === key)
      ? current
      : [...current, { key, numbers }])
  }

  return (
    <div className="lotto-lab">
      <div className="lotto-lab-heading">
        <h2>실습: 번호 조합 저장하기</h2>
        <p>생성한 번호를 저장하고 다시 목록에서 확인해보세요. 실제 서비스에서는 이 기록을 데이터베이스에 보관해요.</p>
      </div>
      <LottoBalls numbers={numbers} />
      <div className="lotto-actions">
        <button className="button button-secondary" type="button" onClick={() => setNumbers(generateLottoNumbers())}>다른 번호 생성</button>
        <button className="button button-primary" type="button" onClick={saveNumbers}>이 조합 저장</button>
      </div>
      <div className="lotto-saved">
        <h3>저장된 번호</h3>
        {saved.length === 0 ? <p className="lotto-empty">저장된 번호가 없어요.</p> : (
          <ul>
            {saved.map((item, index) => (
              <li key={item.key}>
                <span>기록 {index + 1}</span>
                <LottoBalls numbers={item.numbers} />
                <button type="button" onClick={() => setSaved((current) => current.filter((savedItem) => savedItem.key !== item.key))}>삭제</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

const deployChecks = ['기능 점검', '모바일 화면 확인', '공개 범위 설정']

function DeployPractice() {
  const [completed, setCompleted] = useState([])
  const isDeployed = completed.length === deployChecks.length

  const toggleCheck = (check) => {
    setCompleted((current) => current.includes(check)
      ? current.filter((item) => item !== check)
      : [...current, check])
  }

  return (
    <div className="lotto-lab">
      <div className="lotto-lab-heading">
        <h2>실습: 배포 전 점검하기</h2>
        <p>세 항목을 모두 확인하면 모의 공개 주소가 나타나요. 배포는 완성한 프로그램을 다른 사람이 열 수 있게 만드는 단계예요.</p>
      </div>
      <div className="deploy-checks">
        {deployChecks.map((check) => (
          <button
            className={completed.includes(check) ? 'deploy-check is-complete' : 'deploy-check'}
            key={check}
            type="button"
            aria-pressed={completed.includes(check)}
            onClick={() => toggleCheck(check)}
          >
            <span aria-hidden="true">{completed.includes(check) ? '완료' : '확인'}</span>
            {check}
          </button>
        ))}
      </div>
      <div className={isDeployed ? 'deploy-result is-ready' : 'deploy-result'} aria-live="polite">
        <strong>{isDeployed ? '배포 준비 완료' : `점검 ${completed.length}/${deployChecks.length}`}</strong>
        {isDeployed ? <p>예시 공개 주소: https://lotto-class.example.com</p> : <p>남은 항목을 확인하면 공개 주소를 만들 수 있어요.</p>}
      </div>
    </div>
  )
}

function LottoPractice({ stage }) {
  if (stage === 'frontend') return <FrontendPractice />
  if (stage === 'backend') return <BackendPractice />
  if (stage === 'database') return <DatabasePractice />
  return <DeployPractice />
}

export default LottoPractice
