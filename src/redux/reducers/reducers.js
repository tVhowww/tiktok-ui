import { combineReducers } from '@reduxjs/toolkit';
import videoReducer from '../slices/videoSlice';

const rootReducer = combineReducers({
    video: videoReducer,
});

export default rootReducer;
