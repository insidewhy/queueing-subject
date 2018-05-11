import { Subject, Subscriber, Subscription } from 'rxjs'

export class QueueingSubject<T> extends Subject<T> {
  private queuedValues: T[] = []

  next(value: T): void {
    if (this.closed || this.observers.length)
      super.next(value)
    else
      this.queuedValues.push(value)
  }

  _subscribe(subscriber: Subscriber<T>): Subscription {
    const subscription = super._subscribe(subscriber)

    if (this.queuedValues.length) {
      this.queuedValues.forEach(value => super.next(value))
      this.queuedValues.splice(0)
    }

    return subscription
  }
}
