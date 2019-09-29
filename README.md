## **FreeCodeCamp**- Information Security and Quality Assurance

## Objective

- Build a full stack JavaScript app that is functionally similar to this: https://protective-garage.glitch.me/

- SET NODE_ENV to `test` without quotes and set DB to your mongo connection string in .env file
- Complete the project in `routes/api.js` or by creating a handler/controller
- You will add any security features to `server.js`
- You will create all of the functional tests in `tests/2_functional-tests.js`

# FCC-Issue-Tracker

## User Stories

- Prevent cross site scripting(`XSS attack`).

- I can `POST /api/issues/{projectname}` with form data containing required `issue_title, issue_text, created_by, and optional assigned_to and status_text`.

- The object saved (and returned) will include all of those fields (blank for optional no input) and also include _created_on(date/time), updated_on(date/time), open(boolean, true for open, false for closed), and \_id_.

- I can `PUT /api/issues/{projectname}` with a \_id and any fields in the object with a value to object said object. Returned will be 'successfully updated' or 'could not update '+\_id. This should always update updated_on. If no fields are sent return 'no updated field sent'.

- I can `DELETE /api/issues/{projectname}` with a \_id to completely delete an issue. If no \_id is sent return '\_id error', success: 'deleted '+\_id, failed: 'could not delete '+\_id.

- I can `GET /api/issues/{projectname}` for an array of all issues on that specific project with all the information for each issue as was returned when posted.

- I can filter my get request by also passing along any field and value in the query`(ie. /api/issues/{project}?open=false)`. I can pass along as many fields/values as I want.

- All 11 functional tests are complete and passing.

## Technologies

- Node
- Express
- Helmet
- Mocha-Chai
- Bootstrap
- javascript
- Html

## Project Structure:

```
├── assertion-analyser.js
├── package.json
├── package-lock.json
├── public
│   ├── form.js
│   └── style.css
├── README.md
├── routes
│   ├── api.js
│   └── fcctesting.js
├── server.js
├── test-runner.js
├── tests
│   ├── 1_unit-tests.js
│   └── 2_functional-tests.js
└── views
    ├── index.html
    └── issue.html
```

### Project Demo:

- [FCC-Issue-Tracker](https://avatarfreak-issue-tracker.glitch.me)

### Author:

- [avatarfreak](https://github.com/avatarfreak)
