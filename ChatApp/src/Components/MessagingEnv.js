import React from 'react';
import { MessagingEnvMenuBar } from './MessagingEnvMenuBar.js'
import { MessagingInput } from './MessagingInput.js';
import { MessagesContainer } from './MessagesContainer.js';
import $ from 'jquery'

export class MessagingEnv extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            messagesArr: ''
        }
        this.sendMessage = this.sendMessage.bind(this);
    }
    sendMessage(messageToBeSent){
        const date = new Date;
        const messageTime =  date.getHours() + ":" + date.getMinutes();
        const messageDate = date.getDate() + '/' + (date.getMonth() + 1 + '/') + date.getFullYear();
        const messageObj = {
            message: messageToBeSent,
            time: messageTime,
            date: messageDate,
            sender: this.props.username,
            recipientsIdArr: this.props.recipientsIdArr
        }
        $.ajax({
            url: 'http://localhost:8080/post-message',
            type: 'POST',
            data: { 
                messageObj: messageObj
            },
            success: (req, res) => {

            }
        });
    }
    render(){
        return (
            <div className="col-xs-12 col-md-8 messagingEnv">
                <div className="messagingEnvBg">Nothing to show</div>
                <MessagingEnvMenuBar recipientsIdArr={ this.props.recipientsIdArr } userId={this.props.userId} />
                { this.props.recipientsIdArr ? <MessagesContainer recipientsIdArr={this.props.recipientsIdArr} username={this.props.username} userId={this.props.userId} /> : "" }
                <MessagingInput sendMessage={ this.sendMessage } />
            </div>
        );
    }
}
