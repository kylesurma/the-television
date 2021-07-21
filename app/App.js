import EntryScreen from "./EntryScreen";
import React, { useState, useEffect,  } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { getVideos } from "./store";
import separateArray from "../util/separateArray";
import NewWindow from "react-new-window";

const App = () => {
  const NUM = ["one", "two", "three"];

  const dispatch = useDispatch();
  const allVideos = useSelector((state) => state);
  const [videoClass, setVideoClass] = useState({
    one: "video-ready",
    two: "video-ready",
    three: "video-ready",
  });
  const [videoId, setVideoId] = useState({});
  const [videoIdx, setVideoIdx] = useState(3)
  const [ready, isReady] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [visibilityState, setVisibilityState] = useState(0);
  const [isPlaying, setIsPlaying] = useState({
    one: true,
    two: true,
    three: true,
  });

  const config = {
    youtube: {
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        controls: 1,
        loop:false
      },
    },
  };

  // screen res. Aspect ratio: 4:3
  const width = "800px";
  const height = "600px";

  useEffect(() => {
    dispatch(getVideos());
  }, [visibilityState]);

  const coldLoad = () => {
    // const videoPlaylists = separateArray(allVideos);
    setVideoId({
      one: allVideos[0].videoId,
      two: allVideos[1].videoId,
      three: allVideos[2].videoId,
    });
  };

  const handlePowerToggle = () => {
    if (!isOn) {
      handleVisibility(visibilityState);
      setIsPlaying({ ...isPlaying, [NUM[visibilityState]]: true });
    } else {
      setVideoClass({
        one: "video-ready",
        two: "video-ready",
        three: "video-ready",
      });
      setIsPlaying({ one: false, two: false, three: false });
    }
    setIsOn(!isOn);
  };

  const handleVisibility = (num) => {
    switch (num) {
      case 0: {
        setVideoClass({
          one: "video-on",
          two: "video-ready",
          three: "video-ready",
        });
        break;
      }
      case 1: {
        setVideoClass({
          one: "video-ready",
          two: "video-on",
          three: "video-ready",
        });
        break;
      }
      case 2: {
        setVideoClass({
          one: "video-ready",
          two: "video-ready",
          three: "video-on",
        });
        break;
      }
      default:
        console.log("error");
      }
    };

      const _onReady = (event) => {
        console.log(event);
      };

      const _onEnded = (videoNum) => {
        console.log("on-end", videoNum);
        const nextUp = (videoNum + 1) % 3
        setIsPlaying({ ...isPlaying, [NUM[nextUp]]: true})
        setVideoId({...videoId, [NUM[videoNum]]: allVideos[videoIdx].videoId})
        handleVisibility(nextUp)
        setVisibilityState(nextUp)
        setVideoIdx(videoIdx + 1)
      };

  const _onBufferEnd = (id) => {
    console.log("endBuffer", id);
    if (videoClass[id] === "video-ready") {
      console.log("hit", id);
      setIsPlaying({ ...isPlaying, [id]: false });
    }
  };

  const _onBuffer = (id) => {
    console.log('buffering', id)
  }

  const _onError = (e) => {
    console.log(e);
    console.log("error");
  };

  //   const _onProgress = (event, id, next) => {
  //     console.log(event, isPlaying[next] === false)
  //     if (event.played > .96 && isPlaying[next] === false) {
  //       switch (id) {
  //       case 'one': {
  //         setIsPlaying({ ...isPlaying, two: true });
  //         setVideoClass({...videoClass, two: 'video-set'})
  //         break;
  //       }
  //       case 'two': {
  //         setIsPlaying({ ...isPlaying, three: true });
  //         setVideoClass({...videoClass, three: 'video-set'})
  //         break;
  //       }
  //       case 'three': {
  //         setIsPlaying({ ...isPlaying, one: true });
  //         setVideoClass({...videoClass, three: 'video-set'})
  //         break;
  //       }
  //       default:
  //         console.log("error");
  //     }
  //   }
  // }

  return (
    <>
      <EntryScreen isReady={isReady} coldLoad={coldLoad} />
      {!ready ? (
        <div></div>
      ) : (
        <div className="container">
          <span className="video-off"></span>
          <div className={videoClass.one}>
            <ReactPlayer
              url={videoId.one}
              playing={isPlaying.one}
              controls={false}
              config={config}
              onReady={_onReady}
              onEnded={() => _onEnded(0)}
              onBufferEnd={() => _onBufferEnd("one")}
              onBuffer={() => _onBuffer("one")}
              onError={_onError}
              height={height}
              width={width}
              loop={false}
            />
          </div>
          <div className={videoClass.two}>
            <ReactPlayer
              url={videoId.two}
              playing={isPlaying.two}
              controls={false}
              config={config}
              onReady={_onReady}
              onEnded={() => _onEnded(1)}
              onBufferEnd={() => _onBufferEnd("two")}
              onBuffer={() => _onBuffer("two")}
              onError={_onError}
              height={height}
              width={width}
              loop={false}
            />
          </div>
          <div className={videoClass.three}>
            <ReactPlayer
              url={videoId.three}
              playing={isPlaying.three}
              controls={false}
              config={config}
              onReady={_onReady}
              onEnded={() => _onEnded(2)}
              onBufferEnd={() => _onBufferEnd("three")}
              onBuffer={() => _onBuffer("three")}
              onError={_onError}
              height={height}
              width={width}
              loop={false}
            />
          </div>
          <img className="glass" style={{ width: "800px" }} src="./glass.png" />
       <img className="tv" style={{ width: "800px" }} src="./crt.png"></img>
          <span onClick={handlePowerToggle} className="power-button" />
        </div>
      )}
    </>
  );
};

export default App;
