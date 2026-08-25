import Callout from '../components/Callout.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import InteractiveExample from '../components/InteractiveExample.jsx'
import StepGuide from '../components/StepGuide.jsx'

const flowSteps = [
  {
    label: '자료 준비',
    status: '가지고 있는 수업 자료를 모아요.',
    title: '수업설계안과 참고자료 모으기',
    body: '수업설계안, 학년·교과, 단원과 학습목표, 학생 상황, 참고 디자인을 준비해요. 자료가 모두 없어도 괜찮아요.',
    result: '수업설계안 파일 + 수업 기본 정보 메모',
  },
  {
    label: 'Gemini 소스자료',
    status: 'Gemini가 슬라이드용 소스자료를 만들어요.',
    title: '프롬프트 실행 후 TXT로 저장해요',
    body: '자료를 첨부하고 소스자료 프롬프트를 붙여넣으면 슬라이드 12~15쪽 구성안이 나와요.',
    result: '수업명_슬라이드소스.txt',
  },
  {
    label: '디자인 소스',
    status: '슬라이드에 입힐 디자인 기준을 골라요.',
    title: 'DESIGN.md를 고르거나 만들어요',
    body: 'designmd.me, getdesign.md, BananaNL 세 가지 방법 중 하나로 색상·서체·간격 기준을 준비해요.',
    result: '수업명_DESIGN.md 또는 BananaNL 디자인 프롬프트',
  },
  {
    label: 'NotebookLM 슬라이드',
    status: '두 소스를 올려 슬라이드를 만들어요.',
    title: 'NotebookLM에서 슬라이드로 완성해요',
    body: 'TXT와 DESIGN.md를 소스로 올리고 요청 문장을 입력하면 수업 슬라이드가 생성돼요.',
    result: '완성된 수업 슬라이드 자료',
  },
]

const prepareItems = [
  ['AI·디지털 기반 수업설계안', '이번 수업의 흐름이 담긴 설계안 파일이에요.'],
  ['학년·교과', '어느 학년, 어느 과목 수업인지 알려줘요.'],
  ['단원과 학습목표', '이번 차시에 도달할 목표를 적어요.'],
  ['학생 상황', '학생 수, 수준, 디지털 기기 환경 등을 간단히 메모해요.'],
  ['참고 디자인', '참고하고 싶은 색감이나 분위기가 있다면 함께 준비해요.'],
]

const geminiPrompt = `너는 교사의 수업설계안을 학생 중심의 실제 수업 장면으로 구체화하는 전문 [수업자료 및 PPT 소스 설계자]입니다.

[입력자료]
- 첨부된 AI·디지털 기반 수업설계안
- 학년·교과 / 단원 / 학습목표 / 학생 상황 / 참고 디자인 요소 (제공된 범위 내 활용)

[목표]
제공된 수업설계안을 바탕으로, 이후 NotebookLM 및 AI 슬라이드 제작 도구에 직접 입력하여 즉시 PPT를 만들 수 있는 **구체적인 수업 소스자료(TXT/Markdown 포맷)**를 작성해 주세요.

[작성 원칙]
1. 단순 요약이 아닌, 수업 시간에 학생이 실제 화면을 보고 수행할 행동 중심으로 작성합니다.
2. 모든 슬라이드는 아래 제공하는 [슬라이드 표준 출력 템플릿] 양식을 100% 엄격히 준수합니다.
3. 화면 표출 텍스트는 학생 시선에 맞춰 간결하게 작성하고, 교사 안내 및 주요 발문은 별도로 구분합니다.
4. AI·디지털 기기 활용 지시사항(접속, 검색, 프롬프트 입력 등)과 소요 시간을 명확히 포함합니다.

[디자인 및 시각 지침 (전체 슬라이드 일관 적용)]
- 화면 비율: 16:9 기준
- 디자인 아이덴티티:
* 메인 색상 1종, 포인트 색상 1종, 배경 색상 1종 지정 (표지에서 선언 후 고정)
* 제목/본문 서체 위계 설정 (제목: 크고 두껍게, 본문: 가독성 중심)
* 장식 요소 최소화, 질문과 학생 행동 지침이 최우선 시각적 요소가 되도록 배치
- 시각자료 지시: 사진/아이콘/도식/AI 활용 화면 등의 위치(예: 우측 40%), 형태(예: 카드형 3개), 스타일을 구체적으로 서술
- 바닥글: 모든 슬라이드 하단에 [수업명 | 단원명 | Slide NO.] 고정 표기

---

[슬라이드 표준 출력 템플릿] (이 양식을 모든 슬라이드에 동일하게 적용할 것)

### Slide [번호]: [짧고 분명한 슬라이드 제목]
- **학습 단계**: [도입 / 전개1 / 전개2 / 정리 등]
- **활동 형태 및 시간**: [전체/개인/모둠] | [00분]
- **화면 구성 레이아웃**: [예: 2열 타일형 / 좌측 텍스트-우측 이미지 / 중앙 강조형 등]

#### 1. 화면 표출 내용 (학생용 스크린)
- **핵심 헤드라인**: (학생이 한눈에 파악할 1문장)
- **본문/안내 문구**: (bullet point 형태, 바로 이해 가능한 명료한 문장)
- **디지털·AI 행동 지침**: (예: '패들렛 2번 카드로 이동하여 작성', '생성형 AI에 ~질문 입력하기')

#### 2. 교사 가이드 & 핵심 질문
- **교사 발문/안내**: "교사가 실제로 말할 대사 스타일 문장"
- **수업 촉진 질문**: "학생의 생각을 열어주는 핵심 질문"

#### 3. 시각 자료 및 레이아웃 상세 지시
- **배치 및 구도**: (예: 화면 중앙에 3개의 색상 카드 배치, 우측 상단에 활동 시간 타이머 아이콘)
- **이미지/아이콘 명세**: (필요한 시각자료의 구체적 묘사 및 키워드)

---

[출력 분량 및 구성 조건]
- 전체 슬라이드는 **12~15쪽 내외**로 구성해 주세요.
- Slide 1은 [수업 표지 및 디자인 시스템 정의(색상/폰트/레이아웃)]로 작성해 주세요.
- Slide 2는 [학습 목표 및 전체 활동 흐름 안내]로 구성해 주세요.
- 마지막 Slide는 [학습 정리 및 차시 예고]로 구성해 주세요.
- 교사가 바로 TXT 파일로 저장해 NotebookLM에 넣을 수 있도록 가공되지 않은 순수 텍스트(Markdown) 형태로만 출력해 주세요.`

const geminiChecks = [
  '약 15쪽 내외로 구성되었는지 확인해요',
  '학생이 화면을 보고 할 행동이 구체적으로 담겼는지 확인해요',
  '교사 발문과 주요 질문이 슬라이드마다 들어있는지 확인해요',
  '색상·서체 등 디자인 지침이 일관되게 적혀 있는지 확인해요',
]

const designOptions = [
  {
    mark: 'A',
    title: '좋아하는 사이트에서 추출하기',
    tool: 'designmd.me',
    link: 'https://designmd.me/',
    steps: [
      '참고하고 싶은 웹사이트 주소를 복사해요.',
      'designmd.me의 입력창에 주소를 붙여 넣고 Generate를 눌러요.',
      '생성된 DESIGN.md를 복사하거나 내려받아 수업명_DESIGN.md로 저장해요.',
    ],
  },
  {
    mark: 'B',
    title: '디자인 목록에서 고르기',
    tool: 'getdesign.md',
    link: 'https://getdesign.md/',
    steps: [
      '검색창이나 카테고리에서 수업 분위기와 가까운 디자인을 찾아요.',
      '원하는 디자인의 상세 페이지를 열어 색상·서체·간격 설명을 확인해요.',
      'DESIGN.md를 복사하거나 내려받아 수업명_DESIGN.md로 저장해요.',
    ],
  },
  {
    mark: 'C',
    title: '디자인 프롬프트 활용하기',
    tool: '🍌 BananaNL · 크롬 확장 프로그램',
    link: 'https://chromewebstore.google.com/detail/%F0%9F%8D%8C-banananl/mjennffndagebhgcbeblffhgooohling',
    steps: [
      'Chrome 웹 스토어에서 BananaNL 확장 프로그램을 설치해요.',
      'NotebookLM에서 BananaNL 패널을 열고 저장된 디자인·이미지·인포그래픽 프롬프트를 골라요.',
      '선택한 프롬프트를 입력창에 불러온 뒤 수업 주제에 맞게 확인하고 수정해서 사용해요.',
    ],
  },
]

const notebookSteps = [
  { title: '소스 확인하기', description: '수업명_슬라이드소스.txt와 3단계에서 고른 디자인 기준(DESIGN.md 또는 BananaNL 프롬프트)을 준비해요.' },
  { title: 'NotebookLM에 추가하기', description: 'TXT와 DESIGN.md를 소스로 올리거나, BananaNL 프롬프트를 입력창에 불러와요.' },
  { title: '슬라이드 생성하기', description: 'Studio에서 슬라이드 자료를 선택하고 아래 요청 문장을 사용해요.' },
]

const notebookRequest = `업로드한 수업명_슬라이드소스.txt의 15쪽 구성과 학생 활동·주요 질문을 내용 기준으로 사용하고, DESIGN.md의 색상·서체·간격·레이아웃 원칙을 시각 디자인 기준으로 일관되게 적용해 수업 슬라이드 자료를 만들어 주세요. DESIGN.md의 웹 버튼·입력창 같은 UI 규칙은 그대로 그리지 말고, 슬라이드의 제목·본문·도형·사진·여백 체계로 변환해 적용해 주세요.`

const finalChecks = [
  '목표 연결: 모든 슬라이드가 학습 목표와 이어지는지 확인해요',
  '한 장 한 메시지: 슬라이드마다 핵심이 하나씩만 담겼는지 확인해요',
  '질문과 행동의 가시성: 학생이 할 일과 질문이 잘 보이는지 확인해요',
  '디자인 일관성: 색상·서체·간격이 처음부터 끝까지 같은지 확인해요',
]

function LessonPlanPage() {
  return (
    <section className="page-section">
      <div className="container narrow-container">
        <p className="eyebrow">AI 수업자료 워크플로우</p>
        <h1>수업 교안 만들기</h1>
        <p className="page-description">
          수업설계안을 Gemini에서 슬라이드용 소스자료로 구체화하고, 디자인 기준을 더한 뒤
          NotebookLM에서 수업 슬라이드로 완성해요.
        </p>

        <p>
          이 워크플로우는 네 단계로 이루어져요. 가진 자료를 모으고(1단계), Gemini에게 슬라이드
          구성안을 받아 TXT로 저장하고(2단계), 슬라이드에 입힐 디자인 기준을 고르고(3단계),
          NotebookLM에 두 소스를 올려 슬라이드를 완성해요(4단계). 아래 버튼을 눌러 전체 흐름을
          먼저 살펴본 뒤, 단계별 안내를 따라가 보세요.
        </p>

        <InteractiveExample
          title="한눈에 보는 4단계 흐름"
          description="버튼을 차례로 눌러 각 단계에서 무엇이 만들어지는지 확인하세요."
          steps={flowSteps}
          resultLabel="이 단계의 결과물"
        />

        <h2>1단계: 수업 자료 준비하기</h2>
        <p>아래 자료를 준비해요. 자료가 모두 없어도 괜찮아요 — 가지고 있는 자료부터 Gemini에 첨부하면 돼요.</p>
        <ul className="checklist">
          {prepareItems.map(([title, description]) => (
            <li key={title}><strong>{title}</strong>: {description}</li>
          ))}
        </ul>

        <h2>2단계: Gemini에게 소스자료 요청하기</h2>
        <p>
          준비한 자료를 Gemini에 첨부한 뒤, 아래 프롬프트를 그대로 복사해 입력해요.
          결과가 나오면 텍스트를 복사해 <strong>수업명_슬라이드소스.txt</strong> 파일로 저장해요.
        </p>
        <CodeBlock label="소스자료 프롬프트 (그대로 복사해서 사용하세요)" code={geminiPrompt} />
        <h3>Gemini 결과 확인 기준</h3>
        <ul className="checklist">
          {geminiChecks.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p>
          <a className="button button-secondary" href="https://gemini.google.com/" target="_blank" rel="noreferrer">
            Gemini 열기 <span aria-hidden="true">↗</span>
          </a>
        </p>

        <h2>3단계: 디자인 기준 준비하기</h2>
        <p>
          DESIGN.md를 준비하거나 BananaNL의 디자인 프롬프트를 활용해요. 세 가지 방법 중
          편한 것 하나만 고르면 돼요. 색상·서체·간격 기준을 미리 정해두면 슬라이드 전체의
          색감과 생김새가 일관되게 유지돼요.
        </p>
        <div className="card-grid three-columns">
          {designOptions.map((option) => (
            <article className="card" key={option.mark}>
              <span className="step-number" aria-hidden="true">{option.mark}</span>
              <h3>{option.title}</h3>
              <p className="compare-note">{option.tool}</p>
              <ol className="design-option-steps">
                {option.steps.map((step) => <li key={step}>{step}</li>)}
              </ol>
              <a className="button button-secondary" href={option.link} target="_blank" rel="noreferrer">
                열기 <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
        <Callout tone="tip" title="적용 방법">
          DESIGN.md를 선택했다면 다음 단계에서 수업명_슬라이드소스.txt와 함께 NotebookLM에 올려요.
          BananaNL을 선택했다면 NotebookLM 입력창에 디자인 프롬프트를 불러와 슬라이드 생성 요청과
          함께 사용해요. 색상, 서체, 간격, 이미지 스타일은 일관되게 유지해요.
        </Callout>

        <h2>4단계: NotebookLM에서 슬라이드 완성하기</h2>
        <p>Gemini에서 만든 TXT에 디자인 기준을 더해 슬라이드를 생성해요.</p>
        <StepGuide steps={notebookSteps} />
        <CodeBlock label="NotebookLM 요청 문장 (그대로 복사해서 사용하세요)" code={notebookRequest} wrap />
        <h3>완성 전 마지막 확인</h3>
        <ul className="checklist">
          {finalChecks.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p>
          <a className="button button-primary" href="https://notebooklm.google.com/" target="_blank" rel="noreferrer">
            NotebookLM 열기 <span aria-hidden="true">↗</span>
          </a>
        </p>

        <Callout tone="warning" title="학생 개인정보는 넣지 마세요">
          수업설계안이나 학생 상황을 첨부할 때 실제 학생 이름, 평가 결과 같은 개인정보는 빼고
          올려주세요. &ldquo;발표를 어려워하는 학생이 있는 반&rdquo;처럼 상황만 일반적으로 설명하면 충분해요.
        </Callout>
      </div>
    </section>
  )
}

export default LessonPlanPage
