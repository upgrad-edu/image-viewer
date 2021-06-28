import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import FavoriteIconBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIconFill from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { constants } from '../../common/utils'

const styles = theme => ({
  card: {
    maxWidth: 1100,
  },
  avatar: {
    margin: 10,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  formControl: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  comment: {
    display: 'flex',
    alignItems: 'center'
  },
  hr: {
    marginTop: '10px',
    borderTop: '2px solid #f2f2f2'
  },
  gridList: {
    width: 1100,
    height: 'auto',
    overflowY: 'auto',
  },
  grid: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 90
  }
});
class Home extends Component {

  constructor(props) {
    super(props);
    if (sessionStorage.getItem('access-token') == null) {
      props.history.replace('/');
    }
    this.state = {
      data: [],
      filteredData: [],
      userData: [],
      likeSet: new Set(),
      comments: {},
      currrentComment: "",
      userInfo: [],
      likes: 0
    }
  }

  componentDidMount() {
    this.getBaseUserInfo();
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header
          userProfileUrl="./../../assets/profile.png"
          screen={"Home"}
          searchHandler={this.onSearchEntered}
          handleLogout={this.logout}
          handleAccount={this.navigateToAccount} />
        <div className={classes.grid}>
          <GridList className={classes.gridList} cellHeight={'auto'}>
            {this.state.filteredData.map((item, index) => (
              <GridListTile key={item.id}>
                <HomeItem
                  classes={classes}
                  item={item}
                  userInfo={this.state.userInfo}
                  onLikedClicked={this.likeClickHandler}
                  onAddCommentClicked={this.addCommentClickHandler}
                  commentChangeHandler={this.commentChangeHandler}
                  comments={this.state.comments} />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div>
    );
  }

  onSearchEntered = (value) => {
    console.log('search value', value);
    let filteredData = this.state.userInfo;
    filteredData = filteredData.filter((data) => {
      if (data !== null) {
        let searchString = data.caption.toLowerCase();
        let subString = value.toLowerCase();
        return searchString.includes(subString);
      }
    })
    this.setState({
      userInfo: filteredData
    })
  }

  addCommentClickHandler = (id) => {
    if (this.state.currentComment === "" || typeof this.state.currentComment === undefined) {
      return;
    }

    let commentList = this.state.comments.hasOwnProperty(id) ?
      this.state.comments[id].concat(this.state.currentComment) : [].concat(this.state.currentComment);

    this.setState({
      comments: {
        ...this.state.comments,
        [id]: commentList
      },
      currentComment: ''
    })
  }


  commentChangeHandler = (e) => {
    this.setState({
      currentComment: e.target.value
    });
  }

  getBaseUserInfo = () => {
    let that = this;
    let url = `${constants.userInfoUrl}=${sessionStorage.getItem('access-token')}`;
    return fetch(url, {
      method: 'GET',
    }).then((response) => {
      return response.json();
    }).then((jsonResponse) => {
      that.setState({
        userInfo: jsonResponse.data
      });
      this.state.userInfo.map((data, index) => (
        this.getMediaData(data.id)
      ));
    }).catch((error) => {
      console.log('error user data', error);
    });
  }

  getMediaData = (id) => {
    let that = this;
    let url = `${constants.userMediaUrl}/${id}?fields=id,media_type,media_url,username,timestamp&access_token=&access_token=${sessionStorage.getItem('access-token')}`;
    return fetch(url, {
      method: 'GET',
    }).then((response) => {
      return response.json();
    }).then((jsonResponse) => {
      that.setState({
        filteredData: this.state.filteredData.concat(jsonResponse)
      })
    }).catch((error) => {
      console.log('error user data', error);
    });
  }

  logout = () => {
    sessionStorage.clear();
    this.props.history.replace('/');
  }

  navigateToAccount = () => {
    this.props.history.push('/profile');
  }
}

class HomeItem extends Component {
  constructor() {
    super();
    this.state = {
      isLiked: false,
      comment: '',
      likes: 3
    }
  }

  render() {
    const { classes, item, userInfo, comments } = this.props;

    // Convert Timestamp to required format

    let createdTime = new Date(item.timestamp);
    let yyyy = createdTime.getFullYear();
    let mm = createdTime.getMonth() + 1;
    let dd = createdTime.getDate();

    let HH = createdTime.getHours();
    let MM = createdTime.getMinutes();
    let ss = createdTime.getSeconds();

    let time = dd + "/" + mm + "/" + yyyy + " " + HH + ":" + MM + ":" + ss;

    // Fetching the caption of the image via the API endpoint result
    let captionText = '';
    let likeCount = this.state.likes;
    userInfo.forEach(data => {
      if (data.id === item.id) {
        captionText = data.caption;
      }
    });

    if (captionText === '') {
      return (<div className="home-item-main-container"></div>);
    } else {
      return (
        <div className="home-item-main-container">
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar alt="User Profile Pic" src="profile.png" className={classes.avatar} />
              }
              title={item.username}
              subheader={time}
            />

            { /* Media URL value is fetched via the API endpoint and is diplayed below using item.media_url query */}
            <CardContent>
              <CardMedia
                className={classes.media}
                image={item.media_url}
                title=""
              />
              <div className={classes.hr}>
                <Typography component="p">

                  { /* Fetch Caption from API call */}
                  {captionText}
                </Typography>
                <Typography style={{ color: '#4dabf5' }} component="p" >
                  { /* Hard Coded Hashtags */}
                  #Tech #Serene #Divinity #Earth #Go Green
                </Typography>
              </div>
            </CardContent>
            <CardActions>
              <IconButton aria-label="Add to favorites" onClick={this.onLikeClicked.bind(this, item.id)}>
                {this.state.isLiked && <FavoriteIconFill style={{ color: '#F44336' }} />}
                {!this.state.isLiked && <FavoriteIconBorder />}
              </IconButton>
              <Typography component="p">

                { /*   */}
                {likeCount} likes
              </Typography>
            </CardActions>

            <CardContent>
              {comments.hasOwnProperty(item.id) && comments[item.id].map((comment, index) => {
                return (
                  <div key={index} className="row">
                    <Typography component="p" style={{ fontWeight: 'bold' }}>
                      {sessionStorage.getItem('username')}:
                    </Typography>
                    <Typography component="p" >
                      {comment}
                    </Typography>
                  </div>
                )
              })}
              <div className={classes.formControl}>
                <FormControl style={{ flexGrow: 1 }}>
                  <InputLabel htmlFor="comment">Add a comment</InputLabel>
                  <Input id="comment" value={this.state.comment} onChange={this.commentChangeHandler} />
                </FormControl>
                <FormControl class="commentAdd">
                  <Button onClick={this.onAddCommentClicked.bind(this, item.id)}
                    variant="contained" color="primary">
                    ADD
                  </Button>
                </FormControl>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
  }

  onLikeClicked = (id) => {
    // Change Like Icon and Increment/Decrement likes counter
    if (!this.state.isLiked) {
      this.setState({
        likes: this.state.likes + 1
      })
    } else {
      this.setState({
        likes: this.state.likes - 1
      })
    }
    if (this.state.isLiked) {
      this.setState({
        isLiked: false
      });
    } else {
      this.setState({
        isLiked: true
      });
    }
  }

  commentChangeHandler = (e) => {
    this.setState({
      comment: e.target.value,
    });
    this.props.commentChangeHandler(e);
  }

  onAddCommentClicked = (id) => {
    // Add comment
    if (this.state.comment === "" || typeof this.state.comment === undefined) {
      return;
    }
    this.setState({
      comment: ""
    });
    this.props.onAddCommentClicked(id);
  }
}
export default withStyles(styles)(Home);

