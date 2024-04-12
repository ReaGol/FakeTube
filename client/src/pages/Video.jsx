import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ReplyIcon from "@mui/icons-material/Reply";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Comments from "../components/Comments";
// import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchSuccess, fetchStart, fetchFailure } from "../redux/videoSlice";
import { format } from "timeago.js";
import axios from "axios";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Recommendation = styled.div`
  flex: 2;
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;
const Image = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;
const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;
const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100px;
  object-fit: cover;
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();

// const pathParts = useLocation().pathname.split("/");
// const path = pathParts.length > 2 ? pathParts[2] : null;

 const path = useLocation().pathname.split("/")[2];


  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchStart());
        const videoRes = await axios.get(
          `http://localhost:8800/api/videos/find/${path}`
        );
        const channelRes = await axios.get(
          `http://localhost:8800/api/users/find/${videoRes.data.userId}`
        );
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {
        console.error(
          "Failed to fetch video: ",
          err.response ? err.response.data : err
        );
        dispatch(fetchFailure());
      }
    };
    fetchData();
  }, [path, dispatch]);


  //  const handleLike = async () => {
  //    try {
  //      const response = await axios.put(
  //        `http://localhost:8800/api/users/like/${currentVideo._id}`,
  //        {},
  //       //  {
  //       //    withCredentials: true,
  //       //  }
  //      );
  //      dispatch(like(currentUser._id))
  //      console.log(response.data);
  //    } catch (error) {
  //      console.error(
  //        "Failed to like the video:",
  //        error.response ? error.response.data : error
  //      );
  //    }
  //  };

  //  const handleDislike = async () => {
  //    try {
  //      const response = await axios.put(
  //        `http://localhost:8800/api/users/dislike/${currentVideo._id}`,
  //        {},
  //       //  {
  //       //    withCredentials: true,
  //       //  }
  //      );
  //      dispatch(dislike(currentUser._id));
  //      console.log(response.data);
  //    } catch (error) {
  //      console.error(
  //        "Failed to dislike the video:",
  //        error.response ? error.response.data : error
  //      );
  //    }
  //  };

  const handleLike = async () => {
    await axios.put(`http://localhost:8800/api/users/like/${currentVideo._id}`);
    dispatch(like(currentUser._id));
  };
  const handleDislike = async () => {
    await axios.put(
      `http://localhost:8800/api/users/dislike/${currentVideo._id}`
    );
    dispatch(dislike(currentUser._id));
  };

  const handleSub = async () => {
    currentUser.subscribedUsers.includes(channel._id)
      ? await axios.put(`http://localhost:8800/api/users/unsub/${channel._id}`)
      : await axios.put(`http://localhost:8800/api/users/sub/${channel._id}`);
    dispatch(subscription(channel._id));
    console.log(currentUser);
  }

  return (
    <Container>
      {currentVideo && (
        <Content>
          <VideoWrapper>
            <VideoFrame src={currentVideo.videoUrl}></VideoFrame>
          </VideoWrapper>
          <Title>{currentVideo?.title}</Title>
          <Details>
            <Info>
              {currentVideo.views} views • {format(currentVideo.createdAt)}
            </Info>
            <Buttons>
              <Button onClick={handleLike}>
                {currentVideo.likes?.includes(currentUser._id) ? (
                  <ThumbUpAltIcon />
                ) : (
                  <ThumbUpOffAltIcon />
                )}{" "}
                {currentVideo.likes?.length}
              </Button>
              <Button onClick={handleDislike}>
                {currentVideo.dislikes?.includes(currentUser._id) ? (
                  <ThumbDownAltIcon />
                ) : (
                  <ThumbDownOffAltIcon />
                )}{" "}
                Dislike
              </Button>
              <Button>
                <ReplyIcon style={{ transform: "scale(-1, 1)" }} /> Share
              </Button>
              <Button>
                <PlaylistAddIcon /> Save
              </Button>
            </Buttons>
          </Details>
          <Hr />
          <Channel>
            <ChannelInfo>
              <Image src={channel.img} />
              <ChannelDetail>
                <ChannelName>{channel.name}</ChannelName>
                <ChannelCounter>
                  {channel.subscribers} subscribers
                </ChannelCounter>
                <Description>{currentVideo?.desc}</Description>
              </ChannelDetail>
            </ChannelInfo>
            <Subscribe onClick={handleSub}>
              {currentUser.subscribedUsers?.includes(channel._id)
                ? "SUBSCRIBED"
                : "UNSUBSCRIBED"}
            </Subscribe>
          </Channel>
          <Hr />
          <Comments videoId={currentVideo._id}/>
        </Content>
      )}
    </Container>
  );
};

export default Video;
