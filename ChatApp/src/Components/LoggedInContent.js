import React from 'react';
import { ChatListAndOthers } from './ChatListAndOthers.js';
import { MessagingEnv } from './MessagingEnv.js';
import { relative } from 'path';
import { EmptyMessagingEnv } from './EmptyMessagingEnv';
import firebase from 'firebase/app';

export class LoggedInContent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentMessagingChatRecipients: null,
            updates: null
        };
        this.signOut = this.signOut.bind(this);
        this.changeMessagingEnv = this.changeMessagingEnv.bind(this);

    }
    signOut(){
        this.props.changeAuthStatus('false', null);
        this.props.changePage('signin');
        this.props.responseMessage("Logged Out successfully!", 'rgb(27,146,169)');
    }
    changeMessagingEnv(recipientsIdArr){
        this.setState({
            currentMessagingChatRecipients: recipientsIdArr
        });
    }
    componentDidMount(){
        firebase.database().ref('/users/' + this.props.userId).on('value', function(snapshot) {
            if(!snapshot.val()) return;
            debugger;
            callFunc(snapshot);
        }).bind(this);
        let callFunc = (snapshot) => {
            firebase.database().ref('/users/' + this.props.userId).remove();
            this.setState({
                updates: Object.values(snapshot.val())
            });
        }
        callFunc = callFunc.bind(this);
    }
    render(){
        /*return (
            <div>
                <h1>Hi, {this.props.user}</h1>
                <button onClick={this.signOut}>Sign Out</button>
            </div>
        )*/
        return(
            <div style={{ position: relative }}>
                <ChatListAndOthers changeMessagingEnv={ this.changeMessagingEnv } username={this.props.username} userId={this.props.userId} updates={this.state.updates} />
                { 
                    this.state.currentMessagingChatRecipients ?  <MessagingEnv recipientsIdArr={this.state.currentMessagingChatRecipients} username={this.props.username} userId={this.props.userId} /> : <EmptyMessagingEnv />
                }
            </div>
        )        
    }
}