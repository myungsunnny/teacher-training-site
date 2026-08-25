import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { generateLottoNumbers } from '../src/utils/lotto.js'

for (let attempt = 0; attempt < 100; attempt += 1) {
  const numbers = generateLottoNumbers()
  assert.equal(numbers.length, 6)
  assert.equal(new Set(numbers).size, 6)
  assert.ok(numbers.every((number) => number >= 1 && number <= 45))
  assert.deepEqual(numbers, [...numbers].sort((a, b) => a - b))
}

const practice = await readFile(new URL('../src/components/LottoPractice.jsx', import.meta.url), 'utf8')
assert.ok(practice.includes('lotto-static-preview'))
assert.ok(!practice.includes('toggleNumber'))

console.log('정적 프런트엔드 예시와 중복 없는 로또 번호 생성을 확인했습니다.')
