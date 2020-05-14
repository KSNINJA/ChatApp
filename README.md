The Chatapp allows users to share messages.


## `Hosting Frontend`

This app uses ReactJS as frontend framework

In the project directory/ChatApp, you can run:

```
  npm start
```

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## `Hosting Server`


### `Setting up main server`


You can either use NodeJS server or the python server, both functions the same.

To run NodeJS server, in the project directory ,where server.js file is located, you can run:

```
  node server.js
```

To run python server, in the project directory ,where server.py file is located, you can run:

```
   python server.js
```


### `Setting up Firebase environment`


This app uses firebase realtime database to notify users for unread messages in realtime.

1. Create a new firebase project, go to settings and add a new web.
2. Copy the configurations generated and paste it in the 'config' variable at the following location :
   * /ChatApp/src/Components/MessagesContainer.js
   * If using NodeJS server,  copy your firebase configurations object and paste it against 'config' variable in    server.js.
      Or else if using python server, go to firebase project setting, click on service Accounts tab and setup
      Firebase Admin SDK and download the service-account-file.json and paste the location of file in 'cred'
      variable in server.py. Also, go to firebase realtime database and copy the project link
      ( like 'https://react-project-firebaseio.com/' ) and paste in the 'firebase_admin' variable in server.py .


### `Setting up MYSQl Database`


This app uses mysql database to store user information, messages and authentication data.

Setup mysql database and use the following commands to create the required tables:

```
   create table messages  (message  VARCHAR(255),sender VARCHAR(30), time VARCHAR(255), date VARCHAR(255), chatId VARCHAR(255));
```

```
  create table chats (chatId int NOT NULL AUTO_INCREMENT, recipients  VARCHAR(255), PRIMARY KEY (chatId));
```

```
   create table userInfo (id int NOT NULL AUTO_INCREMENT, username VARCHAR(30), pass VARCHAR(30), PRIMARY KEY (id));
```

Also, paste your mysql access info in server files.

For Python server, paste your info in app.config object keys in server.py.

For NodeJS server, paste your info in con variable in server.js



## You are all set!


See a demo [here](https://youtu.be/bReDd4J1g1s)
