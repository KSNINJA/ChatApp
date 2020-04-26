import React from 'react';
import { MessageItem } from './MessageItem.js';
import $ from 'jquery';
import * as firebase from "firebase/app";
import "firebase/database";
var config = {
    //put your firebase config here
};
firebase.initializeApp(config);

export class MessagesContainer extends React.Component{
    constructor(props){
        super(props);
        this.readMessages = this.readMessages.bind(this);
        this.state = {
            messages: null
        };
        this.readMessages();
    }
    readMessages(nextProps){
        if(!nextProps) nextProps = this.props;
        $.ajax({
            url: 'http://localhost:8080/fetch-messages',
            type: 'POST',
            data: { recipientsIdArr: nextProps.recipientsIdArr },
            success: (result) =>{
                debugger;
                let messagesArr = result;
                let messages= messagesArr.map((messageObj) => {
                    return <MessageItem details={messageObj} username={nextProps.username} />
                });
                this.setState({
                    messages: messages
                });
            }
        });
    }
    componentWillReceiveProps(nextProps){
        this.readMessages(nextProps)
    }
    render(){
        return (
            <div style={{ display: 'flex', flexDirection: 'column', padding: '5%', height: '85%', overflowY: 'scroll' }}>
                { this.state.messages }
            </div>
        )
    }
}
