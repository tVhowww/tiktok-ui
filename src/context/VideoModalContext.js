import { createContext } from 'react';
import PropTypes from 'prop-types';
import { useVideoModal } from '~/hooks';
import { VideoModal } from '~/components/Modals';

export const VideoModalContextKey = createContext();

function VideoModalContext({ children }) {
    const { VideoModalComponent, videoModalState, propsVideoModal, setPropsVideoModal } = useVideoModal(VideoModal);
    const contextValue = { videoModalState, propsVideoModal, setPropsVideoModal };

    return (
        <VideoModalContextKey.Provider value={contextValue}>
            {children}
            <VideoModalComponent />
        </VideoModalContextKey.Provider>
    );
}

VideoModalContext.propTypes = {
    children: PropTypes.node.isRequired,
};

export default VideoModalContext;
