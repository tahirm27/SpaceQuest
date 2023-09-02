import React from "react";
import starsVideo from "./assets/starsVideo.mp4";

function Background() {
  return (
    <div className="vidbg">
        <div className="overlay"></div>
      <video src={starsVideo} autoPlay loop muted/>
    </div>
  );
}

export default Background;
