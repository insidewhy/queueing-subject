# Introduction

[![Greenkeeper badge](https://badges.greenkeeper.io/ohjames/queueing-subject.svg)](https://greenkeeper.io/)

The QueueingSubject is very similar to the ReplaySubject but it only queues values when it has no observers. The queued values are delivered to the first observer that subscribes at which point the queue is reset.
