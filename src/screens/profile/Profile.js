import React, { Component } from 'react';
import './Profile.css';
import { Redirect } from 'react-router-dom';
import Header from '../../common/header/Header';
import profilePic from '../../assets/profilePic.jpg';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Divider from '@material-ui/core/Divider';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { red } from '@material-ui/core/colors';

const styles = theme => ({
    avatar: {
        width: 150,
        height: 150
    },
    editIcon: {
        margin: '10px 0 0 10px',
    },
    editModalContent: {
        backgroundColor: 'white',
        width: 200,
        padding: 25,
        borderRadius: 4,
        border: '2px solid #dcd6d6',
        outline: 0
    },
    mediaModalContent: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        width: 800,
        padding: 25,
        borderRadius: 4,
        border: '2px solid #dcd6d6',
        outline: 0
    }
});

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accessToken: sessionStorage.getItem("access-token"),
            loggedIn: sessionStorage.getItem("access-token") === null ? false : true,
            likeCountList: JSON.parse(sessionStorage.getItem('likeCountList')),
            commentList: JSON.parse(sessionStorage.getItem('commentList')),
            mediaList: [],
            username: '',
            numOfPosts:0,
            followers:0 ,
            following:0 ,
            name: 'Pretty Birdie',
            editModalIsopen: false,
            mediaModalIsopen: false,
            fullName: '',
            fullNameRequired: 'dispNone',
            selecetedMedia: {},
            selectedIndex: null,
            comment: ''
        };
    }

    componentDidMount() {
        if (sessionStorage.getItem("access-token")) {
            this.getUserName();
            this.getImageDetails();
        }
    }

    /* details from instagram graph endpoint */
    getUserName = () => {
        let url = this.props.baseUrl + "me?fields=id,username&access_token=" + this.state.accessToken;
        fetch(url)
            .then(resp => {
                if (resp.status === 200) {
                    resp.json().then(resp => {
                        this.setState({ username: resp.username })
                    });
                }
            },
                err => console.log(err)
            )
            .catch(err => console.log(err));
    }

    /* details from instagram graph endpoint */
    getImageDetails = () => {
        let that = this;
        fetch(
            `https://graph.instagram.com/me/media?fields=id,caption&access_token=${this.state.accessToken}`
        )
            .then(rsp => {
                if (rsp.status === 200) {
                    rsp.json().then(res => {
                        this.setState({ numOfPosts: res.data.length });
                        const promises = res.data.map(item =>
                            fetch(
                                `https://graph.instagram.com/${item.id}?fields=id,media_type,media_url,username,timestamp&access_token=${this.state.accessToken}`
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
                                    media.likeCount = that.state.likeCountList[i].count;
                                    media.likeStr = that.state.likeCountList[i].likeStr;
                                    media.userLiked = that.state.likeCountList[i].userLiked;
                                    media.comments = that.state.commentList[i];
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

    
    onOpenEditModal = () => {
        this.setState({ editModalIsopen: !this.state.editModalIsopen })
    }

    
    onCloseEditModal = () => {
        this.setState({
            editModalIsopen: !this.state.editModalIsopen,
            fullName: ''
        })
    }

    /* input Full Name data*/
    onInputFullNameChange = (event) => {
        this.setState({ fullName: event.target.value })
    }

    /* Update Handler */
    onUpdateClick = () => {
        if (this.state.fullName === "") {
            this.setState({ fullNameRequired: 'dispBlock' })
            return;
        } else {
            this.setState({ fullNameRequired: 'dispNone' });
        }

        this.setState({
            editModalIsopen: !this.state.editModalIsopen,
            name: this.state.fullName,
            fullName: ''
        })
    }

    
    onOpenMediaModal = (mediaId) => {
        var idx = 0;
        var media = this.state.mediaList.filter((media, index) => {
            if (media.id === mediaId) {
                idx = index;
                return true;
            }
            return false;
        })[0];
        this.setState({
            mediaModalIsopen: !this.state.mediaModalIsopen,
            selecetedMedia: media,
            selectedIndex: idx
        });
    }
    
    
    onCloseMediaModal = () => {
        this.setState({
            mediaModalIsopen: !this.state.mediaModalIsopen
        })
    }

    
    /** Method to increase/ decrease like count */
    onFavIconClick = () => {
        let tempMediaList = this.state.mediaList;
        tempMediaList[this.state.selectedIndex].userLiked
            ? --tempMediaList[this.state.selectedIndex].likeCount
            : ++tempMediaList[this.state.selectedIndex].likeCount;
        tempMediaList[this.state.selectedIndex].likeCount > 1
            ? tempMediaList[this.state.selectedIndex].likeStr = 'likes'
            : tempMediaList[this.state.selectedIndex].likeStr = 'like';
        tempMediaList[this.state.selectedIndex].userLiked = !tempMediaList[this.state.selectedIndex].userLiked;
        this.setState({ mediaList: tempMediaList });
    }

    /* update comment */
    onInputCommentChange = (e) => {
        this.setState({ comment: e.target.value });
    }

    /* add comment */
    onAddComment = () => {
        if (this.state.comment) {
            let tempMediaList = this.state.mediaList;
            let tempComments = tempMediaList[this.state.selectedIndex].comments;
            tempComments.push({ commentStr: this.state.comment });
            tempMediaList[this.state.selectedIndex].comments = tempComments;
            tempMediaList[this.state.selectedIndex].comment = '';
            this.setState({
                mediaList: tempMediaList,
                comment: ''
            });
        }
        document.getElementById('comment').value = '';
    }

    render() {
        if (!this.state.loggedIn) {
            return (
                <Redirect to="/" />
            )
        }
        const { classes } = this.props;
        return (
            <div>
                {/** Header component*/}
                <Header loggedIn={this.state.loggedIn} history={this.props.history} />

                {/** User Info section*/}
                <div className="info-section">
                    <Avatar variant="circular" alt="Profile Picture" src={profilePic}
                        className={classes.avatar}></Avatar>
                    <div className="profile-details">
                        <div>
                            <Typography variant="h4">{this.state.username}</Typography>
                        </div>
                        <div className="middle-line">
                            <div>
                                <Typography>
                                    <span>Posts: </span>{this.state.numOfPosts}
                                </Typography>
                            </div>
                            <div>
                                <Typography>
                                    <span>Follows: </span>{this.state.following}
                                </Typography>
                            </div>
                            <div>
                                <Typography>
                                    <span>Followed By: </span>{this.state.followers}
                                </Typography>
                            </div>
                        </div>
                        <div>
                            <Typography variant="h6">
                                <span>{this.state.name}</span>
                                <Fab size="medium" color="secondary" aria-label="edit"
                                    className={classes.editIcon} onClick={this.onOpenEditModal}>
                                    <EditIcon />
                                </Fab>
                            </Typography>
                        </div>
                    </div>
                </div>
               

                {/** Image section */}
                <div className="image-section">
                    <GridList cols={3} cellHeight={450}>
                        {this.state.mediaList.map(media => (
                            <GridListTile onClick={() => this.onOpenMediaModal(media.id)}
                                key={"grid_" + media.id}>
                                <img src={media.media_url} alt={media.caption} style={{ cursor: 'pointer' }} />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
                {/** Edit Modal*/}
                <Modal open={this.state.editModalIsopen} onClose={this.onCloseEditModal}
                    className="modal">
                    <div className={classes.editModalContent} style={{
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)", position: 'relative'}}>
                        <FormControl className="modal-heading">
                            <Typography variant="h4">
                                Edit
                        </Typography>
                        </FormControl>
                        <br />
                        <br />
                        <FormControl required>
                            <InputLabel htmlFor='fullName'>Full Name</InputLabel>
                            <Input id='fullName' type='text' onChange={this.onInputFullNameChange} />
                            <FormHelperText className={this.state.fullNameRequired}>
                                <span className='required'>required</span>
                            </FormHelperText>
                        </FormControl>
                        <br />
                        <br />
                        <br />
                        <Button variant='contained' color='primary' onClick={this.onUpdateClick}>
                            UPDATE
                        </Button>
                    </div>
                </Modal>
                

                {/** Image Modal */}
                <Modal open={this.state.mediaModalIsopen} onClose={this.onCloseMediaModal} className="modal">
                    <div className={classes.mediaModalContent} style={{
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)", position: 'relative'}}>
                        <div className="image-modal-left">
                            <img src={this.state.selecetedMedia.media_url} alt={this.state.selecetedMedia.media_url}
                                className="modal-media-img" />
                        </div>
                        <div className="image-modal-right">
                            <div className="media-header">
                                <Avatar variant="circular" alt="Profile Picture" src={profilePic}></Avatar>
                                <Typography variant="h4" style={{ paddingLeft: '10px' }}>
                                    {this.state.selecetedMedia.username}
                                </Typography>
                            </div>
                            <div className="media-dtl-divider">
                                <Divider variant="fullWidth" />
                            </div>
                            <div className="media-caption">
                                <Typography style={{ fontSize: '14px' }}>
                                    {this.state.selecetedMedia.trimmedCaption}
                                </Typography>
                                <Typography style={{ fontSize: '14px', color: '#0ab7ff' }}>
                                    {this.state.selecetedMedia.hashtags}
                                </Typography>
                            </div>
                            <div className="modal-comment-section">
                                {this.state.selecetedMedia.comments && this.state.selecetedMedia.comments.length > 0 ?
                                    (this.state.selecetedMedia.comments.map((comment, i) => (
                                        <p key={'comment_' + this.state.selectedIndex + '_' + i} style={{ margin: '0 0 6px 0' }}>
                                            <b>{this.state.selecetedMedia.username}:</b> {comment.commentStr}
                                        </p>
                                    )))
                                    : ''}
                            </div>
                            <div className="modal-media-icon-section">
                                {this.state.selecetedMedia.userLiked ?
                                    <FavoriteIcon fontSize='default' style={{ color: red[500], fontSize: 30 }}
                                        onClick={() => this.onFavIconClick()} />
                                    :
                                    <FavoriteBorderIcon style={{ fontSize: 30 }}
                                        onClick={() => this.onFavIconClick()} />}
                                <Typography style={{ paddingLeft: 15, fontSize: 14 }}>
                                    {this.state.selecetedMedia.likeCount + ' '
                                        + this.state.selecetedMedia.likeStr}
                                </Typography>
                            </div>
                            <div>
                                <FormControl style={{ marginRight: 10 }} className='modal-comment-form-control'>
                                    <InputLabel htmlFor='comment'>Add a comment</InputLabel>
                                    <Input id='comment' type='text' value={this.state.comment}
                                        onChange={this.onInputCommentChange} />
                                </FormControl>
                                <FormControl style={{ verticalAlign: "bottom" }}>
                                    <Button variant='contained' color='primary'
                                        onClick={this.onAddComment}>
                                        ADD
                                    </Button>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div >

        )
    }
}

export default withStyles(styles)(Profile);