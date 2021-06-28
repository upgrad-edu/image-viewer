import React, {Component} from 'react';

class Profile extends Component {
    constructor(props) {
        super(props);
        if (sessionStorage.getItem('access-token') == null) {
            props.history.replace('/');
        }
        this.state = {
            profile_picture: 'profile.png',
            username: null,
            full_name: "PGK Bhargava Raju",
            posts: null,
            follows: null,
            followed_by: null,
            editOpen: false,
            fullNameRequired: 'dispNone',
            newFullName: '',
            mediaData: null,
            imageModalOpen: false,
            currentItem: null,
            likeSet:new Set(),
            comments:{},
            filteredData:[],
            userInfo:[],
            likes: 3
        }
    }
    render(){
        return( <div>Success!</div>) 
    }
}

export default Profile