import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Row } from "reactstrap";

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const params = useParams();

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `https://sanuco-back-end-uxuex.ondigitalocean.app/api/videos/search/${params.type}`
      );
      setVideos(res.data);
    })();
  });

  return (
    <>
      <div className="content">
        <Row>
          {videos.map((video) => (
            <div className="col-md-6 p-6">
              <div className="card bg-secondary" key={video._id} type="submit">
                <ReactPlayer
                  width="500px"
                  height="300px"
                  controls
                  url={video.url}
                />
                <div className="card-body">
                  <h3>{video.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </Row>
      </div>
    </>
  );
}
