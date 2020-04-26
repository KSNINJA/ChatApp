import React from 'react'

export class SearchPeopleListItem extends React.Component{
    constructor(props){
        super(props);
        this.changeMessagingEnv = this.changeMessagingEnv.bind(this);
    }
    changeMessagingEnv(){
        let recipientsIdArr = '';
        if( this.props.userId < this.props.personUserId ) // arranging in asc order
        {
            recipientsIdArr += this.props.userId + ',';
            recipientsIdArr += this.props.personUserId;
        }
        else{
            recipientsIdArr += this.props.personUserId + ',';
            recipientsIdArr += this.props.userId;
        }
        console.log(1231234134, recipientsIdArr)
        this.props.changeMessagingEnv(recipientsIdArr);
        this.props.changeActivity('chatList'); // Go to chatlist instead of newchat-window
    }
    render(){
        return (
            <div onClick={ this.changeMessagingEnv } style={{ height: 72, width: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ margin: 'auto', fontWeight: 500 }}>
                    { this.props.personUsername }
                </div>
                <hr style={{ margin: 0 }} />
            </div>
        )
    }
}
