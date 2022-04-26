// Bit Logic for maximum xor value in range [ given lo, hi]

function maxXORInRange (lo, hi) {
  let limits = lo ^ hi

  let msbPos = 0
  while (limits > 0) {
    msbPos++
    limits >>= 1
  }

  let maxXOR = 0
  let two = 1
  while (msbPos-- > 0) {
    maxXOR += two
    two <<= 1
  }

  return maxXOR // { max possible value}
}

const lo = 2
const hi = 4
document.write(maxXORInRange(lo, hi))
