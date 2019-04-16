import React from 'react';

export class ChatListItem extends React.Component{
    constructor(props){
        super(props);
        this.changeMessagingEnv = this.changeMessagingEnv.bind(this);
    }
    changeMessagingEnv(){
        this.props.changeMessagingEnv(this.props.recipientsIdArr);
    }
    render(){
        return (
            <div onClick={ this.changeMessagingEnv } style={{ height: 72, width: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ margin: 'auto', fontWeight: 500 }}>
                    { this.props.chatName }
                </div>
                <hr style={{ margin: 0 }} />
            </div>
        )
    }
}