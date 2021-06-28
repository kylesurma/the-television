import { createStore, applyMiddleware } from "redux";
import axios from "axios";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk"

const shuffle = (arr) => {
  let m = arr.length;
  while (m) {
    let i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};

const GOT_VIDEOS = 'GOT_VIDEOS'

const gotVideos = (videos) => ({
  type: GOT_VIDEOS,
  videos
})

// THUNK
export const getVideos = () => async (dispatch) => {
  const { data: videos } = await axios.get('./videos')
  dispatch(gotVideos(videos))
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case GOT_VIDEOS: return shuffle(action.videos)
    default: return state
  }
}

const middleware = [
  thunkMiddleware.withExtraArgument({ axios }),
  createLogger({ collapsed: true })
];

export default createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)))
