import Breadcrumb from '../components/Breadcrumb.jsx'
import Callout from '../components/Callout.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import InteractiveExample from '../components/InteractiveExample.jsx'
import PageNav from '../components/PageNav.jsx'

const journeySteps = [
  {
    label: '생각 말하기',
    status: '내가 불편했던 일 하나를 떠올려요.',
    title: '무엇이 있으면 편할지 말해요',
    body: '멋진 이름이나 어려운 계획은 필요 없어요. 평소 말하듯 필요한 것을 한 문장으로 적어요.',
    result: '"학급 행사 날짜와 준비물을 한눈에 보는 사이트가 있으면 좋겠어."',
  },
  {
    label: '첫 화면 받기',
    status: '구글 제미나이가 사이트의 첫 모습을 만들어요.',
    title: '처음부터 완벽하지 않아도 괜찮아요',
    body: 'AI가 만든 결과는 완성품이 아니라 밑그림이에요. 우선 화면이 열리는지만 확인해요.',
    result: '큰 제목 아래에 행사 날짜, 장소, 준비물이 차례로 놓인 화면',
  },
  {
    label: '직접 보기',
    status: '내가 학생이나 학부모라고 생각하고 살펴봐요.',
    title: '틀린 곳보다 불편한 곳을 찾아요',
    body: '휴대전화에서 글자가 잘 보이는지, 필요한 내용이 빠지지 않았는지 한 가지만 확인해요.',
    result: '"날짜가 작아서 잘 안 보여. 날짜를 더 크게 보여줘."',
  },
  {
    label: '다시 부탁하기',
    status: '고칠 일을 하나씩 제미나이에게 말해요.',
    title: '말로 고치고 다시 확인해요',
    body: '마음에 들지 않는 부분을 짧고 분명하게 말해요. 바뀐 화면을 보고 같은 과정을 반복해요.',
    result: '"날짜를 크게 바꾸고, 준비물은 노란 상자 안에 넣어줘."',
  },
  {
    label: '주소 만들기',
    status: '완성한 사이트를 클라우드플레어에 올려요.',
    title: '교실 게시판에 붙이듯 공개해요',
    body: '클라우드플레어는 사이트 파일을 보관하고 다른 사람이 들어올 인터넷 주소를 만들어줘요.',
    result: '주소를 동료에게 보내 휴대전화에서도 잘 열리는지 확인하기',
  },
]

const siteExamples = [
  ['학급 행사 안내', '날짜, 장소, 준비물을 한 화면에 보여줘요.', '학급 행사 안내 사이트를 만들어줘. 날짜와 준비물을 크게 보여줘.'],
  ['수업 자료 모음', '과목별 활동지와 참고 링크를 모아 보여줘요.', '국어, 수학, 과학 자료를 과목별로 모아 보는 사이트를 만들어줘.'],
  ['랜덤 모둠 편성', '연습용 이름을 넣고 버튼으로 모둠을 섞어요.', '가상의 학생 12명을 4명씩 모둠으로 나누는 연습 화면을 만들어줘.'],
  ['급식 메뉴 투표', '세 가지 메뉴 중 하나를 고르는 투표를 연습해요.', '좋아하는 급식 메뉴 하나를 고르는 간단한 투표 화면을 만들어줘.'],
  ['자기소개 카드', '이름, 좋아하는 것, 사진 자리를 담은 카드예요.', '학생이 자기소개를 적는 카드 화면을 만들어줘. 이름과 좋아하는 것을 넣을 칸이 있어야 해.'],
  ['숙제 제출 체크리스트', '숙제 이름과 제출 여부를 목록으로 보여줘요.', '숙제 목록을 보여주고 제출했으면 체크 표시가 되는 화면을 만들어줘.'],
]

const weakPrompts = [
  '"사이트 만들어줘"',
  '"학급 페이지 예쁘게 해줘"',
  '"안 이쁜데 고쳐줘"',
]

const goodPrompts = [
  '"학급 행사 안내 사이트를 만들어줘. 학생과 학부모가 휴대전화로 볼 거야. 날짜, 장소, 준비물을 크게 보여줘."',
  '"제목 글자를 지금보다 두 배 크게 하고 배경을 연한 하늘색으로 바꿔줘."',
  '"버튼 색이 배경과 비슷해서 잘 안 보여. 버튼을 파란색으로 눈에 띄게 바꿔줘."',
]

const starterPrompt = `학급 행사 안내 사이트를 만들어줘.

학생과 학부모가 휴대전화로 볼 거야.
화면에는 아래 내용을 넣어줘.
- 행사 이름: 우리 반 가을 운동회
- 날짜: 10월 15일 수요일
- 장소: 학교 운동장
- 준비물: 운동화, 물병, 모자

글자를 큼직하게 하고 밝고 편안한 느낌으로 만들어줘.
먼저 화면 모양만 만들고, 버튼 기능은 넣지 말아줘.
내가 고치기 쉽게 파일과 실행 방법도 알려줘.`

function VibeHowToPage() {
  return (
    <section className="page-section">
      <div className="container narrow-container">
        <Breadcrumb eyebrow="바이브 코딩 기초 · 2/6" />
        <h1>바이브 코딩 과정: 말로 시작해 사이트 만들기</h1>
        <p className="page-description">코드를 몰라도 괜찮아요. 필요한 것을 말하고, 화면을 보며 하나씩 고치는 과정부터 시작해요.</p>

        <p>
          바이브 코딩은 요리사에게 음식을 부탁하는 것과 비슷해요. 선생님이 원하는 음식을 말하면 제미나이가
          첫 접시를 만들어요. 맛을 보고 "조금 덜 맵게 해줘"라고 다시 말하듯, 화면을 보고 한 가지씩 고치면 돼요.
        </p>

        <figure className="learning-flow-figure">
          <img
            src="/vibe-coding-flow.png"
            alt="아이디어를 정하고 AI와 대화해 화면을 확인한 뒤 클라우드에 올려 학생과 공유하는 과정"
          />
          <figcaption>생각 말하기 → 첫 화면 받기 → 직접 보기 → 다시 부탁하기 → 주소 만들기</figcaption>
        </figure>

        <h2>도구 이름은 이렇게 생각하세요</h2>
        <dl className="beginner-tool-list">
          <div><dt>구글 제미나이</dt><dd>내 말을 듣고 사이트 부품을 만들어주는 AI 도우미예요.</dd></div>
          <div><dt>사이트 파일</dt><dd>글자, 색깔, 버튼을 담은 레고 블록 상자와 같아요.</dd></div>
          <div><dt>클라우드플레어</dt><dd>완성한 사이트를 올리고 인터넷 주소를 만들어주는 전시 공간이에요.</dd></div>
        </dl>

        <InteractiveExample
          title="버튼을 눌러 과정을 따라가 보세요"
          description="각 버튼을 누르면 그때 할 일과 실제로 말할 수 있는 예시가 바뀌어요."
          steps={journeySteps}
          resultLabel="그대로 써볼 수 있는 예시"
        />

        <section className="learning-photo-block">
          <img
            src="/vibe-coding-classroom-example.png"
            alt="교실에서 두 교원이 노트북으로 만든 학급 행사 사이트를 함께 확인하는 모습"
          />
          <div>
            <h2>이렇게 함께 확인할 수 있어요</h2>
            <p>혼자서 모든 문제를 찾을 필요는 없어요. 동료에게 화면을 보여주고 "어디가 헷갈려요?"라고 물어보세요.</p>
            <p>받은 의견을 다시 제미나이에게 말하면 다음 수정 내용이 됩니다.</p>
          </div>
        </section>

        <h2>좋은 질문 vs 아쉬운 질문</h2>
        <p>AI는 짐작하지 않아요. 같은 부탁이라도 얼마나 구체적으로 말하느냐에 따라 결과가 크게 달라져요.</p>
        <div className="compare-grid">
          <article className="card">
            <h3>🙁 아쉬운 질문</h3>
            <p>누가 볼지, 무엇을 넣을지, 어떻게 보이길 원하는지가 빠져 있어요. AI가 알아서 짐작해야 해요.</p>
            <ul className="checklist">
              {weakPrompts.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
          <article className="card">
            <h3>🙂 좋은 질문</h3>
            <p>보는 사람, 들어갈 내용, 원하는 크기나 색깔처럼 구체적인 정보가 담겨 있어요.</p>
            <ul className="checklist">
              {goodPrompts.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        </div>

        <h2>처음 만들기 좋은 예시</h2>
        <div className="site-example-list">
          {siteExamples.map(([title, description, prompt], index) => (
            <details key={title} open={index === 0}>
              <summary>{title}</summary>
              <p>{description}</p>
              <p className="example-prompt"><strong>제미나이에게 말하기</strong>{prompt}</p>
            </details>
          ))}
        </div>

        <h2>제미나이에게 이렇게 시작해 보세요</h2>
        <CodeBlock label="초보자용 첫 프롬프트" code={starterPrompt} />

        <Callout tone="warning" title="학생 개인정보는 넣지 마세요">
          이름, 연락처, 성적처럼 보호해야 할 정보는 공개 사이트 예시에 사용하지 마세요. 처음에는 가상의 자료로 연습해요.
        </Callout>

        <Callout title="클라우드플레어에 올리는 말도 쉽게 풀어볼게요">
          npm run build는 사이트 부품을 한 상자에 포장하라는 명령이에요. 실행하면 dist라는 새 폴더가 생겨요.
          이 폴더를 Pages의 Direct Upload 화면에 올리면 인터넷 주소가 만들어집니다. 자세한 최신 순서는{' '}
          <a href="https://developers.cloudflare.com/pages/get-started/direct-upload/" target="_blank" rel="noreferrer">공식 안내</a>에서 확인할 수 있어요.
        </Callout>

        <PageNav
          prev={['/vibe-coding/what-is', '바이브 코딩']}
          next={['/vibe-coding/start-gemini', '프런트엔드 실습']}
        />
      </div>
    </section>
  )
}

export default VibeHowToPage
