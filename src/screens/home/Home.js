import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Home.css';
import Header from '../../common/header/Header';
import profilePic from '../../assets/profilePic.jpg';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { red } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
            mediaList: [],
            filteredMediaList: [],
            searchText: ''
        }
    }

    componentDidMount() {
        if (sessionStorage.getItem("access-token")) {
            this.getImageDetails();
        }
    }

    /* details from Instagram End Point */
    getImageDetails = () => {
        let that = this;
        fetch(
            `https://graph.instagram.com/me/media?fields=id,caption&access_token=${sessionStorage.getItem("access-token")}`
        )
            .then(rsp => {
                if (rsp.status === 200) {
                    rsp.json().then(res => {
                        const promises = res.data.map(item =>
                            fetch(
                                `https://graph.instagram.com/${item.id}?fields=id,media_type,media_url,username,timestamp&access_token=${sessionStorage.getItem("access-token")}`
                            )
                        );
                        Promise.all(promises)
                            .then(responses => {
                                return Promise.all(
                                    responses.map(function (response) {
                                        return response.json();
                                    })
                                );
                            },
                                err => console.log(err)
                            )
                            .then(function (data) {
                                data.forEach((media, i) => {
                                    const mediaCaption = res.data[i];
                                    if (mediaCaption.caption) {
                                        media.caption = mediaCaption.caption
                                        media.hashtags = mediaCaption.caption.split(' ').filter(str => str.startsWith('#')).join(' ');
                                        media.trimmedCaption = mediaCaption.caption.replace(/(^|\s)#[a-zA-Z0-9][^\\p{L}\\p{N}\\p{P}\\p{Z}][\w-]*\b/g, '');
                                    } else {
                                        media.caption = null;
                                    }

                                    
                                    const count = 0 + i;
                                    media.likeCount = count;
                                    media.likeStr = count > 1 ? 'likes' : 'like';
                                    media.userLiked = false;
                                    media.comments = [];
                                    media.comment = '';

                                    /** Change date format to mm/dd/yyyy HH:MM:SS */
                                    const mediaDate = new Date(media.timestamp);
                                    const formattedDt = (mediaDate.getMonth() + 1).toString().padStart(2, '0') + '/'
                                        + mediaDate.getDate().toString().padStart(2, '0') + '/'
                                        + mediaDate.getFullYear().toString().padStart(4, '0') + ' '
                                        + mediaDate.getHours().toString().padStart(2, '0') + ':'
                                        + mediaDate.getMinutes().toString().padStart(2, '0') + ':'
                                        + mediaDate.getSeconds().toString().padStart(2, '0');
                                    media.timestamp = formattedDt;
                                });
                                that.setState({ mediaList: data, filteredMediaList: data });
                            },
                                err => console.log(err)
                            ).catch(err => console.log(err));
                    });
                }
            },
                err => console.log(err)
            ).catch(err => console.log(err));
    }

    /* image counter */
    onFavIconClick = (likeIdx) => {
        let tempMediaList = this.state.filteredMediaList;
        tempMediaList.forEach((mediaObj, index) => {
            if (index === likeIdx) {
                mediaObj.userLiked ? --mediaObj.likeCount : ++mediaObj.likeCount;
                mediaObj.likeCount > 1 ? mediaObj.likeStr = 'likes' : mediaObj.likeStr = 'like';
                mediaObj.userLiked = !mediaObj.userLiked;
            }
        });
        this.setState({ filteredMediaList: tempMediaList });
    }

    /* comment updation */
    onInputCommentChange = (e, idx) => {
        let tempMediaList = this.state.filteredMediaList;
        tempMediaList[idx].comment = e.target.value;
        this.setState({ filteredMediaList: tempMediaList });
    }

    
    onAddComment = (idx) => {
        let tempMediaList = this.state.filteredMediaList;
        if (tempMediaList[idx].comment) {
            let tempComments = tempMediaList[idx].comments;
            tempComments.push({ commentStr: tempMediaList[idx].comment });
            tempMediaList[idx].comments = tempComments;
            tempMediaList[idx].comment = '';
            this.setState({ filteredMediaList: tempMediaList });
        }
    }

    
    searchHandler = (e) => {
        this.setState({ searchText: e.target.value }, () => {
            if (!this.state.searchText || this.state.searchText.trim() === "") {
                this.setState({ filteredMediaList: this.state.mediaList });
            } else {
                let filteredMedia = this.state.mediaList.filter((media) => {
                    if (media.caption) {
                        return media.caption.toUpperCase().indexOf(this.state.searchText.toUpperCase()) > -1
                    }
                    return false;
                });
                this.setState({ filteredMediaList: filteredMedia });
            }
        });

    }

    /* profile Page redirection */
    myAccountHandler = () => {
        var likeCountList = [];
        var commentList = [];
        this.state.filteredMediaList.forEach((media, i) => {
            likeCountList.push({
                count: media.likeCount,
                likeStr: media.likeStr,
                userLiked: media.userLiked
            })
            commentList.push(media.comments);
        });
        sessionStorage.setItem('likeCountList', JSON.stringify(likeCountList));
        sessionStorage.setItem('commentList', JSON.stringify(commentList));
        this.props.history.push('/profile');
    }

    render() {
        if (!this.state.loggedIn) {
            return (
                <Redirect to="/" />
            )
        }
        return (
            <div>
                
                <Header loggedIn={this.state.loggedIn} homePage={true}
                    history={this.props.history} searchHandler={this.searchHandler} myAccountHandler={this.myAccountHandler} />

                
                <Grid alignContent='center' container spacing={2} justify='flex-start' direction='row'
                    style={{ width: "85%", margin: "auto", paddingTop: 10}}>
                    {this.state.filteredMediaList.map((media, index) => (
                        <Grid item xs={6} key={"grid_" + media.id}>
                            <Card key={"card_" + media.id} style={{ padding: '0 8px' }}>
                                <CardHeader
                                    avatar={<Avatar variant="circular" src={profilePic} />}
                                    title={media.username}
                                    subheader={media.timestamp} />
                                <CardContent>
                                    <div>
                                        <img src={media.media_url} alt={media.media_url} className="media-img" />
                                    </div>
                                    <div className="media-dtl-divider">
                                        <Divider variant="fullWidth" />
                                    </div>
                                    <div>
                                        <Typography style={{ fontSize: '15px' }}>{media.trimmedCaption}</Typography>
                                        <Typography style={{ fontSize: '15px', color: '#0ab7ff' }}>
                                            {media.hashtags}
                                        </Typography>
                                    </div>
                                    <div className="media-icon-section">
                                        {media.userLiked ?
                                            <FavoriteIcon style={{ color: red[500], fontSize: 30 }}
                                                onClick={() => this.onFavIconClick(index)} />
                                            :
                                            <FavoriteBorderIcon style={{ fontSize: 30 }}
                                                onClick={() => this.onFavIconClick(index)} />}
                                        <Typography style={{ paddingLeft: 15 }}>
                                            {media.likeCount + ' ' + media.likeStr}
                                        </Typography>
                                    </div>
                                    <div className="comment-section">
                                        {media.comments.length > 0 ?
                                            (media.comments.map((comment, i) => (
                                                <p key={'comment_' + index + '_' + i} style={{ margin: '0 0 10px 0' }}>
                                                    <b>{media.username}:</b> {comment.commentStr}
                                                </p>
                                            )))
                                            : ''}
                                    </div>
                                    <div>
                                        <FormControl style={{ marginRight: 10 }} className='comment-form-control'>
                                            <InputLabel htmlFor={'comment_' + index}>Add a comment</InputLabel>
                                            <Input id={'comment_' + index} type='input'
                                                value={media.comment ? media.comment : ''}
                                                onChange={(e) => this.onInputCommentChange(e, index)} />
                                        </FormControl>
                                        <FormControl style={{ verticalAlign: "bottom" }}>
                                            <Button variant='contained' color='primary'
                                                onClick={() => this.onAddComment(index)}>
                                                ADD
                                                </Button>
                                        </FormControl>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                
            </div>
        )
    }
}

export default Home;