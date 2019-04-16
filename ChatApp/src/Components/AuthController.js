import React from 'react';
import {LoggedInContent} from './LoggedInContent.js'
import {SignInPage} from './SignInPage.js'
import {SignUpPage} from './SignUpPage.js'

import {Message} from './Message.js'

export class AuthController extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            isLoggedIn: 'false',
            page: 'signin',
            isMessageBarVisible: false
        };
        this.changeAuthState = this.changeAuthState.bind(this);
        this.throwMessage = this.throwMessage.bind(this);
        this.changePage = this.changePage.bind(this);
    }
    changeAuthState(authStatus, username, userId){
        this.setState({
            isLoggedIn: authStatus,
            username: username,
            userId: userId
        });
    }
    throwMessage(receivedMessage, boxColor){
        this.setState({
            message: receivedMessage,
            messageBoxColor: boxColor,
            isMessageBarVisible: true
        });
        setTimeout(() =>{
            this.setState({
                isMessageBarVisible: false
            });
        }, 2000)
    }
    changePage(page){
        this.setState({
            page: page
        });
    }
    render(){
        if(this.state.isLoggedIn === 'true'){
            return (
                <div>
                    <LoggedInContent changeAuthStatus={this.changeAuthState} username={this.state.username} userId={ this.state.userId } responseMessage={this.throwMessage} changePage={this.changePage}/>
                    {  this.state.isMessageBarVisible ?  
                       <Message data={this.state.message} background={this.state.messageBoxColor}/> : null 
                    }
                </div>
            );
        }
        else if(this.state.page === 'signin')
        {
            return (
                <div>
                    <SignInPage changeAuthStatus={this.changeAuthState} responseMessage={this.throwMessage} changePage={this.changePage} />
                    <Message data={this.state.message} background={this.state.messageBoxColor}/>
                </div>
            );
        }
        else{
            return (
                <div>
                    <SignUpPage changeAuthStatus={this.changeAuthState} responseMessage={this.throwMessage} changePage={this.changePage} />
                    <Message data={this.state.message} background={this.state.messageBoxColor}/>
                </div>
            );
        }
    }
}
