import React from 'react';
import { ChatListMenuBar } from './ChatListMenuBar.js';
import { CreateNewChatMenuBar } from './CreateNewChatMenuBar.js';

export class ActivitiesMenuBar extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        if(this.props.currentActivity === 'chatList')
        {
            return <ChatListMenuBar changeActivity={ this.props.changeActivity } logout={this.props.logout} />
        }
        else if(this.props.currentActivity === 'createNewChat')
        {
            return <CreateNewChatMenuBar changeActivity={ this.props.changeActivity } />
        }
    }
}