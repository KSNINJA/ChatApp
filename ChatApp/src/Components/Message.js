import React from 'react'
import $ from 'jquery';

export class Message extends React.Component{
    render(){
        if(this.props.data != null)
        {
            return (
                <div className="message-box" style={{ padding: 15, backgroundColor: this.props.background }}>
                    {this.props.data}
                </div>
            )
        }
        return null;
    }
}