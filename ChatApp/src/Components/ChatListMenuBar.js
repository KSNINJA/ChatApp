import React from 'react';
import MaterialIcon from 'material-icons-react';

export class ChatListMenuBar extends React.Component{
    constructor(props){
        super(props);
        this.openCreateNewChatWindow = this.openCreateNewChatWindow.bind(this);
    }
    render(){
        return (
            <div className="menubar chatListMenubar col-xs-12">
                <div onClick={ this.openCreateNewChatWindow }>
                    <MaterialIcon icon="border_color" color="rgb(56,56,56)" background="transparent" size="22" /> 
                </div>
                <div>
                    <MaterialIcon icon="more_vert" color="rgb(56,56,56)" background="transparent"  size="22" /> 
                </div>   
            </div>
        )
    }
    openCreateNewChatWindow(){
        this.props.changeActivity('createNewChat');
    }
}