import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { Row } from "reactstrap";

const TrainingCategory = () => {
  const [videos, setVideos] = useState([]);
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `http://localhost:4000/api/videos/${params.category}`
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
              <div
                className="card bg-secondary"
                key={video._id}
                type="submit"
              >
                
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
};
export default TrainingCategory;
