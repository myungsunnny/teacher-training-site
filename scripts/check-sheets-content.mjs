import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const app = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8')
const pages = await Promise.all([
  'SheetsBasicsPage.jsx',
  'SheetsAppsScript101Page.jsx',
  'SheetsRecipesPage.jsx',
].map((file) => readFile(new URL(`../src/pages/${file}`, import.meta.url), 'utf8')))

for (const topic of ['구글 스프레드시트란?', '앱스크립트란?', '둘을 활용한 바이브 코딩']) {
  assert.ok(app.includes(topic), `${topic} 카드가 필요합니다.`)
}

for (const page of pages) {
  assert.ok(page.includes('<InteractiveExample'), '각 상세 페이지에 인터랙티브 예시가 필요합니다.')
  assert.ok(page.includes('result:'), '각 인터랙티브 예시에 눈에 보이는 결과가 필요합니다.')
}

assert.ok(pages[1].includes('Code.gs'))
assert.ok(pages[1].includes('index.html'))

console.log('구글스프레드시트 카드 3개와 인터랙티브 예시 3개를 확인했습니다.')
