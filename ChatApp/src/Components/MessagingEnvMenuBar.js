import React from 'react';
import $ from 'jquery';

export class MessagingEnvMenuBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            chatName: ''
        };
        this.getChatName = this.getChatName.bind(this);
        this.getChatName();
    }
    getChatName(nextProps){
        if(!nextProps) nextProps = this.props;
        let chatRecipientsId;
        chatRecipientsId = "";
        for(let i=0; i < nextProps.recipientsIdArr.length ; i++)
        {
            chatRecipientsId += nextProps.recipientsIdArr[i];
        }
        chatRecipientsId = chatRecipientsId.split(',');
        const index = chatRecipientsId.indexOf(nextProps.userId);
        chatRecipientsId.splice(index , 1); //remove only 1 element
        if(chatRecipientsId.length === 1)
        {
            $.ajax({
                url: 'http://localhost:8080/search-people-with-id',
                type: 'POST',
                data: { personId: chatRecipientsId[0] },
                success: (data) =>{
                    this.setState({
                        chatName: data[0].username
                    });
                }
            });
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        this.getChatName(nextProps);
    }
    render(){
        return (
            <div className="menubar messagingEnvMenuBar">
                <div style={{ margin: 'auto', fontWeight: 400 }}>
                    { this.state.chatName }
                </div>
            </div>
        )
    }
}