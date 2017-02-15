const QueueingSubject = require('./lib/index').QueueingSubject

const subj = new QueueingSubject()

subj.next(1)
subj.next(2)

const sub1 = subj.subscribe(val => { console.log(`1: got ${val}`) })

subj.next(3)

const sub2 = subj.subscribe(val => { console.log(`2: got ${val}`) })

subj.next(4)

console.log('unsub 1')
sub1.unsubscribe()
console.log('unsub 2')
sub2.unsubscribe()

setTimeout(() => {}, 10)
