import React, { useState, useEffect, useContext } from "react";
import "./home.css";
import { formatDate } from "../../common/utilities";
import { getAllMyMedia } from "../../common/api";
import PROFILE_ICON from "../../assets/profile_icon.png";
import { Card, CardContent, Avatar, CardHeader } from "@material-ui/core";
import AppContext from "../../common/app-context";
import { DATA } from "../../common/mock";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import Sample_img from "../../assets/sample_img.png";

const Home = () => {
  const { searchKey } = useContext(AppContext);
  const [imagesResponse, setImagesResponse] = useState(DATA.data);
  const [filteredData, setFilteredData] = useState(DATA.data);

  // useEffect(() => {
  //   getAllMyMedia()
  //     .then(res => {
  //       debugger;
  //       setImagesResponse(res.data || []);
  //     })
  //     .catch(error => {
  //       console.log("get all image error", error);
  //     });
  // }, []);

  const mockResponse = response => {
    return response.map(item => {
      if (!item.hashtags) {
        item.hashtags = ["upskill", "greatpeople", "transformation"];
      }
      if (!item.caption) {
        item.caption = "No caption added";
      }

      item.likes = 0;
      return item;
    });
  };

  useEffect(() => {
    debugger;
    if (searchKey) {
      let results = imagesResponse.filter(image =>
        (image.caption || "").includes(searchKey)
      );

      setFilteredData(results);
    } else {
      setFilteredData(imagesResponse);
    }
  }, [searchKey, imagesResponse]);

  const likeHandler = postId => {
    imagesResponse.forEach(item => {
      if (item.id === postId) {
        item.likes++;
      }
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
                    return <span className="hashtag" key={hashtag}>#{hashtag}</span>;
                  })}
              </div>
              <div
                className="likes-container"
                onClick={() => likeHandler(item.id)}
              >
                <FavoriteBorderOutlinedIcon />
                {item.likes && <span>{item.likes} likes</span>}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
export default Home;
