import React from 'react';
import $ from 'jquery';
import { SearchPeopleListItem } from './SearchPeopleListItem.js';

export class CreateNewChatWindow extends React.Component{
    constructor(props){
        super(props);
        this.searchForPeopleInDB = this.searchForPeopleInDB.bind(this);
        this.state = {
            listItems: null
        };
    }
    render(){
        return (
            <div className="col-xs-12 col-sm-12 createNewChatWindow" >
                <div style={{ display: 'flex', backgroundColor: '#f7f7f7' }}>
                    <input placeholder="Search or start new chat" className="searchInput createPersonalNewChatSearchInput" onChange={ this.searchForPeopleInDB } />
                </div>
                <div>
                    {this.state.listItems}
                </div>
            </div>
        )
    }
    searchForPeopleInDB(){
        const searchedPhrase = $('.createPersonalNewChatSearchInput').val();
        if(searchedPhrase === '')
        {
            return;
        }
        $('#createPersonalNewChatSearchInput').val(searchedPhrase);
        let currentRequest = null;
        currentRequest = $.ajax({
            url: 'http://localhost:8080/search-people-with-username',
            type: 'POST',
            data: { search: searchedPhrase },
            beforeSend : function()    {          
                if(currentRequest != null) {
                    currentRequest.abort();
                }
            },
            success: (data) =>{
                let items = data.map((userDetails) => {
                    return <SearchPeopleListItem personUsername={userDetails.username} personUserId={ userDetails.id.toString() } changeMessagingEnv={this.props.changeMessagingEnv} changeActivity={this.props.changeActivity} username={this.props.username} userId={this.props.userId} />
                });
                this.setState({
                    listItems: items
                });
            }
        });
    }
}