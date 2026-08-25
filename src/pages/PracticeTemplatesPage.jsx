import { useState } from 'react'
import CodeBlock from '../components/CodeBlock.jsx'

function shuffle(items) {
  const result = [...items]
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[result[index], result[swapIndex]] = [result[swapIndex], result[index]]
  }
  return result
}

const templates = [
  ['#tool-attendance', '자동 출석부', '이름을 누르면 출석과 결석이 바뀌고 인원이 자동으로 집계돼요.'],
  ['#tool-grader', '객관식 자동채점기', '정답표와 학생 답안을 입력하면 점수를 바로 계산해줘요.'],
  ['#tool-groups', '모둠 자동 편성기', '학생 명단을 넣으면 무작위로 모둠을 나눠줘요.'],
  ['#tool-timetable', '시간표 생성기', '과목과 시수를 입력하면 주간 시간표 초안을 만들어줘요.'],
]

const attendancePrompt = `구글 스프레드시트로 자동 출석부를 만들고 싶어.

A열에 학생 이름, B열에 출석 여부(출석/결석)를 적을 거야.
D1 셀에 =COUNTIF(B:B,"출석") 으로 출석 인원,
D2 셀에 =COUNTIF(B:B,"결석") 으로 결석 인원이 자동 계산되게 해줘.
B열은 데이터 확인 기능으로 "출석"과 "결석"만 고를 수 있게 하는 방법도 알려줘.`

const graderPrompt = `구글 스프레드시트와 앱스크립트로 객관식 자동채점기를 만들고 싶어.

1행에는 문제별 정답을 적고, 2행부터는 학생 이름과 답안을 적을 거야.
정답과 학생 답안을 한 칸씩 비교해서 맞은 개수를 점수 열에 자동으로 적어주는
앱스크립트 코드를 만들어줘. 코딩을 처음 배우는 사람도 따라 할 수 있게 설명해줘.`

const groupsPrompt = `구글 스프레드시트와 앱스크립트로 모둠 자동 편성기를 만들고 싶어.

A열에 적은 학생 이름을 무작위로 섞어서 내가 정한 인원수만큼 모둠으로 나누고,
결과를 새 시트에 모둠별로 정리해주는 앱스크립트 코드를 만들어줘.
버튼을 눌러 실행하는 방법도 알려줘.`

const timetablePrompt = `구글 스프레드시트와 앱스크립트로 시간표 생성기를 만들고 싶어.

과목 이름과 주당 시수를 적어두면, 월~금 6교시 표에 과목을 무작위로 배치해서
시간표 초안을 만들어주는 앱스크립트 코드를 만들어줘.
빈 칸이 남으면 "-"로 표시해줘.`

const defaultStudents = ['김하늘', '이도윤', '박서준', '최지우', '정민준', '한소율']

function AttendanceTool() {
  const [students, setStudents] = useState(defaultStudents.map((name) => ({ name, present: true })))
  const [newName, setNewName] = useState('')

  const toggle = (name) => {
    setStudents((current) => current.map((student) => student.name === name
      ? { ...student, present: !student.present }
      : student))
  }

  const addStudent = (event) => {
    event.preventDefault()
    const name = newName.trim()
    if (!name || students.some((student) => student.name === name)) return
    setStudents((current) => [...current, { name, present: true }])
    setNewName('')
  }

  const removeStudent = (name) => setStudents((current) => current.filter((student) => student.name !== name))

  const presentCount = students.filter((student) => student.present).length

  return (
    <section id="tool-attendance" className="lotto-lab">
      <div className="lotto-lab-heading">
        <h2>자동 출석부</h2>
        <p>학생 이름을 누르면 출석과 결석이 바뀌어요. × 버튼으로 명단에서 뺄 수 있어요.</p>
      </div>
      <div className="lotto-actions">
        {students.map(({ name, present }) => (
          <button
            className={present ? 'deploy-check is-complete' : 'deploy-check'}
            key={name}
            type="button"
            aria-pressed={present}
            onClick={() => toggle(name)}
          >
            <span aria-hidden="true">{present ? '출석' : '결석'}</span>
            {name}
            <span
              role="button"
              aria-label={`${name} 명단에서 빼기`}
              onClick={(event) => { event.stopPropagation(); removeStudent(name) }}
            >
              ×
            </span>
          </button>
        ))}
      </div>
      <form className="tool-inline-form" onSubmit={addStudent}>
        <input
          className="form-input"
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
          placeholder="학생 이름"
          aria-label="추가할 학생 이름"
          maxLength={20}
        />
        <button className="button button-secondary" type="submit">학생 추가</button>
      </form>
      <p className="lotto-response" aria-live="polite">
        전체 {students.length}명 / 출석 {presentCount}명 / 결석 {students.length - presentCount}명
      </p>
      <details className="tool-recipe">
        <summary>내 구글 시트로 만들기 (프롬프트 보기)</summary>
        <CodeBlock label="AI에게 요청할 프롬프트" code={attendancePrompt} />
      </details>
    </section>
  )
}

function parseAnswers(text) {
  return text.split(/[\s,]+/).filter(Boolean)
}

function QuizGraderTool() {
  const [answerKey, setAnswerKey] = useState('1, 3, 2, 4, 5')
  const [rows, setRows] = useState([
    { name: '김하늘', answers: '1, 3, 2, 4, 2' },
    { name: '이도윤', answers: '1, 2, 2, 4, 5' },
  ])

  const key = parseAnswers(answerKey)

  const updateRow = (index, field) => (event) => {
    setRows((current) => current.map((row, rowIndex) => rowIndex === index
      ? { ...row, [field]: event.target.value }
      : row))
  }

  const addRow = () => setRows((current) => [...current, { name: '', answers: '' }])
  const removeRow = (index) => setRows((current) => current.filter((_, rowIndex) => rowIndex !== index))

  const scoreOf = (answersText) => {
    const answers = parseAnswers(answersText)
    return key.filter((answer, index) => answers[index] === answer).length
  }

  return (
    <section id="tool-grader" className="lotto-lab">
      <div className="lotto-lab-heading">
        <h2>객관식 자동채점기</h2>
        <p>정답표와 학생 답안을 쉼표로 구분해 적으면 점수가 실시간으로 계산돼요.</p>
      </div>
      <div className="form-field">
        <label htmlFor="grader-key">정답표 ({key.length}문항)</label>
        <input id="grader-key" className="form-input" value={answerKey} onChange={(event) => setAnswerKey(event.target.value)} />
      </div>
      {rows.map((row, index) => (
        <div className="tool-grader-row" key={index}>
          <input
            className="form-input"
            value={row.name}
            onChange={updateRow(index, 'name')}
            placeholder="학생 이름"
            aria-label={`${index + 1}번째 학생 이름`}
          />
          <input
            className="form-input"
            value={row.answers}
            onChange={updateRow(index, 'answers')}
            placeholder="답안 (예: 1, 3, 2, 4, 5)"
            aria-label={`${index + 1}번째 학생 답안`}
          />
          <span className="tool-grader-score">{scoreOf(row.answers)} / {key.length}</span>
          <button className="tool-remove-button" type="button" aria-label="이 줄 삭제" onClick={() => removeRow(index)}>×</button>
        </div>
      ))}
      <div className="lotto-actions">
        <button className="button button-secondary" type="button" onClick={addRow}>학생 줄 추가</button>
      </div>
      <details className="tool-recipe">
        <summary>내 구글 시트로 만들기 (프롬프트 보기)</summary>
        <CodeBlock label="AI에게 요청할 프롬프트" code={graderPrompt} />
      </details>
    </section>
  )
}

function GroupMakerTool() {
  const [namesText, setNamesText] = useState('김하늘\n이도윤\n박서준\n최지우\n정민준\n한소율\n오유진\n강도현\n윤서아\n임시우\n장하린\n조은우')
  const [groupSize, setGroupSize] = useState(4)
  const [groups, setGroups] = useState(null)

  const makeGroups = () => {
    const names = namesText.split('\n').map((name) => name.trim()).filter(Boolean)
    const size = Math.max(2, groupSize)
    const shuffled = shuffle(names)
    const result = []
    for (let index = 0; index < shuffled.length; index += size) {
      result.push(shuffled.slice(index, index + size))
    }
    setGroups(result)
  }

  return (
    <section id="tool-groups" className="lotto-lab">
      <div className="lotto-lab-heading">
        <h2>모둠 자동 편성기</h2>
        <p>학생 이름을 한 줄에 한 명씩 적고, 모둠 인원을 정한 뒤 버튼을 누르세요.</p>
      </div>
      <div className="form-field">
        <label htmlFor="groups-names">학생 명단</label>
        <textarea
          id="groups-names"
          className="form-input"
          rows={6}
          value={namesText}
          onChange={(event) => setNamesText(event.target.value)}
        />
      </div>
      <div className="form-field">
        <label htmlFor="groups-size">모둠당 인원</label>
        <input
          id="groups-size"
          className="form-input tool-number-input"
          type="number"
          min={2}
          max={10}
          value={groupSize}
          onChange={(event) => setGroupSize(Number(event.target.value))}
        />
      </div>
      <div className="lotto-actions">
        <button className="button button-primary" type="button" onClick={makeGroups}>모둠 편성하기</button>
        {groups && <button className="button button-secondary" type="button" onClick={makeGroups}>다시 섞기</button>}
      </div>
      {groups && (
        <div className="card-grid three-columns tool-group-grid" aria-live="polite">
          {groups.map((group, index) => (
            <article className="card" key={index}>
              <h3>{index + 1}모둠</h3>
              <p>{group.join(', ')}</p>
            </article>
          ))}
        </div>
      )}
      <details className="tool-recipe">
        <summary>내 구글 시트로 만들기 (프롬프트 보기)</summary>
        <CodeBlock label="AI에게 요청할 프롬프트" code={groupsPrompt} />
      </details>
    </section>
  )
}

const days = ['월', '화', '수', '목', '금']
const periodCount = 6

function TimetableTool() {
  const [subjects, setSubjects] = useState([
    { name: '국어', hours: 6 },
    { name: '수학', hours: 5 },
    { name: '영어', hours: 3 },
    { name: '사회', hours: 3 },
    { name: '과학', hours: 3 },
    { name: '체육', hours: 3 },
    { name: '음악', hours: 2 },
    { name: '미술', hours: 2 },
  ])
  const [grid, setGrid] = useState(null)

  const totalHours = subjects.reduce((sum, subject) => sum + (subject.hours || 0), 0)
  const maxHours = days.length * periodCount

  const updateSubject = (index, field) => (event) => {
    const value = field === 'hours' ? Number(event.target.value) : event.target.value
    setSubjects((current) => current.map((subject, subjectIndex) => subjectIndex === index
      ? { ...subject, [field]: value }
      : subject))
  }

  const addSubject = () => setSubjects((current) => [...current, { name: '', hours: 1 }])
  const removeSubject = (index) => setSubjects((current) => current.filter((_, subjectIndex) => subjectIndex !== index))

  const generate = () => {
    const lessons = subjects.flatMap((subject) => subject.name.trim()
      ? Array.from({ length: subject.hours || 0 }, () => subject.name.trim())
      : [])
    const slots = shuffle(
      days.flatMap((_, dayIndex) => Array.from({ length: periodCount }, (_, period) => [dayIndex, period]))
    )
    const table = Array.from({ length: periodCount }, () => Array(days.length).fill('-'))
    lessons.slice(0, slots.length).forEach((lesson, index) => {
      const [dayIndex, period] = slots[index]
      table[period][dayIndex] = lesson
    })
    setGrid(table)
  }

  return (
    <section id="tool-timetable" className="lotto-lab">
      <div className="lotto-lab-heading">
        <h2>시간표 생성기</h2>
        <p>과목과 주당 시수를 정한 뒤 버튼을 누르면 월~금 6교시 시간표 초안이 만들어져요.</p>
      </div>
      {subjects.map((subject, index) => (
        <div className="tool-grader-row" key={index}>
          <input
            className="form-input"
            value={subject.name}
            onChange={updateSubject(index, 'name')}
            placeholder="과목 이름"
            aria-label={`${index + 1}번째 과목 이름`}
          />
          <input
            className="form-input tool-number-input"
            type="number"
            min={0}
            max={10}
            value={subject.hours}
            onChange={updateSubject(index, 'hours')}
            aria-label={`${subject.name || `${index + 1}번째 과목`} 주당 시수`}
          />
          <button className="tool-remove-button" type="button" aria-label="이 과목 삭제" onClick={() => removeSubject(index)}>×</button>
        </div>
      ))}
      <div className="lotto-actions">
        <button className="button button-secondary" type="button" onClick={addSubject}>과목 추가</button>
        <button className="button button-primary" type="button" onClick={generate} disabled={totalHours === 0}>시간표 만들기</button>
      </div>
      <p className="lotto-response">
        주당 총 {totalHours}시간 / 배치 가능 {maxHours}칸{totalHours > maxHours ? ' — 칸보다 많아 일부 과목은 빠져요.' : ''}
      </p>
      {grid && (
        <div className="tool-table-wrap" aria-live="polite">
          <table className="tool-table">
            <thead>
              <tr>
                <th>교시</th>
                {days.map((day) => <th key={day}>{day}</th>)}
              </tr>
            </thead>
            <tbody>
              {grid.map((row, period) => (
                <tr key={period}>
                  <th>{period + 1}</th>
                  {row.map((subject, dayIndex) => <td key={dayIndex}>{subject}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <details className="tool-recipe">
        <summary>내 구글 시트로 만들기 (프롬프트 보기)</summary>
        <CodeBlock label="AI에게 요청할 프롬프트" code={timetablePrompt} />
      </details>
    </section>
  )
}

function PracticeTemplatesPage() {
  return (
    <section className="page-section">
      <div className="container narrow-container">
        <p className="eyebrow">실습 / 자료실</p>
        <h1>바로 쓰는 템플릿</h1>
        <p className="page-description">
          아래 템플릿은 이 페이지에서 바로 작동해요. 수업에서 그대로 써보고,
          각 템플릿의 프롬프트를 복사하면 내 구글 시트 버전도 만들 수 있어요.
        </p>

        <div className="card-grid page-link-grid is-four-up">
          {templates.map(([anchor, title, description], index) => (
            <article className="card" key={title}>
              <span className="step-number" aria-hidden="true">{index + 1}</span>
              <h2>{title}</h2>
              <p>{description}</p>
              <a className="text-link" href={anchor}>바로 사용하기 <span aria-hidden="true">↓</span></a>
            </article>
          ))}
        </div>

        <AttendanceTool />
        <QuizGraderTool />
        <GroupMakerTool />
        <TimetableTool />
      </div>
    </section>
  )
}

export default PracticeTemplatesPage
