import React from 'react';
import MaterialIcon from 'material-icons-react';

export class CreateNewChatMenuBar extends React.Component{
    constructor(props){
        super(props);
        this.changeActivity = this.changeActivity.bind(this);
    }
    changeActivity(){
        this.props.changeActivity('chatList');
    }
    render(){
        return (
            <div className="menubar createNewChatMenuBar" >
                <div style={{ backgroundColor: '#00bfa5', color: '#fff', width: '100%', height: 110 ,display: 'flex', flexDirection: 'row'}}>
                    <div style={{ margin: 'auto 0px 10px 10px' }}>
                        <span onClick={this.changeActivity}>
                            <MaterialIcon icon="arrow_back" color="#fff" background="transparent" />
                        </span>
                        <div style={{ display: 'inline', fontSize: 19, marginLeft: 15 }}> New Chat </div> 
                    </div>
                </div>
            </div>
        )
    }
}