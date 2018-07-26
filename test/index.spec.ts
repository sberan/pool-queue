import assert from 'assert'
import PoolQueue from '../src'

const
  delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),
  range = (limit: number) => Array.from(Array(limit).keys())

it('should do some work', async function () {
  this.timeout(1000)
  const
    queue = new PoolQueue(10),
    expectedResults = range(100),
    results: number[] = []

  for (let i of expectedResults) {
    queue
      .submit(() => delay(Math.random() * 100).then(() => i))
      .then(result => results.push(result))
  }
  await queue.drain()
  assert.deepStrictEqual(results, expectedResults)
})