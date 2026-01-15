# backend-app
A micro app that myself and my [partner](https://github.com/Harriet-Blundell) created. <br>

This repo is created to create a small backend for a to-do app. It allows you to post, patch, delete and view the tasks you have. <br>


## About



## Tech
The main tech that used in the backend is;
- Typescript
- Express
- Vitest

The main frontend repo can be found [here](https://github.com/Harriet-Blundell/TaskApp). 


## How To Run Locally
1. Install dependencies using "npm i" 
2. Create .env files for testing and development. 

examples; 

    2.1. PGDATABASE=<"name of database"> 
    2.2. DATABASE_URL=postgres://<"name">@localhost:5432/<"name of database">

3. Ensure that drizzle-kit is minimum version "^0.31.8" with drizzle-orm version "^0.45.1" if not - you may have to force it. 
4. You should now be able to run the scripts to test and run locally. 

examples; 

    4.1. npm run setup-dbs
    4.2. npm run test:migrate
    4.3. npm test-seed
    4.4. npm t

