import React from 'react';
import $ from 'jquery'; 

export class SignInPage extends React.Component{
    constructor(props){
        super(props);
        this.trySignIn = this.trySignIn.bind(this);
        this.changePage = this.changePage.bind(this);
    }
    render(){
        return (
            <div style={{ display: 'inlineFlex', flexDirection: 'column', margin: 'auto'  }}>
                <input type="text" id="usernameInput" className="credential-input" placeholder="Username" />
                <input type="password" id="passInput" className="credential-input" placeholder="Password" />
                <button onClick={this.trySignIn}>Sign In</button>
                <br></br>
                <a onClick={this.changePage}>Not registered yet? Click here</a>
            </div>
        )
    }
    changePage(page){
        this.props.changePage('signup');
    }
    trySignIn(){
        var enteredUsername = $('#usernameInput').val();
        var enteredPass = $('#passInput').val();
        $.ajax({
            context: this,
            type: 'POST',
            url: "http://localhost:8080/signin",
            data: {username: enteredUsername, pass: enteredPass},
            success: function(result){
                if(result && result != 'false'){
                    this.props.changeAuthStatus('true',enteredUsername, result);
                    this.props.responseMessage('You are successfully logged in!','rgb(37,154,53)');
                }
                else{
                    this.props.responseMessage('Your credentials maybe wrong or you are not registered.' ,' rgb(208,30,53)');
                }
            },
            error: function(err){
                this.props.responseMessage(err ,' rgb(208,30,53)');
            }
        });
    }
}