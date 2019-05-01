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
                    <div className="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ height: 32, width: 32, fontSize: 22 }} >
                    </div>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                        <div class="dropdown-item" onClick={ this.props.logout }>
                            Logout
                        </div>
                    </div>  
                </div> 
            </div>
        )
    }
    openCreateNewChatWindow(){
        this.props.changeActivity('createNewChat');
    }
}