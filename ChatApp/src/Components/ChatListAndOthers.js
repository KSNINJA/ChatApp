import React from 'react';
import { ActivitiesMenuBar } from './ActivitiesMenuBar.js';
import { ChatList } from './ChatList.js';
import { CreateNewChatWindow } from './CreateNewChatWindow.js';

export class ChatListAndOthers extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentActivity : 'chatList'
        };
        this.changeCurrentActivity = this.changeCurrentActivity.bind(this);
    }
    changeCurrentActivity(newActivity){
        this.setState({
            currentActivity: newActivity
        });
    }
    render(){
        return (
            <div className="col-xs-12 col-sm-4 chatListAndOthers">
                <ActivitiesMenuBar currentActivity={ this.state.currentActivity }  changeActivity={this.changeCurrentActivity} logout={ this.props.logout } />
                <ChatList userId={this.props.userId} changeMessagingEnv={this.props.changeMessagingEnv} updates={this.props.updates} />
                { this.state.currentActivity === 'createNewChat' ? <CreateNewChatWindow changeMessagingEnv={ this.props.changeMessagingEnv } changeActivity={this.changeCurrentActivity}  username={this.props.username} userId={this.props.userId} /> : null} 

            </div>
        )
    }
}