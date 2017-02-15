import { Subject } from 'rxjs/Subject'
import { Subscriber } from 'rxjs/Subscriber'
import { Subscription } from 'rxjs/Subscription'

export class QueueingSubject<T> extends Subject<T> {
  private _queuedValues: T[] = []

  next(value:T):void {
    if (this.closed || this.observers.length)
      super.next(value)
    else
      this._queuedValues.push(value)
  }

  _subscribe(subscriber: Subscriber<T>): Subscription {
    const ret = super._subscribe(subscriber)
    if (this._queuedValues.length) {
        this._queuedValues.forEach(value => super.next(value))
        this._queuedValues.splice(0)
    }
    return ret
  }
}
