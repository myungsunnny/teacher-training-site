import { useState } from 'react'
import Breadcrumb from '../components/Breadcrumb.jsx'
import Callout from '../components/Callout.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import InteractiveExample from '../components/InteractiveExample.jsx'
import PageNav from '../components/PageNav.jsx'

const codeGs = `function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

function getStudentCount() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName('학생명단');
  return sheet.getLastRow() - 1;
}`

const indexHtml = `<h1>학생 수 확인</h1>
<button onclick="showCount()">학생 수 보기</button>
<p id="result"></p>

<script>
  function showCount() {
    google.script.run
      .withSuccessHandler(function(count) {
        document.getElementById('result').textContent = count + '명';
      })
      .getStudentCount();
  }
</script>`

const addRowCode = `function addAttendance(name) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName('출석부');
  sheet.appendRow([new Date(), name, '출석']);
}`

const triangleParts = [
  ['🖥️', '프런트엔드', 'index.html', '학생과 선생님이 보고 누르는 화면이에요.'],
  ['⚙️', '백엔드', 'Code.gs', '요청을 받아 규칙대로 처리하는 부분이에요.'],
  ['🗄️', '데이터베이스', '스프레드시트', '학생 명단, 점수 같은 자료가 저장된 곳이에요.'],
]

const glossary = [
  ['getSheetByName("이름")', '이름으로 시트 하나를 선택해요.', '스프레드시트.getSheetByName("학생명단")'],
  ['getRange("A1")', '특정 칸(범위)을 선택해요.', '시트.getRange("B2")'],
  ['getValue() / setValue(값)', '칸의 값을 읽거나 새로 넣어요.', '시트.getRange("B2").setValue(90)'],
  ['appendRow([값들])', '표 맨 아래에 새 줄을 추가해요.', '시트.appendRow(["김하늘", "출석"])'],
  ['getLastRow()', '자료가 입력된 마지막 줄 번호를 알려줘요.', '시트.getLastRow() → 31'],
]

const sampleStudents = ['김하늘', '이도윤', '박서준', '최지우', '정민준']

function StudentCountLab() {
  const [count, setCount] = useState(null)

  return (
    <div className="lotto-lab">
      <div className="lotto-lab-heading">
        <h2>실습: 학생 수 세어보기</h2>
        <p>버튼을 누르면 index.html이 Code.gs에게 요청을 보내고, Code.gs가 시트를 세어 결과를 돌려줘요.</p>
      </div>
      <div className="lotto-request"><strong>버튼 클릭</strong>google.script.run.getStudentCount()</div>
      <div className="lotto-response" aria-live="polite">
        {count === null ? 'Code.gs의 응답을 기다리고 있어요.' : `Code.gs 응답: 학생명단 시트에 ${count}명이 있어요.`}
      </div>
      <div className="lotto-actions">
        <button className="button button-primary" type="button" onClick={() => setCount(sampleStudents.length)}>학생 수 보기</button>
        {count !== null && <button className="button button-secondary" type="button" onClick={() => setCount(null)}>초기화</button>}
      </div>
    </div>
  )
}

const demoSteps = [
  {
    label: '화면에서 누르기',
    status: '사용자가 index.html의 버튼을 눌러요.',
    title: 'index.html은 사용자가 보는 교실 앞 화면이에요',
    body: '제목, 안내 글, 버튼처럼 눈에 보이고 직접 누르는 부분을 만들어요.',
    result: '사용자가 "학생 수 보기" 버튼을 누름',
  },
  {
    label: '뒤에서 처리하기',
    status: 'index.html이 Code.gs에게 필요한 일을 부탁해요.',
    title: 'Code.gs는 뒤에서 일하는 교무실이에요',
    body: '스프레드시트의 학생명단 시트를 열고, 이름이 적힌 줄의 개수를 세어요.',
    result: 'Code.gs가 학생 수 27명을 확인함',
  },
  {
    label: '결과 보여주기',
    status: 'Code.gs가 알아낸 값을 index.html로 돌려줘요.',
    title: '화면과 처리 코드가 서로 대화해요',
    body: 'index.html은 받은 학생 수를 사용자가 볼 수 있도록 화면에 표시해요.',
    result: '버튼 아래에 "27명"이 표시됨',
  },
]

function SheetsAppsScript101Page() {
  return (
    <section className="page-section">
      <div className="container narrow-container">
        <Breadcrumb eyebrow="구글스프레드시트 X 앱스크립트 · 2/3" />
        <h1>앱스크립트란? Code.gs와 index.html</h1>
        <p className="page-description">화면을 만드는 파일과 일을 처리하는 파일을 연결해 간단한 웹 프로그램을 만들 수 있어요.</p>

        <p>
          앱스크립트로 웹 프로그램을 만들 때는 두 파일의 역할부터 알면 쉬워요. index.html은 선생님과 학생이 보는
          교실 앞 화면이고, Code.gs는 스프레드시트를 읽고 필요한 일을 처리하는 교무실이라고 생각해보세요.
        </p>

        <h2>세 조각이 만나면 프로그램이 돼요</h2>
        <p>앞 페이지의 스프레드시트(DB)에 이 페이지의 두 파일을 더하면, 프런트엔드·백엔드·DB를 모두 갖춘 프로그램이 완성돼요.</p>
        <div className="card-grid three-columns">
          {triangleParts.map(([icon, role, file, description]) => (
            <article className="card" key={role}>
              <span className="card-icon" aria-hidden="true">{icon}</span>
              <h3>{role}</h3>
              <p><strong>{file}</strong> — {description}</p>
            </article>
          ))}
        </div>

        <h2>두 파일은 무엇을 하나요?</h2>
        <div className="compare-grid">
          <article className="card">
            <h3>index.html: 보이는 화면</h3>
            <p>제목, 설명, 입력칸, 버튼처럼 사용자가 보고 누르는 부분을 만들어요.</p>
          </article>
          <article className="card">
            <h3>Code.gs: 뒤에서 하는 일</h3>
            <p>스프레드시트를 읽고 계산한 뒤 결과를 index.html로 돌려줘요.</p>
          </article>
        </div>

        <InteractiveExample
          title="학생 수 확인 프로그램"
          description="index.html과 Code.gs가 어떻게 이어지는지 버튼을 눌러 확인하세요."
          steps={demoSteps}
        />

        <h2>아주 짧은 코드 예시</h2>
        <p>아래 예시는 &ldquo;학생명단&rdquo; 시트의 학생 수를 세어 화면에 보여줘요.</p>
        <CodeBlock label="Code.gs" code={codeGs} />
        <CodeBlock label="index.html" code={indexHtml} />

        <StudentCountLab />

        <h2>자주 쓰는 앱스크립트 명령어</h2>
        <p>모든 명령어를 외울 필요는 없어요. 필요할 때 AI에게 &ldquo;이 명령어가 뭐야?&rdquo;라고 물어봐도 괜찮아요.</p>
        <div className="site-example-list">
          {glossary.map(([title, description, example], index) => (
            <details key={title} open={index === 0}>
              <summary>{title}</summary>
              <p>{description}</p>
              <p className="example-prompt"><strong>이렇게 써요</strong>{example}</p>
            </details>
          ))}
        </div>

        <h2>시트에 자료 저장하기</h2>
        <p>읽기만 하는 게 아니라 새 자료도 저장할 수 있어요. appendRow는 표 맨 아래에 새 줄을 추가해요.</p>
        <CodeBlock label="Code.gs · 출석 저장하기" code={addRowCode} />

        <Callout tone="tip" title="권한은 꼭 확인하세요">
          앱스크립트가 시트나 메일을 사용하려면 계정 권한이 필요해요. 요청하는 권한을 확인하고,
          출처를 모르는 코드는 실행하거나 승인하지 마세요.
        </Callout>

        <PageNav
          prev={['/sheets-appsscript/basics', '구글 스프레드시트란?']}
          next={['/sheets-appsscript/recipes', '둘을 활용한 바이브 코딩']}
        />
      </div>
    </section>
  )
}

export default SheetsAppsScript101Page
