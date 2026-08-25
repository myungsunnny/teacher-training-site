import { useState } from 'react'
import Callout from '../components/Callout.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import StepGuide from '../components/StepGuide.jsx'

function shuffle(items) {
  const result = [...items]
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[result[index], result[swapIndex]] = [result[swapIndex], result[index]]
  }
  return result
}

const templates = [
  ['#tool-attendance', '자동 출석부 웹앱', '학생이 보이는 화면에서 출석을 체크하면 스프레드시트에 기록돼요.'],
  ['#tool-grader', '객관식 자동채점기 웹앱', '학생이 답안을 제출하면 자동으로 채점되어 시트에 쌓여요.'],
  ['#tool-groups', '모둠 자동 편성기 웹앱', '버튼 하나로 모둠을 나누고 결과를 시트에 저장해요.'],
  ['#tool-timetable', '시간표 생성기 웹앱', '과목표 시트를 읽어 시간표를 만들고 시트에 기록해요.'],
]

const deploySteps = [
  { title: '새 스프레드시트 만들기', description: '브라우저 주소창에 sheets.new 를 입력하면 새 스프레드시트가 바로 열려요. 시트(탭)는 따로 만들 필요 없어요 — 코드의 "초기설정"이 자동으로 만들어줘요.' },
  { title: 'Apps Script 열기', description: '스프레드시트 위쪽 메뉴에서 확장 프로그램 → Apps Script를 누르면 새 탭에 코드 편집기가 열려요.' },
  { title: 'Code.gs 붙여넣기', description: '편집기에 원래 있던 function myFunction() { } 코드를 모두 지우고, 템플릿의 Code.gs 코드를 붙여넣은 뒤 저장(Ctrl+S 또는 💾 아이콘)해요.' },
  { title: 'index 파일 만들기', description: '왼쪽 파일 목록의 + 버튼 → HTML을 누르고 파일 이름을 index 로 지어요(.html은 자동으로 붙어요). 안의 내용을 모두 지우고 템플릿의 index.html 코드를 붙여넣고 저장해요.' },
  { title: '초기설정 실행하기', description: '편집기 위쪽의 함수 선택 상자에서 "초기설정"을 고르고 실행(▶) 버튼을 눌러요. 필요한 시트와 예시 자료가 스프레드시트에 자동으로 만들어져요.' },
  { title: '권한 승인하기', description: '처음 실행하면 "승인 필요" 창이 떠요. 내 계정 선택 → "Google에서 확인하지 않은 앱" 화면이 나오면 겁먹지 말고 고급 → 프로젝트로 이동 → 허용 순서로 눌러요. 내가 방금 붙여넣은 코드라서 안심해도 돼요.' },
  { title: '웹 앱으로 배포하기', description: '오른쪽 위 배포 → 새 배포를 누르고, 톱니바퀴(⚙)에서 유형을 웹 앱으로 선택해요. "실행 계정"은 나, "액세스 권한"은 혼자 쓰면 "나만", 학생과 함께 쓰면 "링크가 있는 모든 사용자"를 고르고 배포를 눌러요.' },
  { title: '주소 열어 사용하기', description: '화면에 나온 웹 앱 URL을 복사해 새 탭에서 열어요. 이 주소를 학생이나 동료에게 공유하면 같은 화면을 쓸 수 있어요.' },
]

const attendancePrep = '"초기설정"을 한 번 실행하면 "학생명단"과 "출석부" 시트가 자동으로 만들어지고 예시 학생 3명이 들어가요. 학생명단 시트의 이름만 우리 반 학생으로 바꿔주세요.'

const attendanceCodeGs = `function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

// 처음 한 번만 실행하세요. 필요한 시트를 자동으로 만들어줘요.
function 초기설정() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const list = getSheet_(ss, '학생명단', ['이름']);
  getSheet_(ss, '출석부', ['날짜', '이름', '출석여부']);
  if (list.getLastRow() < 2) {
    [['김하늘'], ['이도윤'], ['박서준']].forEach(function(row) { list.appendRow(row); });
  }
}

// 시트가 없으면 만들어서 돌려주는 도우미 함수예요.
function getSheet_(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    if (headers) sheet.appendRow(headers);
  }
  return sheet;
}

function getStudents() {
  const sheet = getSheet_(SpreadsheetApp.getActiveSpreadsheet(), '학생명단', ['이름']);
  if (sheet.getLastRow() < 2) return [];
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues().flat().filter(String);
}

function saveAttendance(records) {
  const sheet = getSheet_(SpreadsheetApp.getActiveSpreadsheet(), '출석부', ['날짜', '이름', '출석여부']);
  const today = Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd');
  records.forEach(function(record) {
    sheet.appendRow([today, record.name, record.present ? '출석' : '결석']);
  });
  const presentCount = records.filter(function(record) { return record.present; }).length;
  return presentCount + '명 / 전체 ' + records.length + '명';
}`

const attendanceIndexHtml = `<!DOCTYPE html>
<html>
<head>
  <base target="_top">
  <style>
    body { font-family: sans-serif; padding: 16px; }
    .chip { margin: 4px; padding: 10px 14px; border-radius: 8px; border: 1px solid #ccc; font-size: 15px; }
    .on { background: #e8f0fe; border-color: #1a73e8; color: #1a73e8; }
    .off { background: #fde8e8; border-color: #d93025; color: #d93025; }
    #save { margin-top: 12px; padding: 10px 20px; font-size: 15px; }
  </style>
</head>
<body>
  <h2>오늘의 출석부</h2>
  <div id="list">명단을 불러오는 중...</div>
  <button id="save" onclick="save()">출석 저장</button>
  <p id="result"></p>
  <script>
    let students = [];
    google.script.run.withSuccessHandler(function(names) {
      students = names.map(function(name) { return { name: name, present: true }; });
      draw();
    }).getStudents();

    function draw() {
      document.getElementById('list').innerHTML = students.map(function(s, i) {
        return '<button class="chip ' + (s.present ? 'on' : 'off') + '" onclick="toggle(' + i + ')">'
          + s.name + ' · ' + (s.present ? '출석' : '결석') + '</button>';
      }).join('');
    }
    function toggle(i) { students[i].present = !students[i].present; draw(); }
    function save() {
      google.script.run.withSuccessHandler(function(message) {
        document.getElementById('result').textContent = '저장 완료! 출석 ' + message;
      }).saveAttendance(students);
    }
  </script>
</body>
</html>`

const graderPrep = '"초기설정"을 한 번 실행하면 "정답표"(예시 정답 5문항)와 "결과" 시트가 자동으로 만들어져요. 정답표 1행의 정답만 실제 시험 정답으로 바꿔주세요.'

const graderCodeGs = `function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

// 처음 한 번만 실행하세요. 필요한 시트를 자동으로 만들어줘요.
function 초기설정() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const key = getSheet_(ss, '정답표');
  if (key.getLastRow() === 0) {
    key.getRange(1, 1, 1, 5).setValues([['1', '3', '2', '4', '5']]);
  }
  getSheet_(ss, '결과', ['제출시각', '이름', '점수']);
}

// 시트가 없으면 만들어서 돌려주는 도우미 함수예요.
function getSheet_(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    if (headers) sheet.appendRow(headers);
  }
  return sheet;
}

function getQuestionCount() {
  const sheet = getSheet_(SpreadsheetApp.getActiveSpreadsheet(), '정답표');
  if (sheet.getLastColumn() === 0) 초기설정();
  return sheet.getLastColumn();
}

function submitAnswers(name, answersText) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const keySheet = getSheet_(ss, '정답표');
  if (keySheet.getLastColumn() === 0) 초기설정();
  const key = keySheet.getRange(1, 1, 1, keySheet.getLastColumn()).getValues()[0]
    .map(function(value) { return String(value).trim(); });
  const answers = answersText.split(/[\\s,]+/).filter(String);

  let score = 0;
  key.forEach(function(answer, index) {
    if (answers[index] === answer) score++;
  });

  getSheet_(ss, '결과', ['제출시각', '이름', '점수'])
    .appendRow([new Date(), name, score + ' / ' + key.length]);
  return score + ' / ' + key.length;
}`

const graderIndexHtml = `<!DOCTYPE html>
<html>
<head>
  <base target="_top">
  <style>
    body { font-family: sans-serif; padding: 16px; }
    input { display: block; width: 260px; margin: 8px 0; padding: 10px; font-size: 15px; }
    button { padding: 10px 20px; font-size: 15px; }
    #result { font-size: 20px; font-weight: bold; color: #1a73e8; }
  </style>
</head>
<body>
  <h2>객관식 답안 제출</h2>
  <p id="info">문항 수를 불러오는 중...</p>
  <input id="name" placeholder="이름">
  <input id="answers" placeholder="답안 (예: 1, 3, 2, 4, 5)">
  <button onclick="submitAnswers()">제출하고 채점받기</button>
  <p id="result"></p>
  <script>
    google.script.run.withSuccessHandler(function(count) {
      document.getElementById('info').textContent = '총 ' + count + '문항이에요. 답을 쉼표로 구분해 적어주세요.';
    }).getQuestionCount();

    function submitAnswers() {
      const name = document.getElementById('name').value.trim();
      const answers = document.getElementById('answers').value.trim();
      if (!name || !answers) { alert('이름과 답안을 모두 적어주세요.'); return; }
      google.script.run.withSuccessHandler(function(score) {
        document.getElementById('result').textContent = name + ' 학생 점수: ' + score;
      }).submitAnswers(name, answers);
    }
  </script>
</body>
</html>`

const groupsPrep = '"초기설정"을 한 번 실행하면 "학생명단"(예시 8명)과 "모둠편성" 시트가 자동으로 만들어져요. 이름만 우리 반 학생으로 바꿔주세요.'

const groupsCodeGs = `function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

// 처음 한 번만 실행하세요. 필요한 시트를 자동으로 만들어줘요.
function 초기설정() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const list = getSheet_(ss, '학생명단', ['이름']);
  getSheet_(ss, '모둠편성');
  if (list.getLastRow() < 2) {
    [['김하늘'], ['이도윤'], ['박서준'], ['최지우'], ['정민준'], ['한소율'], ['오유진'], ['강도현']]
      .forEach(function(row) { list.appendRow(row); });
  }
}

// 시트가 없으면 만들어서 돌려주는 도우미 함수예요.
function getSheet_(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    if (headers) sheet.appendRow(headers);
  }
  return sheet;
}

function makeGroups(size) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const listSheet = getSheet_(ss, '학생명단', ['이름']);
  if (listSheet.getLastRow() < 2) 초기설정();
  const names = listSheet.getRange(2, 1, listSheet.getLastRow() - 1, 1)
    .getValues().flat().filter(String);

  // 이름 순서를 무작위로 섞기
  for (let i = names.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = names[i]; names[i] = names[j]; names[j] = temp;
  }

  const groups = [];
  for (let i = 0; i < names.length; i += size) {
    groups.push(names.slice(i, i + size));
  }

  const out = getSheet_(ss, '모둠편성');
  out.clearContents();
  groups.forEach(function(group, index) {
    out.appendRow([(index + 1) + '모둠'].concat(group));
  });
  return groups;
}`

const groupsIndexHtml = `<!DOCTYPE html>
<html>
<head>
  <base target="_top">
  <style>
    body { font-family: sans-serif; padding: 16px; }
    input { width: 60px; padding: 8px; font-size: 15px; }
    button { padding: 10px 20px; font-size: 15px; margin-left: 8px; }
    .group { margin: 8px 0; padding: 10px 14px; background: #f5f7fb; border-radius: 8px; }
  </style>
</head>
<body>
  <h2>모둠 자동 편성기</h2>
  <label>모둠당 인원 <input id="size" type="number" value="4" min="2"></label>
  <button onclick="make()">모둠 편성하기</button>
  <div id="result"></div>
  <script>
    function make() {
      const size = Number(document.getElementById('size').value) || 4;
      document.getElementById('result').textContent = '편성 중...';
      google.script.run.withSuccessHandler(function(groups) {
        if (!groups.length) {
          document.getElementById('result').textContent = '학생명단 시트에 이름을 추가한 뒤 다시 눌러주세요.';
          return;
        }
        document.getElementById('result').innerHTML = groups.map(function(group, i) {
          return '<div class="group"><b>' + (i + 1) + '모둠</b> · ' + group.join(', ') + '</div>';
        }).join('');
      }).makeGroups(size);
    }
  </script>
</body>
</html>`

const timetablePrep = '"초기설정"을 한 번 실행하면 "과목표"(예시 과목 8개)와 "시간표" 시트가 자동으로 만들어져요. 과목과 시수만 우리 반에 맞게 고쳐주세요.'

const timetableCodeGs = `function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

// 처음 한 번만 실행하세요. 필요한 시트를 자동으로 만들어줘요.
function 초기설정() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const subjects = getSheet_(ss, '과목표', ['과목', '시수']);
  getSheet_(ss, '시간표');
  if (subjects.getLastRow() < 2) {
    [['국어', 6], ['수학', 5], ['영어', 3], ['사회', 3], ['과학', 3], ['체육', 3], ['음악', 2], ['미술', 2]]
      .forEach(function(row) { subjects.appendRow(row); });
  }
}

// 시트가 없으면 만들어서 돌려주는 도우미 함수예요.
function getSheet_(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    if (headers) sheet.appendRow(headers);
  }
  return sheet;
}

function makeTimetable() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const subjectSheet = getSheet_(ss, '과목표', ['과목', '시수']);
  if (subjectSheet.getLastRow() < 2) 초기설정();
  const rows = subjectSheet.getRange(2, 1, subjectSheet.getLastRow() - 1, 2).getValues();

  const lessons = [];
  rows.forEach(function(row) {
    for (let i = 0; i < Number(row[1] || 0); i++) lessons.push(String(row[0]));
  });

  const slots = [];
  for (let day = 0; day < 5; day++) {
    for (let period = 0; period < 6; period++) slots.push([day, period]);
  }
  for (let i = slots.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = slots[i]; slots[i] = slots[j]; slots[j] = temp;
  }

  const grid = [];
  for (let period = 0; period < 6; period++) grid.push(['-', '-', '-', '-', '-']);
  lessons.slice(0, 30).forEach(function(lesson, index) {
    grid[slots[index][1]][slots[index][0]] = lesson;
  });

  const out = getSheet_(ss, '시간표');
  out.clearContents();
  out.appendRow(['교시', '월', '화', '수', '목', '금']);
  grid.forEach(function(row, index) {
    out.appendRow([(index + 1) + '교시'].concat(row));
  });
  return grid;
}`

const timetableIndexHtml = `<!DOCTYPE html>
<html>
<head>
  <base target="_top">
  <style>
    body { font-family: sans-serif; padding: 16px; }
    button { padding: 10px 20px; font-size: 15px; }
    table { margin-top: 12px; border-collapse: collapse; }
    th, td { padding: 8px 12px; border: 1px solid #ccc; text-align: center; }
    th { background: #f5f7fb; }
  </style>
</head>
<body>
  <h2>시간표 생성기</h2>
  <button onclick="make()">시간표 만들기</button>
  <div id="result"></div>
  <script>
    const days = ['월', '화', '수', '목', '금'];
    function make() {
      document.getElementById('result').textContent = '만드는 중...';
      google.script.run.withSuccessHandler(function(grid) {
        let html = '<table><tr><th>교시</th>';
        days.forEach(function(day) { html += '<th>' + day + '</th>'; });
        html += '</tr>';
        grid.forEach(function(row, period) {
          html += '<tr><th>' + (period + 1) + '</th>';
          row.forEach(function(subject) { html += '<td>' + subject + '</td>'; });
          html += '</tr>';
        });
        document.getElementById('result').innerHTML = html + '</table>';
      }).makeTimetable();
    }
  </script>
</body>
</html>`

function WebAppCode({ prep, codeGs, indexHtml }) {
  return (
    <details className="tool-recipe">
      <summary>웹 앱 코드 받기 (Code.gs · index.html)</summary>
      <p className="example-prompt"><strong>시트 자동 생성</strong>{prep}</p>
      <CodeBlock label="Code.gs" code={codeGs} />
      <CodeBlock label="index.html" code={indexHtml} />
    </details>
  )
}

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
        <h2>자동 출석부 웹앱</h2>
        <p>완성된 웹 앱은 이렇게 작동해요. 학생 이름을 누르면 출석과 결석이 바뀌고, 실제 웹 앱에서는 저장 버튼을 누르면 스프레드시트에 오늘 날짜로 기록돼요.</p>
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
      <WebAppCode prep={attendancePrep} codeGs={attendanceCodeGs} indexHtml={attendanceIndexHtml} />
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
        <h2>객관식 자동채점기 웹앱</h2>
        <p>완성된 웹 앱에서는 학생이 이름과 답안을 제출하면 자동으로 채점되고 결과가 시트에 쌓여요. 아래에서 채점 원리를 미리 체험해보세요.</p>
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
      <WebAppCode prep={graderPrep} codeGs={graderCodeGs} indexHtml={graderIndexHtml} />
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
        <h2>모둠 자동 편성기 웹앱</h2>
        <p>완성된 웹 앱에서는 시트의 학생 명단을 읽어 모둠을 나누고 결과를 "모둠편성" 시트에 저장해요. 아래에서 편성 방식을 미리 체험해보세요.</p>
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
      <WebAppCode prep={groupsPrep} codeGs={groupsCodeGs} indexHtml={groupsIndexHtml} />
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
        <h2>시간표 생성기 웹앱</h2>
        <p>완성된 웹 앱에서는 "과목표" 시트를 읽어 시간표를 만들고 "시간표" 시트에 저장해요. 아래에서 생성 방식을 미리 체험해보세요.</p>
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
      <WebAppCode prep={timetablePrep} codeGs={timetableCodeGs} indexHtml={timetableIndexHtml} />
    </section>
  )
}

function PracticeTemplatesPage() {
  return (
    <section className="page-section">
      <div className="container narrow-container">
        <p className="eyebrow">실습 / 자료실</p>
        <h1>바로 쓰는 템플릿: 앱스크립트 웹앱</h1>
        <p className="page-description">
          네 가지 템플릿 모두 앱스크립트 웹 앱으로 만들 수 있는 완성 코드가 준비되어 있어요.
          이 페이지에서 작동 모습을 미리 체험하고, Code.gs와 index.html을 복사해
          내 스프레드시트에 붙여넣으면 똑같은 웹 앱이 완성돼요.
        </p>

        <div className="card-grid page-link-grid is-four-up">
          {templates.map(([anchor, title, description], index) => (
            <article className="card" key={title}>
              <span className="step-number" aria-hidden="true">{index + 1}</span>
              <h2>{title}</h2>
              <p>{description}</p>
              <a className="text-link" href={anchor}>체험하고 코드 받기 <span aria-hidden="true">↓</span></a>
            </article>
          ))}
        </div>

        <h2>웹 앱으로 배포하는 공통 순서</h2>
        <p>어떤 템플릿이든 배포 방법은 같아요. 한 번 익혀두면 네 가지 모두 만들 수 있어요. 시트(탭)도 코드가 자동으로 만들어주니, 스프레드시트는 빈 채로 시작하면 돼요.</p>
        <StepGuide steps={deploySteps} />

        <Callout tone="tip" title="코드를 고친 뒤에는 새 버전으로 다시 배포하세요">
          코드를 수정하고 저장만 하면 웹 앱에는 반영되지 않아요. 배포 → 배포 관리 → 연필(수정) 아이콘 →
          버전을 &ldquo;새 버전&rdquo;으로 바꾸고 배포를 눌러야 바뀐 내용이 웹 앱 주소에 적용돼요.
        </Callout>

        <Callout tone="warning" title="학생 개인정보는 넣지 마세요">
          연습할 때는 예시 이름을 그대로 쓰고, 실제로 사용할 때도 웹 앱 주소를 공개 게시판에 올리지 마세요.
          &ldquo;액세스 권한&rdquo;을 &ldquo;링크가 있는 모든 사용자&rdquo;로 배포하면 주소를 아는 누구나 열 수 있어요.
        </Callout>

        <AttendanceTool />
        <QuizGraderTool />
        <GroupMakerTool />
        <TimetableTool />
      </div>
    </section>
  )
}

export default PracticeTemplatesPage
