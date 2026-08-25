export function generateLottoNumbers(random = Math.random) {
  const numbers = Array.from({ length: 45 }, (_, index) => index + 1)

  for (let index = numbers.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    ;[numbers[index], numbers[swapIndex]] = [numbers[swapIndex], numbers[index]]
  }

  return numbers.slice(0, 6).sort((a, b) => a - b)
}
