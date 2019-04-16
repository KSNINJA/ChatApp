var mysql = require('mysql');
var express = require('express');
var app = express();
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var firebase = require('firebase/app');
var database = require('firebase/database');
var config = {
    //put your app config here
};
firebase.initializeApp(config);

"use strict"

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Kartik5795",
    database: "auth"
});

app.post('/signin', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //enter file name as 2nd param
    data = req.body;
    //for testing
    /*con.query('SELECT * FROM userInfo',function(err,result){  
        res.send(result);
        res.end();
    });*/
    var sql = "SELECT id FROM userInfo WHERE username='" + data.username + "' AND pass='" + data.pass + "'";
    con.query(sql, function(err, result){
        console.log(err,result);
        if(result.length == 0)
        {
            res.write('false');
        }
        else{
            res.write(result[0].id.toString());
        }
        res.end();
    });
});

app.post('/signup', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //enter file name as 2nd param
    const data = req.body;
    var sql = "SELECT * FROM userInfo WHERE username='" + data.username + "' AND pass='" + data.pass + "'";
    con.query(sql, function(err, result){
        if(result.length == 0)
        {
            sql = "INSERT INTO userInfo ( username, pass ) VALUES ('" + data.username + "' , '" + data.pass + "')";
            con.query(sql, function(err, result){
                res.write('true');
                res.end();
                return;
            });
        }   
        else{
            res.write('false');
            res.end();
        }
    });
});

app.post('/search-people-with-username', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //enter file name as 2nd param
    const searchedPhrase = req.body.search;
    const sql = "SELECT id,username FROM userInfo WHERE username LIKE '" + searchedPhrase + "%'";
    con.query(sql, (err, result) => {
        res.send(result);
        res.end();
    });
});

app.post('/search-people-with-id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //enter file name as 2nd param
    const userId = req.body.personId;
    const sql = "SELECT username FROM userInfo WHERE id='" + userId + "'";
    con.query(sql, (err, result) => {
        res.send(result);
        res.end();
    });
});

app.post('/post-message', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //enter file name as 2nd param
    const messageObj = req.body.messageObj;
    let chatID;
    let sql;
    let recipientsIdArr = req.body.messageObj.recipientsIdArr;
    sql = "SELECT * FROM chats WHERE recipients = '," + recipientsIdArr + ",'";
    con.query(sql, (err, result) => {
        if(result.length === 0){
            sql = "INSERT INTO chats (recipients) VALUES ('," + recipientsIdArr + ",')";
            con.query(sql , (err, result) => {
                if(err) throw err;
                sql = "SELECT chatId FROM chats WHERE recipients='," + recipientsIdArr + ",'";
                con.query(sql, (err,result) => {
                    chatID = result[0].chatId;
                    postMessage();
                })
            })
        }
        else{
            chatID = result[0].chatId;
            postMessage();
        }
    })
    function postMessage(){
        sql = "INSERT INTO messages (message, sender, time, date,chatId) VALUES ('" + messageObj.message + "','" + messageObj.sender + "','" + messageObj.time + "','" + messageObj.date + "'," + chatID + ")";
        con.query(sql, (err, result) => {
            if(err) throw err;
            notifyRecipients();
        })
    }
    function notifyRecipients(){
        recipientsIdArr = recipientsIdArr.split(',');
        recipientsIdArr.forEach((recipient) => {
            firebase.database().ref('/users/' + recipient).orderByChild('chatId').equalTo(chatID).limitToFirst(1).once('value').then(function(snapshot) {
                let prevNumberOfUpdates;
                let key;
                if(!snapshot.val()){
                    prevNumberOfUpdates = 0;
                    key = firebase.database().ref('/users/' + recipient).push().key;
                } 
                else {
                    key = Object.keys(snapshot.val())[0];
                    prevNumberOfUpdates = Object.values(snapshot.val())[0].prevNumberOfUpdates;
                }
                firebase.database().ref('users/' + recipient + '/' + key).set({
                    chatId: chatID,
                    prevNumberOfUpdates: prevNumberOfUpdates + 1
                });
                if(recipientsIdArr.indexOf(recipient) === recipientsIdArr.length -1) {
                    res.send('true');
                    res.end();
                }
            });
        })
    }
});

app.post('/get-chat-list', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //enter file name as 2nd param
    const userId = req.body.userId;
    const sql = "SELECT * FROM chats WHERE recipients LIKE '%," + userId + ",%'";
    con.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
        res.end();
    });
})

app.post('/get-chat-with-id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //enter file name as 2nd param
    const userId = req.body.userId;
    const chatId = req.body.chatId;
    const sql = "SELECT * FROM chats WHERE chatId='" + chatId + "' LIMIT 1";
    con.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
        res.end();
    });
})

app.post('/fetch-messages', (req, res) => {    
    res.setHeader('Access-Control-Allow-Origin', '*'); //enter file name as 2nd param
    const recipients = req.body.recipientsIdArr;
    let sql = "SELECT chatId FROM chats WHERE recipients='," + recipients + ",'";
    let chatId ;
    con.query(sql, (err, result) => {
        if(result.length === 0) return;
        chatId = result[0].chatId;
        sql = "SELECT * FROM messages WHERE chatId=" + chatId;
        con.query(sql, (err, result) => {
            res.send(result);
        })
    })
})

app.listen(8080);
