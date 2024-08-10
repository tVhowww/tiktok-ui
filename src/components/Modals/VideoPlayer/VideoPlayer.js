import PropTypes from 'prop-types';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './VideoPlayer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faXmark } from '@fortawesome/free-solid-svg-icons';
import { PauseVideoIcon } from '~/components/Icons';
import TikTokLoading from '~/components/Loadings/TikTokLoading';

const cx = classNames.bind(styles);

function VideoPlayer({ index, data = {}, handleClose, handlePrevVideo, handleNextVideo, isDeleted }) {
    // Get video data
    const { thumb_url: thumbUrl, file_url: videoUrl } = data;

    // This Component's State
    const [playing, setPlaying] = useState(true);
    const [videoStart, setVideoStart] = useState(false);
    const [loading, setLoading] = useState(false);

    // const [currentTime, setCurrentTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    // const [progressValue, setProgressValue] = useState(0);

    // Ref
    const videoRef = useRef();
    // const volumeBarRef = useRef();
    // const volumeDotRef = useRef();

    // When the video has been deleted
    useLayoutEffect(() => {
        if (isDeleted) {
            setPlaying(false);
            handleNextVideo();
            return;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDeleted]);

    useEffect(() => {
        playing
            ? videoRef.current.play().catch((err) => {
                  err.code !== 20 && console.error(err);
              })
            : videoRef.current.pause();
    }, [playing]);

    const togglePlay = () => {
        // Nếu video đã xóa thì không làm gì cả
        if (isDeleted) {
            return;
        }
        setPlaying(!playing);
    };

    const handleVideoStart = () => {
        !videoStart && setVideoStart(true);
    };

    // const handleClickPrev = (e) => {
    //     e.stopPropagation();
    //     handlePrevVideo();
    // };

    // const handleClickNext = (e) => {
    //     e.stopPropagation();
    //     handleNextVideo();
    // };

    return (
        <div className={cx('video-player')} onClick={togglePlay}>
            <p className={cx('video__background')} style={{ backgroundImage: `url('${thumbUrl}')` }}></p>

            {/* Video container */}
            <div className={cx('video__space')}>
                <img className={cx({ hidden: videoStart })} src={thumbUrl} alt="" />
                <video
                    src={videoUrl}
                    ref={videoRef}
                    loop
                    onCanPlay={handleVideoStart}
                    onWaiting={() => setLoading(true)}
                    onPlaying={() => setLoading(false)}
                    onLoadedData={(e) => {
                        const totalTime = e.target.duration;
                        setTotalTime(totalTime);
                    }}
                ></video>
            </div>

            {/* Close btn */}
            <button className={cx('btn', 'close-btn')} onClick={() => handleClose('back')}>
                <FontAwesomeIcon icon={faXmark} />
            </button>

            {/* Report btn */}
            <button
                className={cx('btn', 'report-btn')}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <FontAwesomeIcon icon={faFlag} style={{ marginRight: 4, fontSize: '16px' }} />
                Báo cáo
            </button>

            {!playing && !isDeleted && (
                <span className={cx('play-icon')}>
                    <PauseVideoIcon width="7rem" height="7rem" />
                </span>
            )}

            {loading && <TikTokLoading medium />}
        </div>
    );
}

VideoPlayer.propTypes = {
    index: PropTypes.number,
    data: PropTypes.object,
    handleClose: PropTypes.func,
    handlePrevVideo: PropTypes.func,
    handleNextVideo: PropTypes.func,
};

export default VideoPlayer;
