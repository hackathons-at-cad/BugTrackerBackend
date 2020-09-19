# BugTrackerBackend

## USER LOGIN AND SIGNUP DOCUMENTATION

## local server api-route=localhost:300



| api routes    | Functions    | Requests  | Models|
| -------- | ----------- | ----------- |----------- |
| {apir-oute}/user/login  | user login   | POST| email, password |
| {api-route}/user/register | user login  |POST  |email, password, passwordCheck, displayName, date |
| {api-route}/user/:id   |  get engireer's username  | GET | id, email, password,displayName |
| {api-route}/user/  |  get all engineers username  | GET | id, name |
| {api-route}/bugs/  |  get all documented bugs | GET | id, engineer_name, date, lable, project, priority |
| {api-route}/bugs/:id  |  get single bug by id | GET | id, engineer_name, date, lable, project, priority |
| {api-route}/bugs/create_bug | create new bug  | POST| id, engineer_name, date, lable, project, priority |
| {api-route}/bugs/update/:id | update bug | POST | id, engineer_name, date, lable, project, priority |
| {api-route}/bugs/remove/:id| delete bug | DELETE | _id, engineer_name, date, lable, project, priority |