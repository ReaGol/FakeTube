import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({type}) => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/videos/${type}`);
        setVideos(res.data);
        console.log(videos);
      } catch (error) {
        setError(error);
      }
    };

    fetchVideos();
  }, [type]);

  return (
    <Container>
      {videos?.map((video)=>(
        <Card key={video._id} video={video}/>
      ))}
    </Container>
  );
};

export default Home;
