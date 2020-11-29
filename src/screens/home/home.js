import React, { useState, useEffect, useContext } from "react";
import "./home.css";
import { formatDate } from "../../common/utilities";
import { getAllMyMedia } from "../../common/api";
import PROFILE_ICON from "../../assets/profile_icon.png";
import {
  Card,
  CardContent,
  Avatar,
  CardHeader,
  Button,
  FormControl,
  Input,
  InputLabel
} from "@material-ui/core";
import AppContext from "../../common/app-context";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";

const Home = () => {
  const { searchKey } = useContext(AppContext);
  const [imagesResponse, setImagesResponse] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [comments, setComments] = useState({});

  useEffect(() => {
    getAllMyMedia()
      .then(res => {
        setImagesResponse(mockResponse(res.data || []));
      })
      .catch(error => {
        console.log("get all image error", error);
      });
  }, []);

  const mockResponse = response => {
    return response.map(item => {
      if (!item.hashtags) {
        item.hashtags = ["upskill", "greatpeople", "transformation"];
      }
      if (!item.caption) {
        item.caption = "No caption added";
      }

      if (!item.comments) {
        item.comments = [];
      }
      if (!item.likes) {
        item.likes = Math.floor(Math.random() * 10);
      }

      return item;
    });
  };

  useEffect(() => {
    if (searchKey) {
      let results = imagesResponse.filter(image =>
        (image.caption || "").includes(searchKey)
      );

      setFilteredData(results);
    } else {
      setFilteredData(imagesResponse);
    }
  }, [imagesResponse]);

  const likeHandler = postId => {
    imagesResponse.forEach(item => {
      if (item.id === postId) {
        if (item.likedByme) {
          item.likes--;
          item["likedByme"] = false;
        } else {
          item.likes++;
          item["likedByme"] = true;
        }
      }
    });
    setImagesResponse([...imagesResponse]);
  };

  const commentHandler = postId => {
    debugger;
    imagesResponse.forEach(item => {
      debugger;
      if (item.id === postId) {
        item.comments.push({
          username: item.username,
          comment: comments[postId]
        });
      }
    });
    setComments({
      ...comments,
      [postId]: ""
    });
    setImagesResponse([...imagesResponse]);
  };

  return (
    <div className="home-container">
      {filteredData.map(item => {
        return (
          <Card key={item.id}>
            <CardHeader
              avatar={<Avatar src={PROFILE_ICON} />}
              title={item.username}
              subheader={formatDate(item.timestamp)}
            />
            <CardContent>
              <div>
                <img src={item.media_url} />
              </div>
              <div>
                <span>{item.caption || "   "}</span>
              </div>
              <div>
                {item.hashtags &&
                  item.hashtags.map(hashtag => {
                    return (
                      <span className="hashtag" key={hashtag}>
                        #{hashtag}
                      </span>
                    );
                  })}
              </div>
              <div
                className="likes-container"
                onClick={() => likeHandler(item.id)}
              >
                {item.likedByme ? (
                  <FavoriteIcon style={{ color: "red" }} />
                ) : (
                  <FavoriteBorderOutlinedIcon />
                )}
                {item.likes && <span>{item.likes} likes</span>}
              </div>
              <div>
                {item.comments.map((comment, index) => {
                  return (
                    <div key={index}>
                      <strong>{comment.username}</strong>:
                      <span>{comment.comment}</span>
                    </div>
                  );
                })}
              </div>
              <div className="comments-container">
                <FormControl fullWidth={true}>
                  <InputLabel htmlFor="my-input">Add comment</InputLabel>
                  <Input
                    type="text"
                    id="my-input"
                    value={comments[item.id] || ""}
                    onChange={event => {
                      setComments({
                        ...comments,
                        [item.id]: event.target.value
                      });
                    }}
                    aria-describedby="my-helper-text"
                  />
                </FormControl>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth={false}
                  onClick={() => commentHandler(item.id)}
                >
                  ADD
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
export default Home;
