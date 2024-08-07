import { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import VideoContext from '~/context/VideoContext';
import VideoItem from './VideoItem';
import { VideoModalContextKey } from '~/context/VideoModalContext';

function SuggestVideo({ data = [] }) {
    const { propsVideoModal, setPropsVideoModal, videoModalState } = useContext(VideoModalContextKey);
    const [isVideoModalShow] = videoModalState;

    const [priorityVideo, setPriorityVideo] = useState(-1);

    const videoArrayRef = useRef([]);

    const contextValue = {
        priorityVideoState: [priorityVideo, setPriorityVideo],
        videoArray: videoArrayRef.current,
    };

    useEffect(() => {
        if (isVideoModalShow) {
            const newProps = {
                handlePrevVideo: () => handleScroll('up'),
                handleNextVideo: () => handleScroll('down'),
            };
            Object.assign(propsVideoModal, newProps);
            setPropsVideoModal({ ...propsVideoModal });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVideoModalShow]);

    function handleScroll(type) {
        const firstInViewId = videoArrayRef.current.findIndex((inViewObj) => inViewObj.inView === true);
        const currentVideoId = priorityVideo !== -1 ? priorityVideo : firstInViewId;
        if (currentVideoId === -1) {
            return;
        }
        switch (type) {
            case 'up':
                let prevVideo;
                for (let i = currentVideoId - 1; i >= 0; i--) {
                    const currentVideo = videoArrayRef.current[i];
                    const isDeleted = Boolean(currentVideo?.data?.isDeleted);
                    if (!isDeleted) {
                        prevVideo = currentVideo;
                        break;
                    }
                }
                if (prevVideo) {
                    prevVideo.wrapperIntoView();
                    if (isVideoModalShow) {
                        const newProps = {
                            index: prevVideo.id,
                            data: prevVideo.data,
                        };
                        setPropsVideoModal({ ...propsVideoModal, ...newProps });
                    }
                }
                break;
            default:
                let nextVideo;
                for (let i = currentVideoId + 1; i < videoArrayRef.current.length; i++) {
                    const currentVideo = videoArrayRef.current[i];
                    const isDeleted = Boolean(currentVideo?.data?.isDeleted);
                    if (!isDeleted) {
                        nextVideo = currentVideo;
                        break;
                    }
                }
                if (nextVideo) {
                    nextVideo.wrapperIntoView();
                    if (isVideoModalShow) {
                        const newProps = {
                            index: nextVideo.id,
                            data: nextVideo.data,
                        };
                        setPropsVideoModal({ ...propsVideoModal, ...newProps });
                    }
                }
                break;
        }
    }

    return (
        <VideoContext value={contextValue}>
            {data.map((video, index) => {
                return <VideoItem key={index} videoArray={videoArrayRef.current} videoInfo={video} videoId={index} />;
            })}
        </VideoContext>
    );
}

SuggestVideo.propTypes = {
    data: PropTypes.array.isRequired,
};

export default SuggestVideo;
