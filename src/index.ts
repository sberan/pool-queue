import { Semaphore } from '@calebboyd/semaphore'

/**
 * A promise-based data structure which allows tasks to be performed concurrently and resolved serially.
 */
export default class PoolQueue {
  private readonly semaphore = new Semaphore(this.concurrency)
  private tail: Promise<any> = Promise.resolve()

  constructor(private readonly concurrency: number) {}

  /**
   * Submit a task to be completed
   * 
   * @param task - an asynchronous function which will be executed concurrently
   * @returns a Promise containing the completed work. While the task is executed concurrently, the returned Promise is fulfilled serially in the order it was submitted.
   */
  submit<T> (work: () => Promise<T>): Promise<T> {
    const prev = this.tail
    return this.tail = this.semaphore.acquire()
      .then(work)
      .then(result => {
        this.semaphore.release()
        return prev.then(() => result)
      })
  }

  /**
   * Wait until the queue has at least one free worker.
   */
  poll (): Promise<void> {
    return this.semaphore.acquire().then(() => this.semaphore.release())
  }

  /**
   * Wait until the queue has no more work to complete.
   */
  drain (): Promise<void> {
    const tail = this.tail
    return tail.then(() => {
      if (this.tail === tail) {
        return
      }
      return this.drain()
    })
  }
}
