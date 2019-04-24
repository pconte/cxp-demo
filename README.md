# Knowledge Base UI demo
A demo app in which a user can search a list of articles and filter the results
by associated tags.

## Technology
- node/express server for server-side templates and API endpoints
- knockout.js for client-side MVVM with data binding
- vanilla JavaScript on the client (no jquery or axios, just knockout.js)
- vanilla CSS on the client (no frameworks or tooling)

## Up and Running
> git clone https://github.com/pconte/cxp-demo.git
> cd cxp-demo
> npm install
> node index.js
  Visit http://localhost:3000 in your browser.

## Features
- Search suggestions provided by the server as the user types a search string.
  - Each search is saved on the server. Currently, all previous search strings are returned
    along with their counts. Not useful, and needs improvement, but shows how the stored
    searches can be used to generate suggestions.
- Toggling the tags will filter the results.

## Future Nice-to-Haves
- CSS Animations
- Page the results
