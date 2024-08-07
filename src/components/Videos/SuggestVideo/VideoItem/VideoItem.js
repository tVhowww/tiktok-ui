import { memo, useContext, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './VideoItem.module.scss';
import Button from '~/components/Button';
import Image from '~/components/Image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faMusic } from '@fortawesome/free-solid-svg-icons';
import { VideoModalContextKey } from '~/context/VideoModalContext';
import { VideoContextKey } from '~/context/VideoContext';
import VideoControl from './VideoControl';
// import VideoControl from './VideoControl';
// import InteractiveVideo from './InteractiveVideo';
// import HandleFollow from '~/components/UserInteractive/HandleFollow';

const cx = classNames.bind(styles);

function VideoItem({ videoId, videoInfo }) {
    // Get Modal context value
    const { videoArray, priorityVideoState } = useContext(VideoContextKey);
    const { videoModalState, setPropsVideoModal } = useContext(VideoModalContextKey);
    const [, setPriorityVideo] = priorityVideoState;
    const [, videoModalShow] = videoModalState;

    // State
    const [thumbLoaded, setThumbLoaded] = useState(false);

    // ref
    const wrapperRef = useRef();

    // Get data from video info
    const {
        user: {
            id: userId,
            is_followed,
            avatar: avatarUrl,
            nickname: userName,
            first_name: firstName,
            last_name: lastName,
            tick,
        },
        description,
        music: musicInfo,
    } = videoInfo;

    useLayoutEffect(() => {
        const optionsScroll = {
            block: 'start',
            behavior: 'smooth',
        };

        videoArray[videoId] = {
            id: videoId,
            data: videoInfo,
            wrapperIntoView: wrapperRef.current.scrollIntoView.bind(wrapperRef.current, optionsScroll),
            inView: null,
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Handle open video modal
    const handleOpenVideoModal = () => {
        // if having video priority -> reset about -1
        setPriorityVideo(-1);
        // put the video to the top of inview
        videoArray[videoId].wrapperIntoView();

        const propsVideoModal = {
            index: videoId,
            data: videoInfo,
        };
        setPropsVideoModal(propsVideoModal);
        videoModalShow();
    };

    return (
        <div
            ref={wrapperRef}
            className={cx('wrapper', {
                hidden: videoInfo.isDeleted, // hidden when video is deleted
            })}
        >
            <Link className={cx('big-avatar')} to={'/@' + userName}>
                <Image className={cx('avatar')} src={avatarUrl} />
            </Link>
            <div className={cx('body')}>
                <div className={cx('video-info')}>
                    {/* User info */}
                    <Link className={cx('user-info')} to={'/@' + userName}>
                        <Image className={cx('avatar', 'small-avatar')} src={avatarUrl} />
                        <p className={cx('name')}>
                            <span className={cx('user-name')}>
                                {userName}
                                {tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                            </span>
                            <span className={cx('full-name')}>{`${firstName} ${lastName}`}</span>
                        </p>
                    </Link>

                    {/* Follow btn */}
                    <Button outline medium className={cx('follow-btn')}>
                        Follow
                    </Button>

                    {/* Description  */}
                    <p className={cx('description')}>{description}</p>

                    {/* Music info */}
                    <Link to={'/music'} className={cx('music-info')} target="_blank">
                        <FontAwesomeIcon className={cx('icon-music')} icon={faMusic} />
                        <span>{musicInfo || `Âm thanh trong video!`}</span>
                    </Link>
                </div>

                <div className={cx('video-player')}>
                    {/* Video container */}
                    <VideoControl
                        videoInfo={videoInfo}
                        videoId={videoId}
                        setThumbLoaded={setThumbLoaded}
                        onClick={handleOpenVideoModal}
                    />

                    {/* Interactive container */}
                    {/* {thumbLoaded && (
                        <InteractiveVideo
                            isAuth={isAuth}
                            handleOpenVideoModal={handleOpenVideoModal}
                            videoInfo={videoInfo}
                        />
                    )} */}
                </div>
            </div>
        </div>
    );
}

VideoItem.propTypes = {
    videoId: PropTypes.number,
    videoInfo: PropTypes.object.isRequired,
};

export default memo(VideoItem);
