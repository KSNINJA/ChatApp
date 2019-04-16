import React from 'react';
import $ from 'jquery';
import { ChatListItem } from './ChatListItem.js';

export class ChatList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            chatListDOM: '',
            chatIdList: []
        };
        this.getChatList = this.getChatList.bind(this);
    }
    componentDidMount(){
        this.getChatList();
    }
    getChatList(){
        const component_this = this;
        $.ajax({
            url: 'http://localhost:8080/get-chat-list',
            type: 'POST',
            data: {
                userId: this.props.userId
            },
            success: (data) => {
                let chatListDOM = [];
                data.forEach((item) => {
                    var recipients = item.recipients;
                    recipients = recipients.slice(1, recipients.length -1);
                    let recipientsIdArr = recipients.split(",");
                    const index = recipientsIdArr.indexOf(this.props.userId);
                    recipientsIdArr.splice(index, 1);
                    if(recipientsIdArr.length === 1){
                        $.ajax({
                            url: 'http://localhost:8080/search-people-with-id',
                            type: 'POST',
                            data: { personId: recipientsIdArr[0] }
                        }).done((result) => {
                            const listItem = <ChatListItem recipientsIdArr={item.recipients.slice(1, item.recipients.length -1)} chatName={result[0].username} changeMessagingEnv={this.props.changeMessagingEnv} />;
                            if(component_this.state.chatIdList.indexOf(result.chatId) === -1){
                                chatListDOM.push(listItem);
                                let chatIdList = component_this.state.chatIdList;
                                chatIdList.push(item.chatId);
                                component_this.setState({
                                    chatIdList: chatIdList
                                });
                            }
                        });
                    }
                });
                debugger;
                component_this.setState({
                    chatListDOM: chatListDOM
                });
            }
        });
    }
    componentWillReceiveProps(nextProps){
        let updates = nextProps.updates;
        if(!updates) return;
        let chatListDOM = [];
        const component_this = this;
        updates.forEach((chat) => {
            $.ajax({
                url: 'http://localhost:8080/get-chat-with-id',
                type: 'POST',
                data: { chatId: chat.chatId },
                success: (result) => {
                   var recipients = result[0].recipients;
                    recipients = recipients.slice(1, recipients.length -1);
                    let recipientsIdArr = recipients.split(",");
                    const index = recipientsIdArr.indexOf(this.props.userId);
                    recipientsIdArr.splice(index, 1);
                    $.ajax({
                        url: 'http://localhost:8080/search-people-with-id',
                        type: 'POST',
                        data: { personId: recipientsIdArr[0] }
                    }).done((result) => {
                        const listItem = <ChatListItem recipientsIdArr={recipients} chatName={result[0].username} changeMessagingEnv={this.props.changeMessagingEnv} />;
                        if(component_this.state.chatIdList.indexOf(chat.chatId) === -1){
                            chatListDOM.push(listItem);
                            component_this.setState({
                                chatListDOM: component_this.state.chatListDOM.concat(chatListDOM)
                            })
                            let chatIdList = component_this.state.chatIdList;
                            chatIdList.push(chat.chatId);
                            component_this.setState({
                                chatIdList: chatIdList
                            });
                        }
                    });
                }
            });
        })
    }
    render(){
        return (
            <div className="chatList col-xs-12 col-sm-12" >
                {this.state.chatListDOM}
            </div>
        )
    }
}