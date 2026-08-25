import Breadcrumb from '../components/Breadcrumb.jsx'
import Callout from '../components/Callout.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import LottoPractice from '../components/LottoPractice.jsx'
import PageNav from '../components/PageNav.jsx'
import StepGuide from '../components/StepGuide.jsx'

const checks = [
  ['기능 점검', '번호 선택, 생성, 저장, 삭제가 예상대로 작동하는지 확인해요.'],
  ['모바일 확인', '휴대전화에서도 번호와 버튼이 잘 보이고 눌리는지 확인해요.'],
  ['공개 범위 설정', '누가 프로그램을 열 수 있는지 권한을 정해요.'],
  ['주소 공유', '배포가 끝나면 만들어진 웹 주소를 사용자에게 알려줘요.'],
]

const deploySteps = [
  { title: '완성 파일 준비하기', description: '"npm run build"처럼 AI가 알려준 명령을 실행해요. 사이트에 필요한 파일들이 dist라는 폴더 하나에 모여요.' },
  { title: '클라우드플레어 접속하기', description: '클라우드플레어(Cloudflare) 사이트에 접속해 구글 계정 등으로 로그인해요.' },
  { title: 'Pages 프로젝트 만들기', description: 'Workers & Pages 메뉴에서 Pages를 선택하고 새 프로젝트를 만들어요. Direct Upload(직접 업로드)를 선택해요.' },
  { title: 'dist 폴더 올리기', description: '1단계에서 만든 dist 폴더를 화면에 끌어다 놓으면 파일이 올라가요.' },
  { title: '주소 확인하고 공유하기', description: '업로드가 끝나면 화면에 인터넷 주소가 나타나요. 이 주소를 학생, 학부모, 동료 교사에게 전달해요.' },
]

const hostingOptions = [
  ['클라우드플레어 Pages', '이 연수에서 안내하는 방법이에요. 폴더를 끌어다 놓기만 하면 되어 처음 배포하기 가장 쉬워요.'],
  ['깃허브(GitHub) Pages', '코드를 깃허브에 올려본 경험이 있다면 이 방법도 무료로 쓸 수 있어요.'],
]

const deployPrompt = `지금까지 만든 로또 번호 생성기를 인터넷에 공개하고 싶어.

이 프로젝트에 가장 쉬운 무료 배포 방법 한 가지만 알려줘.
어떤 메뉴와 버튼을 눌러야 하는지 순서대로 설명해줘.
배포가 끝난 뒤 만들어진 인터넷 주소를 어디서 확인하는지도 알려줘.

코딩을 처음 배우는 사람도 그대로 따라 할 수 있게 쉬운 말로 설명해줘.`

function VibeDeployPage() {
  return (
    <section className="page-section">
      <div className="container narrow-container">
        <Breadcrumb eyebrow="로또 생성기 만들기 · 6/6" />
        <h1>배포: 다른 사람이 쓰게 공개하기</h1>
        <p className="page-description">내 컴퓨터에서만 보던 로또 생성기를 웹 주소로 열 수 있게 만들어요.</p>

        <p>
          배포는 완성한 학습 자료를 교실 게시판에 붙이는 것과 같아요. 코드를 실행할 서버에 올리고,
          공개 범위를 정하고, 사용자가 접속할 주소를 만드는 과정이에요. 이후 코드를 고치면 다시 배포해 새 버전을 보여줘요.
        </p>

        <h2>공개 전에 확인할 것</h2>
        <ul className="checklist">
          {checks.map(([title, description]) => <li key={title}><strong>{title}</strong>: {description}</li>)}
        </ul>

        <h2>클라우드플레어로 배포하는 순서</h2>
        <p>AI에게 배포를 부탁하면 아래와 비슷한 순서를 안내해줘요. 미리 흐름을 알아두면 훨씬 편하게 따라갈 수 있어요.</p>
        <StepGuide steps={deploySteps} />

        <h2>AI에게 요청할 프롬프트</h2>
        <CodeBlock label="배포 프롬프트" code={deployPrompt} />

        <LottoPractice stage="deploy" />

        <h2>무료 배포 서비스, 어떤 걸 쓸까요?</h2>
        <div className="compare-grid">
          {hostingOptions.map(([title, description]) => (
            <article className="card" key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>

        <Callout tone="warning" title="예시 주소는 실제 사이트가 아니에요">
          아래 실습은 배포 흐름을 익히는 모의 화면이에요. 실제 배포에서는 호스팅 서비스의 안내에 따라 주소와 권한을 설정해야 해요.
        </Callout>

        <PageNav prev={['/vibe-coding/database', '데이터베이스 실습']} />
      </div>
    </section>
  )
}

export default VibeDeployPage
