import React from 'react';
import $ from 'jquery';
import MaterialIcon from 'material-icons-react';

export class MessagingInput extends React.Component{
    constructor(props){
        super(props);
        this.sendMessage = this.sendMessage.bind(this);
    }
    sendMessage(){
        const message = $('.messagingInput').val()
        this.props.sendMessage(message);
    }
    render(){
        return (
            <div className="messagingInputContainer">
                <input className="messagingInput" placeholder="Type a message" />
                <div onClick={ this.sendMessage }>
                    <MaterialIcon icon="send" color="rgb(56,56,56)" background="transparent" size="22" /> 
                </div>
            </div>
        )
    }
}