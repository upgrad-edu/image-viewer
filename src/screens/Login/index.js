import React, { Component } from 'react';
import { LoggedInHeader } from './../../components';

import Grid from '@material-ui/core';
import withStyles from '@material-ui/core';
import Container from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core';
import { fetchUserMedia } from './../../api';
import pushComments from './../../utils';
import updateFavoriteItem from './../../utils';

const useStyles = theme => ({
	root: {
		marginTop: '2rem'
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	hashtag: {
		color: 'skyblue'
	},
	fillColor: {
		color: 'red'
	},
	addComment: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	addCommentFormControl: {
		flexGrow: 1,
		display: 'flex',
		marginRight: '16px'
	},
	mb16: {
		marginBottom: '16px'
	}
});


class Home extends Component {

	constructor() {
		super();
		this.state = {
			userMedia: [],
			commentRequired: "dispNone",
			comment: '',
			comments: [],
			selectedUserId: '',
			userProfile: null
		};
	}
	componentWillMount() {
		this.loadUserMedia();
	}

	loadUserMedia = async () => {
		let data = await fetchUserMedia();
		this.setState({ userMedia: data, userProfile: data[0].user })
	}

	addFavorite = (id) => {
		let items = updateFavoriteItem(this.state.userMedia, id);
		this.setState({
			userMedia: items
		});
	}

	onChangeHandler = (e, id) => {
		let comment = e.target.value;
		this.setState({
			comment: comment,
			selectedUserId: id
		});

	}

	onSearchHandler = (e) => {
		let searchText = e.target.value
		let filterMatchedItems = this.state.userMedia.filter((item) => {
			return item.caption.text.indexOf(searchText) !== -1;
		});
		this.setState({
			userMedia: filterMatchedItems
		});
		if (searchText === '') {
			this.loadUserMedia();
		}
	}

	addCommentHandler = (id) => {
		let { comment } = this.state;
		if (comment.trim() === '') {
			return;
		}
		let items = pushComments(this.state.userMedia, id, comment);
		this.setState({
			comment: "",
			userMedia: items
		});
	}

	timeConverter = (UNIX_timestamp) => {
		var date = new Date(UNIX_timestamp * 1000);
		var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
		var MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
		var yyyy = date.getFullYear();
		var hour = date.getHours();
		var min = date.getMinutes();
		var sec = date.getSeconds();
		var time = dd + '/' + MM + '/' + yyyy + ' ' + hour + ':' + min + ':' + sec;
		return time;
	}

	render() {
		const { classes, history } = this.props;
		let { commentRequired, selectedUserId, userProfile, userMedia } = this.state;
		let profile_picture = null;
		if (userProfile) {
			profile_picture = userProfile.profile_picture
		}

		if (!profile_picture) {
			return <div>Loading....</div>
		}
		return (
			<div>
				<LoggedInHeader profile_picture={profile_picture} history={history} onSearchHandler={this.onSearchHandler.bind(this)} />
				<Container className={classes.root}>
					<Grid container spacing={2} >

						{
							userMedia.map(((user, index) => {
								let text = user.caption.text.split("#");
								let caption = text[0];
								let hashtags = text.splice(1);
								let { comments, user: { username, profile_picture }, created_time } = user;

								return (<Grid item xs={12} sm={6} key={user.id}>
									<Card className={classes.root}>
										<CardHeader
											avatar={
												<Avatar aria-label="recipe" className={classes.avatar}>
													<img src={profile_picture} alt="profile" />
												</Avatar>
											}
											title={username}
											subheader={this.timeConverter(parseInt(created_time))}
										/>

										<CardContent>
											<CardMedia
												className={classes.media}
												image={user.images.standard_resolution.url}
												title="Paella dish"
											/>
											<Typography variant="body2" component="p">
												{caption}
											</Typography>
											{
												hashtags.map((value) => {
													return (<Typography key={"hashtag" + value} variant="body2" component="span" className={classes.hashtag}>
														#{value}
													</Typography>)
												})
											}

										</CardContent>
										<CardActions disableSpacing>
											<IconButton aria-label="add to favorites" onClick={this.addFavorite.bind(this, user.id)}>
												{user.isFavorite ? <FavoriteIcon className={classes.fillColor} /> : <FavoriteBorderIcon />}
											</IconButton>
											<Typography variant="body2" component="p">
												{user.likes.count} likes
											</Typography>
											<br />
										</CardActions>
										<CardContent>
											{
												comments.values && comments.values.map((comment, index) => {
													return (<Typography variant="body2" component="p" key={comment + index + user.id} className={classes.mb16}>
														{username}: &nbsp; {comment}
													</Typography>)
												})
											}
											<br /><br />
											<Grid item xs={12} className={classes.addComment} justify-content="space-between">
												<FormControl className={classes.addCommentFormControl}>
													<InputLabel htmlFor="password"> Add a Comment </InputLabel>
													<Input type="text" onChange={(e) => this.onChangeHandler(e, user.id)} value={selectedUserId === user.id ? this.state.comment : ''} />
													<FormHelperText className={commentRequired}><span className="red">required</span></FormHelperText>
												</FormControl>
												<Button variant="contained" color="primary" onClick={this.addCommentHandler.bind(this, user.id)} className={classes.login__btn}>Add</Button>
											</Grid>
										</CardContent>
									</Card>
								</Grid>)
							}))
						}
					</Grid>
				</Container>
			</div >
		)
	}

}

export default withStyles(useStyles)(Home);
