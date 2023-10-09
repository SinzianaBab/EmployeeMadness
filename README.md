# Employee Data

The application is used to store data about employees and equipment of a company. The app can always create, update, delete employees and equipment. Each employee can be set to present, give equipment, and the position changes according to their salary. Each page shows ten employees, and they can be sorted by name, position, and level.


# Project Screen Shots
<img width="1276" alt="image" src="https://github.com/SinzianaBab/EmployeeMadness/assets/116287975/752f97a7-e21c-4bdd-ac1d-3b61170e3ac1">
<img width="1272" alt="image" src="https://github.com/SinzianaBab/EmployeeMadness/assets/116287975/79a3f68f-510a-4bb2-adf1-03ea0a57883d">
<img width="1273" alt="image" src="https://github.com/SinzianaBab/EmployeeMadness/assets/116287975/394f7009-ea66-46d3-9352-ccdee29b8038">


# Reflection
The project was a one-week-long project built during the 5th single-instructed week from the second module of CodeCool Programming School. Project goals included using technologies learned up until this point and familiarizing myself with documentation for new features. I wanted to extend an application for employee data management. The project was originally started, and I had to add functionality to buttons for the employee page. Additionally, I added more features to the employees and created equipment management from scratch. The employees and equipment are easy to access and search by different values.

# Challenges
The main challenge was to work with both the server-side and client-side at the same time.

# Lessons
I learned how to add data to the database and how to properly connect the database to the server.

# Technologies
 Node, React, MongoDb, Express. 

# Setup Instructions
Clone down the repository

## Server side

### Install dependencies
```bash
cd ./server
npm install
```

### .env file
Copy the .env.sample as .env and fill up the environment variable for your personal mongodb connecttion url.

### Prepare the database

```bash
cd ./server
npm run populate
```

**populate command** will run the populate.js file as a script and it will generate a buch of starter data for your database. 

### Running the code

```bash
cd ./server
npm run dev
```

It will start the server with nodemon. So it will watch the changes and restart the server if some ot the files changed.

### Testing with test.http

If you like to try the endpoints of the rest api, you can check the test.http file for urls are should work on your environment as well. And if you install the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extenstion for vscode you can actually run those in your editor.



## Client side

### Install dependencies

```bash
cd ./client
npm install
```

### Proxy

Watch for the port of your rest api. By default it will bind on port 8080 and the frontend proxy settings also depend on this configuration. If you for some reasons change the port of the backend, don't forget to change the ./client/package.json proxy settings as well.

### Runnig the code

```bash
cd ./client
npm start
```

And the create-react-app react-scripts package will start your frontend on the 3000 port and you can visit the http://localhost:3000 on your preferred browser.
