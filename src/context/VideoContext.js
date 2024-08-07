import { createContext } from 'react';
import PropTypes from 'prop-types';

export const VideoContextKey = createContext();

function VideoContext({ children, value }) {
    return <VideoContextKey.Provider value={value}>{children}</VideoContextKey.Provider>;
}

VideoContext.propTypes = {
    children: PropTypes.node.isRequired,
};

export default VideoContext;
