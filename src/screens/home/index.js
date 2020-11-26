import React, { useState, useEffect, useCallback } from "react";
import "./index.css";
import {formatDate} from '../../common/utilities';
import { getAllMyMedia } from "../../common/api";
import PROFILE_ICON from "../../assets/profile_icon.png";
import { Card, CardContent, Avatar } from "@material-ui/core";
import AppContext from "../../common/app-context";
import { DATA } from "../../common/mock";
import Sample_img from "../../assets/sample_img.png";

const Home = () => {
  const { searchKey } = useCallback(AppContext);
  const [imagesResponse, setImagesResponse] = useState(DATA.data);
  const [filteredData, setFilteredData] = useState(DATA.data);

  useEffect(() => {
    // getAllMyMedia()
    //   .then(res => {
    //     setImagesResponse(res.data || []);
    //   })
    //   .catch(error => {
    //     console.log("get all image error", error);
    //   });
  }, []);

  useEffect(() => {
    if (searchKey) {
      setFilteredData(imagesResponse);
    } else {
      setFilteredData(imagesResponse);
    }
  }, [searchKey]);

  return (
    <div className="home-container">
      {imagesResponse.map((item, index) => {
        return (
          <Card key={index}>
            <CardContent>
              <div className="avatar-container">
                <Avatar src={PROFILE_ICON} />
                <div className="username-date">
                  <span>{item.username}</span>
                  <span>{formatDate(item.timestamp)}</span>
                </div>
              </div>
              <div>
                <img src={Sample_img} />
              </div>
              <div>
                <span>{item.caption}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
export default Home;
