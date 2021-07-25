# queueing-subject

[![build status](https://circleci.com/gh/ohjames/queueing-subject.png?style=shield)](https://circleci.com/gh/ohjames/queueing-subject)
[![Known Vulnerabilities](https://snyk.io/test/github/ohjames/queueing-subject/badge.svg)](https://snyk.io/test/github/ohjames/queueing-subject)

The QueueingSubject is very similar to the ReplaySubject but it only queues values when it has no observers. The queued values are delivered to the first observer that subscribes at which point the queue is reset.

## Changelog

[Changelog here](changelog.md)

