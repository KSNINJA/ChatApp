import React from 'react';

export class MessageItem extends React.Component{
    constructor(props){
        super(props);
        if(this.props.details.sender === this.props.username)
        {
            this.state = {
                align: 'right',
                bg: '#dcf8c6'
            };
        }
        else{
            this.state = {
                align: 'left',
                bg: '#fff'
            };
        }
    }
    componentWillReceiveProps(newProps){
        if(newProps.details.sender === newProps.username)
        {
            this.setState({
                align: 'right',
                bg: '#dcf8c6'
            });
        }
        else{
            this.setState({
                align: 'left',
                bg: '#fff'
            });
        }
    }
    render(){ 
        return (
            <div className="container" >
                <div className="messageItem" style={{ float: this.state.align, backgroundColor: this.state.bg }}>
                    <div style={{ marginRight: 20, marginBottom: 16, overflowWrap: 'break-word' }} > { this.props.details.message } </div>
                    <div className="messageItemTime" > { this.props.details.time } </div>
                </div>
            </div>
        )
    }
}