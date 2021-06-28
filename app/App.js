import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import { useDispatch, useSelector } from "react-redux";
import { getVideos } from "./store";
import separateArray from "../util/separateArray";

const App = () => {
  let firstTimeOn = true;
  const NUM = ["one", "two", "three"];

  const dispatch = useDispatch();
  const allVideos = useSelector((state) => state);
  const [videoClass, setVideoClass] = useState({
    one: "video-ready",
    two: "video-ready",
    three: "video-ready",
  });
  const [videoId, setVideoId] = useState({});

  const [isOn, setIsOn] = useState(false);
  const [visibilityState, setVisibilityState] = useState(0);
  const [isPlaying, setIsPlaying] = useState({
    one: true,
    two: true,
    three: true,
  });

  useEffect(() => {
    dispatch(getVideos());
    return () => {};
  }, []);

  // const opts = {
  //   height: "390",
  //   width: "640",
  //   playerVars: {
  //     // https://developers.google.com/youtube/player_parameters
  //     autoplay: 1,
  //     controls: 0,
  //   },
  // };

  const config = {
    youtube: {
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
        controls: 0,
        preload: true,
      },
    },
  };

  // screen res. Aspect ratio: 4:3
  const width = "800px";
  const height = "600px";

  const handlePowerToggle = () => {
    if (!isOn) {
      handleVisibility(visibilityState);
      setIsPlaying({ ...isPlaying, [NUM[visibilityState]]: true });
      if (firstTimeOn) {
        const videoPlaylists = separateArray(allVideos);
        setVideoId({
          one: videoPlaylists[0],
          two: videoPlaylists[1],
          three: videoPlaylists[2],
        });
        firstTimeOn = false;
      }
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

  const _onReady = (event) => {
    console.log(event);
  };

  const _onEnd = (videoNum) => {
    console.log(videoNum);
    switch (videoNum) {
      case 0: {
        setIsPlaying({ ...isPlaying, two: true });
        handleVisibility(1);
        break;
      }
      case 1: {
        setIsPlaying({ ...isPlaying, three: true });
        handleVisibility(2);
        break;
      }
      case 2: {
        setIsPlaying({ ...isPlaying, one: true });
        handleVisibility(0);
        break;
      }
      default:
        console.log("error");
    }
    setVisibilityState((videoNum + 1) % 3);
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

  const _onBufferEnd = (id) => {
    if (videoClass[id] === "video-ready") {
      console.log("hit", id);
      setIsPlaying({ ...isPlaying, [id]: false });
    }
  };

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

  const _onPlay = (e) => {
    console.log('onPay', e)
  }

  return (
    <>
    <div className="container">
      <span className="video-off"></span>
      <div className={videoClass.one}>
        <ReactPlayer
          url={videoId.one}
          playing={isPlaying.one}
          controls={false}
          config={config}
          onReady={_onReady}
          onEnded={() => _onEnd(0)}
          onBufferEnd={() => _onBufferEnd("one")}
          onError={_onError}
          height={height}
          width={width}

        />
      </div>
      <div className={videoClass.two}>
        <ReactPlayer
          url={videoId.two}
          playing={isPlaying.two}
          controls={false}
          config={config}
          onReady={_onReady}
          onEnded={() => _onEnd(1)}
          onBufferEnd={() => _onBufferEnd("two")}
          onError={_onError}
          height={height}
          width={width}

        />
      </div>
      <div className={videoClass.three}>
        <ReactPlayer
          url={videoId.three}
          playing={isPlaying.three}
          controls={false}
          config={config}
          onReady={_onReady}
          onEnded={() => _onEnd(2)}
          onBufferEnd={() => _onBufferEnd("three")}
          onError={_onError}
          height={height}
          width={width}
        />
      </div>
      <img className='glass' style={{ width: "800px" }} src='./glass.png' />
      <img className='tv' style={{ width: "800px" }} src="./crt.png">
      </img>
      <span onClick={handlePowerToggle}className='power-button' />
      {/*<YouTube
        id="video-one"
        className={videoClass.one}
        videoId={videoId.one}
        onEnd={_onEnd}
        opts={opts}
        onReady={_onReady}
        onStateChange={_onStateChange}
      />
      <YouTube id='video-two' className={videoClass.two} videoId={videoId.two} onEnd={_onEnd} opts={opts}  onReady={_onReady}/>
      <YouTube id='video-three' className={videoClass.three} videoId={videoId.three} onEnd={_onEnd} opts={opts} onReady={_onReady} />*/}
    </div>
    </>
  );
};

export default App;
