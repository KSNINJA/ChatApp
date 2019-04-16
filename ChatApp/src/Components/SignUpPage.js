import React from 'react';
import $ from 'jquery'; 

export class SignUpPage extends React.Component{
    constructor(props){
        super(props);
        this.trySignUp = this.trySignUp.bind(this);
        this.changePage = this.changePage.bind(this);
    }
    changePage(page){
        this.props.changePage('signin');
    }
    render(){
        return (
            <div style={{ display: 'inlineFlex', flexDirection: 'column', margin: 'auto'  }}>
                <input type="text" id="usernameInput" className="credential-input" placeholder="Username" />
                <input type="password" id="passInput" className="credential-input" placeholder="Password" />
                <input type="password" id="repassInput" className="credential-input" placeholder="Retype Password" />
                <button onClick={this.trySignUp}>Sign Up</button>
                <br></br>
                <a onClick={this.changePage}>Already registered? Click here</a>
            </div>
        )
    }
    trySignUp(){
        var enteredUsername = $('#usernameInput').val();
        var enteredPass = $('#passInput').val();
        var reEnteredPass = $('#repassInput').val();
        if(enteredPass !== reEnteredPass)
        {
            this.props.responseMessage("Your Password doesn't match with the re-entered password.", 'rgb(208,30,53)' );
        }
        else{
            $.ajax({
                context: this,
                type: 'POST',
                url: 'http://localhost:8080/signup',
                data: {username: enteredUsername, pass: enteredPass},
                success: function(result){
                    if(result === 'true'){
                        this.props.changeAuthStatus('true',enteredUsername);
                        this.props.responseMessage('Cheers! You have successfully registered!','rgb(37,154,53)');
                    }
                    else{
                        this.props.responseMessage('These credentials are already taken. Please choose different credentials.' ,'rgb(208,30,53)');
                    }
                },
                error: function(err){
                    this.props.responseMessage(err ,'rgb(208,30,53)');
                }
            });
        }
    }
}