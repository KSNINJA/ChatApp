from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
import json, ast
app = Flask(__name__)
CORS(app)
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

cred = credentials.Certificate('/link_to/service-account-file.json')
firebase_admin = firebase_admin.initialize_app(cred, {'databaseURL': 'https://databaseName.firebaseio.com/'})

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'databaseName'
mysql = MySQL(app)


@app.route('/signin', methods=['GET','POST'])
def signin():
    mycursor = mysql.connection.cursor()
    sql = "SELECT id FROM userInfo WHERE username='" + request.form['username'] + "' AND pass='" + request.form['pass'] + "'";
    mycursor.execute(sql)
    result = mycursor.fetchone()
    if(not result):
        return ('false', 200);
    else:
        return (str(result[0]), 200);

@app.route('/signup', methods=['GET','POST'])
def signup():
    mycursor = mysql.connection.cursor()
    sql = "SELECT * FROM userInfo WHERE username='" + request.form['username'] + "' AND pass='" + request.form['pass'] + "'";
    mycursor.execute(sql)
    result = mycursor.fetchone()
    if(not result):
        sql = "INSERT INTO userInfo ( username, pass ) VALUES (%s, %s)";
        mycursor.execute(sql, (request.form['username'], request.form['pass']))
        mysql.connection.commit()
        return ('true', 200)
    else:
        return ('false', 200)

@app.route('/search-people-with-username', methods=['GET','POST'])
def searchPeopleWithUsername():
    mycursor = mysql.connection.cursor()
    searchedPhrase = request.form['search']
    sql = "SELECT id,username FROM userInfo WHERE username LIKE '" + searchedPhrase + "%'"
    mycursor.execute(sql)
    columns = [col[0] for col in mycursor.description]
    rows = [dict(zip(columns, ast.literal_eval(json.dumps(row)))) for row in mycursor.fetchall()]
    rows = tuple(rows)
    return (jsonify(rows), 200)

@app.route('/search-people-with-id', methods=['GET','POST'])
def searchPeopleWithId():
    mycursor = mysql.connection.cursor()
    userId = request.form['personId']
    sql = "SELECT username FROM userInfo WHERE id='" + userId + "'"
    mycursor.execute(sql)
    result = mycursor.fetchone()
    return (jsonify([{"username": result[0]}]), 200)

@app.route('/get-chat-with-id',methods=['GET','POST'])
def getChatWithId():
    mycursor = mysql.connection.cursor()
    userId = request.form['userId']
    chatId = request.form['chatId']
    sql = "SELECT * FROM chats WHERE chatId='" + chatId + "' LIMIT 1"
    mycursor.execute(sql)
    result = mycursor.fetchone()
    return (result[0], 200)

@app.route('/get-chat-list', methods=['GET','POST'])
def getChatList():
    mycursor = mysql.connection.cursor()
    userId = request.form['userId'];
    sql = "SELECT * FROM chats WHERE recipients LIKE '%," + userId + ",%'";
    mycursor.execute(sql)
    columns = [col[0] for col in mycursor.description]
    rows = [dict(zip(columns, ast.literal_eval(json.dumps(row)))) for row in mycursor.fetchall()]
    rows = tuple(rows)
    return (jsonify(rows), 200)

@app.route('/fetch-messages', methods=['GET','POST'])
def fetchMessages():
    mycursor = mysql.connection.cursor()
    recipients = request.form['recipientsIdArr']
    sql = "SELECT chatId FROM chats WHERE recipients='," + recipients + ",'"
    mycursor.execute(sql)
    result = mycursor.fetchone()
    if(result):
        chatId = result[0]
        sql = "SELECT * FROM messages WHERE chatId=" + str(chatId)
        mycursor.execute(sql)
        columns = [col[0] for col in mycursor.description]
        rows = [dict(zip(columns, ast.literal_eval(json.dumps(row)))) for row in mycursor.fetchall()]
        rows = tuple(rows)
        return (jsonify(rows), 200)

@app.route('/post-message', methods=['GET','POST'])
def postMessage():
    mycursor = mysql.connection.cursor()
    chatID = None
    messageObj = ast.literal_eval(request.form['messageObj'])
    recipientsIdArr = messageObj['recipientsIdArr']
    sql = "SELECT * FROM chats WHERE recipients = '," + recipientsIdArr + ",'"
    mycursor.execute(sql)
    result = mycursor.fetchone()
    def notifyRecipients():
        recipientsIdArr = messageObj['recipientsIdArr']
        recipientsIdArr = recipientsIdArr.split(',')
        for recipient in  recipientsIdArr:
            ref= db.reference('users/'+recipient)
            try:
                snapshot = ref.order_by_child('chatId').equal_to(chatID).limit_to_first(1).get()
                prevNumberOfUpdates, key= None
                key = snapshot.val().keys()[0]
                prevNumberOfUpdates = snapshot.val().values()[0]['prevNumberOfUpdates']
            except:
                prevNumberOfUpdates = 0
                snapshot = ref.push()
                key = snapshot.key

            ref.child(key).set({
                'chatId': chatID,
                'prevNumberOfUpdates': prevNumberOfUpdates + 1
            })
            if(recipientsIdArr.index(recipient) == len(recipientsIdArr) -1):
                return ('true', 200)
    def _postMessage():
        sql = "INSERT INTO messages (message, sender, time, date,chatId) VALUES (%s, %s, %s, %s, %s)"
        mycursor.execute(sql, (messageObj['message'], messageObj['sender'], messageObj['time'], messageObj['date'], chatID))
        mysql.connection.commit()
        notifyRecipients()

    if(not result):
        sql = "INSERT INTO chats (recipients) VALUES ('," + recipientsIdArr + ",')"
        mycursor.execute(sql)
        mysql.connection.commit()
        sql = "SELECT chatId FROM chats WHERE recipients='," + recipientsIdArr + ",'"
        mycursor.execute(sql)
        result = mycursor.fetchone()
        chatID = result[0]
        _postMessage()
    else:
        chatID = result[0]
        _postMessage()

if __name__ == '__main__':
    app.run(debug=True ,port=8080)
