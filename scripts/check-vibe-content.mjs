import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const app = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8')
const practicePages = await Promise.all([
  'VibeStartGeminiPage.jsx',
  'VibePromptTipsPage.jsx',
  'VibeDatabasePage.jsx',
  'VibeDeployPage.jsx',
].map((file) => readFile(new URL(`../src/pages/${file}`, import.meta.url), 'utf8')))
const howToPage = await readFile(new URL('../src/pages/VibeHowToPage.jsx', import.meta.url), 'utf8')

for (const topic of ['바이브 코딩', '바이브 코딩 과정', '프런트엔드', '백엔드', '데이터베이스(DB)', '배포']) {
  assert.ok(app.includes(topic), `${topic} 카드가 필요합니다.`)
}

for (const page of practicePages) {
  assert.ok(page.includes('<LottoPractice'), '각 개발 단계에 로또 생성기 실습이 필요합니다.')
  assert.ok(page.includes('프롬프트'), '각 개발 단계에 복사할 수 있는 AI 프롬프트가 필요합니다.')
}

assert.ok(howToPage.includes('<InteractiveExample'), '바이브 코딩 과정에 인터랙티브한 과정 예시가 필요합니다.')
assert.ok(howToPage.includes('/vibe-coding-flow.png'), '바이브 코딩 과정 그림이 필요합니다.')
assert.ok(howToPage.includes('/vibe-coding-classroom-example.png'), '바이브 코딩 활용 사진이 필요합니다.')
assert.ok(howToPage.includes('<details'), '초보자용 펼쳐보기 예시가 필요합니다.')
assert.ok(howToPage.includes('클라우드플레어'), '클라우드플레어 배포 설명이 필요합니다.')

console.log('바이브 코딩 카드 6개, 과정 그림, 인터랙티브 예시와 로또 생성기 실습 4개를 확인했습니다.')
