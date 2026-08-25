import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ContentPage from './pages/ContentPage.jsx'
import HomePage from './pages/HomePage.jsx'
import VibeWhatIsPage from './pages/VibeWhatIsPage.jsx'
import VibeHowToPage from './pages/VibeHowToPage.jsx'
import VibeStartGeminiPage from './pages/VibeStartGeminiPage.jsx'
import VibePromptTipsPage from './pages/VibePromptTipsPage.jsx'
import VibeDatabasePage from './pages/VibeDatabasePage.jsx'
import VibeDeployPage from './pages/VibeDeployPage.jsx'
import SheetsBasicsPage from './pages/SheetsBasicsPage.jsx'
import SheetsAppsScript101Page from './pages/SheetsAppsScript101Page.jsx'
import SheetsRecipesPage from './pages/SheetsRecipesPage.jsx'
import GeminiGemsPage from './pages/GeminiGemsPage.jsx'
import LessonPlanPage from './pages/LessonPlanPage.jsx'
import PracticeTemplatesPage from './pages/PracticeTemplatesPage.jsx'
import PracticeGalleryPage from './pages/PracticeGalleryPage.jsx'
import FaqPage from './pages/FaqPage.jsx'
import AboutPage from './pages/AboutPage.jsx'

const hubPages = [
  {
    path: 'vibe-coding',
    eyebrow: '학습 트랙 1',
    title: '바이브 코딩 기초',
    description: 'AI와 로또 번호 생성기를 만들며 프런트엔드, 백엔드, 데이터베이스, 배포의 역할을 단계별로 익혀봐요.',
    links: [
      ['/vibe-coding/what-is', '바이브 코딩', 'AI에게 만들고 싶은 것을 말하고, 나온 결과를 확인하며 대화로 고쳐가는 방식이에요.', '"1부터 45까지 중 6개를 뽑는 로또 생성기를 만들어줘"라고 부탁하기'],
      ['/vibe-coding/how-to', '바이브 코딩 과정', '하고 싶은 일을 말하고, AI가 만든 화면을 확인하고, 고친 뒤 인터넷에 공개하는 순서를 배워요.', '구글 제미나이에게 학급 행사 안내 사이트를 부탁하고 클라우드플레어로 주소 만들기'],
      ['/vibe-coding/start-gemini', '프런트엔드', '로또 생성기에 필요한 제목, 번호, 버튼의 화면 모양을 만들어요.', '기능 없이 번호 6개와 번호 생성하기 버튼을 화면에 배치하기'],
      ['/vibe-coding/prompt-tips', '백엔드', '중복 없이 6개의 번호를 무작위로 뽑는 규칙을 처리해요.', '생성 버튼을 누르면 정렬된 번호 6개 돌려주기'],
      ['/vibe-coding/database', '데이터베이스(DB)', '생성한 번호와 저장 시간을 기록하고 다시 불러와요.', '마음에 드는 번호 조합을 목록에 저장하기'],
      ['/vibe-coding/deploy', '배포', '완성한 프로그램을 다른 사람이 주소로 열어볼 수 있게 공개해요.', '점검을 마친 뒤 공개 주소로 로또 생성기 공유하기'],
    ],
  },
  {
    path: 'sheets-appsscript',
    eyebrow: '학습 트랙 2',
    title: '구글스프레드시트 X 앱스크립트',
    description: '구글 스프레드시트와 앱스크립트가 무엇인지 알아보고, 두 도구로 쉽게 바이브 코딩하는 방법을 살펴봐요.',
    links: [
      ['/sheets-appsscript/basics', '구글 스프레드시트란?', '인터넷에서 여러 사람이 함께 쓰는 똑똑한 표예요. 자료를 저장하고 계산하고 공유할 수 있어요.', '학생 명단, 출석, 점수를 한 표에서 관리하기'],
      ['/sheets-appsscript/appsscript-101', '앱스크립트란?', 'index.html은 사용자가 보는 화면을 만들고, Code.gs는 화면 뒤에서 시트를 읽고 일을 처리해요.', 'index.html의 버튼을 누르면 Code.gs가 학생 수를 확인해 화면에 알려주기'],
      ['/sheets-appsscript/recipes', '둘을 활용한 바이브 코딩', 'AI에게 필요한 기능을 말하면 코드를 만들고, 스프레드시트에서 바로 시험하고 공유할 수 있어요.', '"설문 결과를 반별로 정리해줘"라고 AI에게 요청하기'],
    ],
  },
  {
    path: 'practice',
    eyebrow: '따라 하며 익히기',
    title: '실습 / 자료실',
    description: 'Gemini Gems와 템플릿으로 직접 연습하고 다른 선생님들의 결과물도 둘러보세요.',
    links: [
      ['/practice/gemini-gems', 'Gemini Gems', '역할과 말투를 저장해두는 나만의 AI 조수를 만들어요.', '학부모 안내문을 항상 같은 형식으로 써주는 Gem 만들기'],
      ['/practice/templates', '바로 쓰는 템플릿'],
      ['/practice/gallery', '선생님들의 결과물 갤러리'],
    ],
  },
]

const leafRoutes = [
  ['vibe-coding/what-is', VibeWhatIsPage],
  ['vibe-coding/how-to', VibeHowToPage],
  ['vibe-coding/start-gemini', VibeStartGeminiPage],
  ['vibe-coding/prompt-tips', VibePromptTipsPage],
  ['vibe-coding/database', VibeDatabasePage],
  ['vibe-coding/deploy', VibeDeployPage],
  ['sheets-appsscript/basics', SheetsBasicsPage],
  ['sheets-appsscript/appsscript-101', SheetsAppsScript101Page],
  ['sheets-appsscript/recipes', SheetsRecipesPage],
  ['sheets-appsscript/vibe-benefits', SheetsRecipesPage],
  ['lesson-plan', LessonPlanPage],
  ['practice/gemini-gems', GeminiGemsPage],
  ['practice/templates', PracticeTemplatesPage],
  ['practice/gallery', PracticeGalleryPage],
  ['faq', FaqPage],
  ['about', AboutPage],
]

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        {hubPages.map(({ path, ...page }) => (
          <Route key={path} path={path} element={<ContentPage {...page} />} />
        ))}
        {leafRoutes.map(([path, Page]) => (
          <Route key={path} path={path} element={<Page />} />
        ))}
      </Route>
    </Routes>
  )
}

export default App
