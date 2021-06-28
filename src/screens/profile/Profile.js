import React, {Component} from 'react';
import './Profile.css';
import {constants} from '../../common/utils'
import Header from '../../common/header/Header';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import CardMedia from '@material-ui/core/CardMedia';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIconBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIconFill from '@material-ui/icons/Favorite';

const styles = {
    paper: {
        position: 'relative',
        width: "180px",
        backgroundColor: "#fff",
        top: "30%",
        margin: "0 auto",
        boxShadow: "2px 2px #888888",
        padding: "20px"
    },
    media: {
        height: '200px',
        paddingTop: '56.25%', // 16:9
    },
    imageModal: {
        backgroundColor: "#fff",
        margin: "0 auto",
        boxShadow: "2px 2px #888888",
        padding: "10px",
    }
};
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
        let likeCount = this.state.likes;
        return(
            <div>
                <Header
                  screen={"Profile"}
                  userProfileUrl={this.state.profile_picture}
                  handleLogout={this.logout}/>
                <div className="information-section">
                    <Avatar
                        alt="User Image"
                        src={this.state.profile_picture}
                        style={{width: "90px", height: "90px"}}
                    />
                    <span style={{marginLeft: "20px"}}>
                        <div style={{width: "600px", fontSize: "big"}}> {this.state.username} <br /><br />
                            <div style={{float: "left", width: "200px", fontSize: "x-small"}}> Posts: {this.state.userInfo.length} </div>
                            <div style={{float: "left", width: "200px", fontSize: "x-small"}}> Follows: 5 </div>
                            <div style={{float: "left", width: "200px", fontSize: "x-small"}}> Followed By: 2 </div> <br />
                        </div>
                        <div style={{fontSize: "small"}}> {this.state.full_name}
                        <Fab mini variant="round" color="secondary" aria-label="Edit" style={{marginLeft: "20px"}} onClick={this.handleOpenEditModal}>
                            <Icon>edit_icon</Icon>
                        </Fab>
                        </div>
                        <Modal
                            aria-labelledby="edit-modal"
                            aria-describedby="modal to edit user full name"
                            open={this.state.editOpen}
                            onClose={this.handleCloseEditModal}
                            style={{alignItems: 'center', justifyContent: 'center'}}
                        >
                            <div style={styles.paper}>
                                <Typography variant="h5" id="modal-title">
                                    Edit
                                </Typography><br />
                                <FormControl required>
                                    <InputLabel htmlFor="fullname">Full Name</InputLabel>
                                    <Input id="fullname" onChange={this.inputFullNameChangeHandler} />
                                    <FormHelperText className={this.state.fullNameRequired}><span className="red">required</span></FormHelperText>
                                </FormControl><br /><br /><br />
                                <Button variant="contained" color="primary" onClick={this.updateClickHandler}>
                                    UPDATE
                                </Button>
                            </div>
                        </Modal>
                    </span>
                </div>

                {this.state.filteredData != null &&
                <GridList cellHeight={'auto'} cols={3} style={{padding: "40px"}}>
                {this.state.filteredData.map(item => (
                    <GridListTile key={item.id}>
                    <CardMedia
                        id={item.id}
                        style={styles.media}
                        image={item.media_url}
                        title=""
                        onClick={this.handleOpenImageModal}
                    />
                    </GridListTile>
                ))}
                </GridList>}

                {this.state.currentItem != null &&
                <Modal
                    aria-labelledby="image-modal"
                    aria-describedby="modal to show image details"
                    open={this.state.imageModalOpen}
                    onClose={this.handleCloseImageModal}
                    style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <div style={{display:'flex',flexDirection:'row',backgroundColor: "#fff",width:'70%',height:'70%'}}>
                      <div style={{width:'50%',padding:10}}>
                        <img style={{height:'100%',width:'100%'}}
                          src={this.state.mediaData.media_url}
                          alt={this.state.currentItem.caption} />
                      </div>

                      <div style={{display:'flex', flexDirection:'column', width:'50%', padding:10}}>
                        <div style={{borderBottom:'2px solid #f2f2f2',display:'flex', flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                          <Avatar
                            alt="User Image"
                            src={this.state.profile_picture}
                            style={{width: "50px", height: "50px",margin:'10px'}}/>
                            <Typography component="p">
                              {this.state.username}
                            </Typography>
                        </div>
                        <div style={{display:'flex', height:'100%', flexDirection:'column', justifyContent:'space-between'}}>
                          <div>
                            <Typography component="p">
                              {this.state.currentItem.caption}
                            </Typography>
                            <Typography style={{color:'#4dabf5'}} component="p" >
                                #Nature #Earth #Peace
                            </Typography>
                            {this.state.comments.hasOwnProperty(this.state.currentItem.id) && this.state.comments[this.state.currentItem.id].map((comment, index)=>{
                              return(
                                <div key={index} className="row">
                                  <Typography component="p" style={{fontWeight:'bold'}}>
                                    {sessionStorage.getItem('username')}:
                                  </Typography>
                                  <Typography component="p" >
                                    {comment}
                                  </Typography>
                                </div>
                              )
                            })}
                          </div>
                          <div>
                            <div className="row">
                              <IconButton aria-label="Add to favorites" onClick={this.likeClickHandler.bind(this,this.state.currentItem.id)}>
                                {this.state.isLiked && <FavoriteIconFill style={{color:'#F44336'}}/>}
                                {!this.state.isLiked && <FavoriteIconBorder/>}
                              </IconButton>
                              <Typography component="p">
                                  {likeCount} likes
                              </Typography>
                            </div>
                            <div className="row">
                              <FormControl style={{flexGrow:1}}>
                                <InputLabel htmlFor="comment">Add a comment</InputLabel>
                                <Input id="comment" value={this.state.currentComment} onChange={this.commentChangeHandler}/>
                              </FormControl>
                              <FormControl>
                                <Button onClick={this.onAddCommentClicked.bind(this,this.state.currentItem.id)}
                                   variant="contained" color="primary">
                                  ADD
                                </Button>
                              </FormControl>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                </Modal>}
            </div>
        )
    }
}

export default Profile