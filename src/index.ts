import { Subject, Subscription, Observer } from 'rxjs'

export class QueueingSubject<T> extends Subject<T> {
  private queuedValues: T[] = []

  next(value: T): void {
    if (this.closed || this.observed) super.next(value)
    else this.queuedValues.push(value)
  }

  // TODO: simplify this for rxjs 8
  subscribe(observer?: Partial<Observer<T>>): Subscription
  subscribe(next: (value: T) => void): Subscription
  /** @deprecated Instead of passing separate callback arguments, use an observer argument. Signatures taking separate callback arguments will be removed in v8. Details: https://rxjs.dev/deprecations/subscribe-arguments */
  subscribe(
    next?: ((value: T) => void) | null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?: ((error: any) => void) | null,
    complete?: (() => void) | null,
  ): Subscription

  subscribe(
    observerOrNext?: Partial<Observer<T>> | ((value: T) => void) | null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?: ((error: any) => void) | null,
    complete?: (() => void) | null,
  ): Subscription {
    if (observerOrNext == null) {
      return super.subscribe(null, error, complete)
    } else {
      const subscription =
        typeof observerOrNext === 'function'
          ? super.subscribe(observerOrNext, error, complete)
          : super.subscribe(observerOrNext)
      if (this.queuedValues.length) {
        this.queuedValues.forEach((value) => super.next(value))
        this.queuedValues.splice(0)
      }
      return subscription
    }
  }
}
