# DPS Backend Coding Challenge

## Overview

This repository contains a very basic web application based on Typescript and Express.js. Main application file is `index.ts`. Node and npm are required.

## Environment Setup

Ensure you have Node.js (v14.x or later) and npm (v6.x or later) installed.  
To set up and run the application, execute the following commands:

```
npm install
npm run dev
```

The application will then be accessible at http://localhost:3000.

## Project Context

# Get all projects
curl -H "Authorization: Password123" -X GET http://localhost:3000/api/projects

# Get a specific project
curl -H "Authorization: Password123" -X GET http://localhost:3000/api/projects/3

# Create a new project
curl -H "Authorization: Password123" -H "Content-Type: application/json" -X POST -d '{"id":"4", "name":"New Project", "description":"This is a new project created via API"}' http://localhost:3000/api/projects

# Update a project
curl -H "Authorization: Password123" -H "Content-Type: application/json" -X PUT -d '{"name":"Updated Project", "description":"This project has been updated via API"}' http://localhost:3000/api/projects/4

# Get all reports for a specific project
curl -H "Authorization: Password123" -X GET http://localhost:3000/api/reports/project/1

# Create a new report
curl -H "Authorization: Password123" -H "Content-Type: application/json" -X POST -d '{"id":"4", "text":"New report for testing", "projectid":"1"}' http://localhost:3000/api/reports

# Update an existing report
curl -H "Authorization: Password123" -H "Content-Type: application/json" -X PUT -d '{"text":"Updated report text"}' http://localhost:3000/api/reports/4

# Delete a report
curl -H "Authorization: Password123" -X DELETE http://localhost:3000/api/reports/4

# Get reports with frequent words
curl -H "Authorization: Password123" -X GET http://localhost:3000/api/reports/frequent-words
