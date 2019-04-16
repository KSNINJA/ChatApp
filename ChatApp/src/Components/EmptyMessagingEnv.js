import React from 'react';

export class EmptyMessagingEnv extends React.Component{
    render(){
        return (
            <div className="col-xs-12 col-md-8 messagingEnv" style={{ display: 'flex' }}>
                <div className="messagingEnvBg">Nothing to show</div>
                <h1 style={{ margin: 'auto', paddingBottom: 67 }}>Nothing to Show</h1>
            </div>
        )
    }
}
