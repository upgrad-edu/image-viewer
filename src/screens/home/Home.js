import React, {Component} from 'react';
import Header from "../../common/Header";
import "./Home.css";
import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardHeader,
    FormControl,
    Input,
    InputLabel
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePicture: "",
            images: [],
            filteredImages: [],
            isLiked: false
        };
    }

    filteredData = expression => {
        const {images} = this.state;
        if (images) {
            const result = images.filter(image =>
                image.caption.text.includes(expression)
            );
            this.setState({filteredImages: result});
        }
    };

    onLike = id => {
        const {filteredImages} = this.state;
        const likedImage = filteredImages.filter(image => image.id === id);
        filteredImages.map(image => {
            const returnVal = {...image};
            if (image.id === likedImage.id) {
                returnVal["isLiked"] = true;
            }
            return returnVal;
        });
    };

    getDateFromDateConverter = timeStamp => {
        let newDate = new Date(timeStamp);
        let seconds = newDate.getSeconds();
        let minutes = newDate.getMinutes();
        let hour = newDate.getHours();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        hour %= 12;
        hour = hour || 12;
        minutes = 10 > minutes ? "0" + minutes : minutes;
        date = date >= 10 ? date : "0" + date;
        month = month < 10 ? "0" + month : month;
        let time = hour + ":" + minutes + ":" + seconds;
        let timeAndDate = {
            time: time,
            slashSeparatedDate: date + "/" + month + "/" + year.toString()
        };
        return timeAndDate.slashSeparatedDate + " " + timeAndDate.time;
    };

    componentDidMount() {
        const accessToken = sessionStorage.getItem('accessToken');
        if (accessToken) {
            fetch(`https://api.instagram.com/v1/users/self/?access_token=${accessToken}`)
                .then(results => results.json())
                .then(result => {
                    if (result.data) {
                        const {profile_picture} = result.data;
                        this.setState({profilePicture: profile_picture});
                    }
                });
            fetch(`https://api.instagram.com/v1/users/self/media/recent?access_token=${accessToken}`)
                .then(results => results.json())
                .then(result => {
                    if (result.data) {
                        const imagesInfo = result.data;
                        this.setState({images: imagesInfo, filteredImages: imagesInfo});
                    }
                });
        } else {
            window.location = '/';
        }
    }

    render() {
        const {profilePicture, filteredImages} = this.state;
        return <React.Fragment>
            <Header isHomePageHeaderEnabled={true} url={profilePicture} onFilter={this.filteredData}/>
            <div className='cardContainer'>
                {
                    !filteredImages || filteredImages.length <= 0 ? null : filteredImages.map(image => (
                        <Card className='card' key={image.id}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label='recipe'>
                                        <img src={image.user.profile_picture} className='profilePicture' alt='userPic'/>
                                    </Avatar>
                                }
                                title={image.user.username}
                                subheader={this.getDateFromDateConverter(Number(image.created_time))}
                            />
                            <CardContent>
                                <div className='cardContent'>
                                    <img src={image.images.standard_resolution.url} className='post' alt='postPicture'/>
                                    <hr/>
                                    <div className='caption'>{image.caption.text}</div>
                                    {
                                        image.tags ? image.tags.map(tag => (
                                            <span key={tag} className='tag'>#{tag}&nbsp;</span>)) : null
                                    }
                                    {
                                        !image.isUserLikedPost ?
                                            <p className='likes'>
                                                <FavoriteBorderIcon onClick={() => this.onLike(image.id)}
                                                                    className='likesIcon'/>
                                                <span className='numberOfLikes'>&nbsp;{image.likes.count} likes</span>
                                            </p> :
                                            <p className='likes'>
                                                <FavoriteIcon onClick={() => this.onLike(image.id)}
                                                              className='likesIcon' color='error'/>
                                                <span
                                                    className='numberOfLikes'>&nbsp;{image.likes.count + 1} likes</span>
                                            </p>
                                    }
                                    <FormControl className='commentForm' fullWidth={true} margin='normal'>
                                        <InputLabel htmlFor='comment'>Add a comment</InputLabel>
                                        <Input className='inputComment'/>
                                        <Button variant='contained' color='primary'>ADD</Button>
                                    </FormControl>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                }
            </div>
        </React.Fragment>
    }
}