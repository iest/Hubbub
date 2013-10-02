# Hubbub
A proof-of-concept github issues app built with Ember, node, and express.

## Goals
1. Explore how a client-side app could improve on the user experience of the github issue tracker
2. See if I can build a back-end, with a wrapper for ember-data

## Ideas/brain-dump
I could build an ember-data wrapper around my own custom API, however I'd then be doing a double-trip for every request I make from the client:

> request <--> node app <--> github

Instead of:

> request <--> github

I could use a client-side github library, however none I've found have proper issue API support...

I guess it comes down to how the app gets deployed. On init I could pull all issues for a repo and store them on the server, but then I'd have to make sure that the server and github keep each other up to date.

As long as latency between the client and the server was minimal, it should have little effect. For the purposes of this, it's not really an issue.


## TODO
- Figure out github API
- ~~Try basic issue fetching with the github node library~~
- ~~Build basic ember-data compliant routes in server~~
- Decide on basic UI & build
- Get oauth working properly
- Edit an issue from the app
- Add showdown for client-side markdown