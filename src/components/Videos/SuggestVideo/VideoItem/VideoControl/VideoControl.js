import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faVolumeHigh, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import { PauseVideoIcon, PlayVideoIcon } from '~/components/Icons';
import Image from '~/components/Image';
import TikTokLoading from '~/components/Loadings/TikTokLoading';
import styles from './VideoControl.module.scss';
import images from '~/assets/images';
import { VideoContextKey } from '~/context/VideoContext';
import { VideoModalContextKey } from '~/context/VideoModalContext';
import { useInView } from '~/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { changeMuted, changeVolume, toggleMuted } from '~/redux/slices/videoSlice';

const cx = classNames.bind(styles);
function VideoControl({ videoId, videoInfo, setThumbLoaded, onClick: handleOpenVideoModal }) {
    const {
        thumb_url: thumbUrl,
        file_url: videoUrl,
        meta: {
            video: { resolution_x: videoWidth, resolution_y: videoHeight },
        },
    } = videoInfo;

    const directionVideo = useMemo(() => {
        const directionVideo = {
            style: {},
        };

        directionVideo.class = videoWidth - videoHeight < 0 ? 'vertical' : 'horizontal';

        if (directionVideo.class === 'vertical') {
            const percent = (videoWidth / videoHeight) * 100;

            const heightPercent = (100 / percent) * 100;
            directionVideo.style['--height-data'] = heightPercent;

            directionVideo.style.width = `calc(var(--size-data) / 100 * ${percent})`;
        } else {
            const percent = (videoHeight / videoWidth) * 100;
            directionVideo.style.height = `calc(var(--size-data) / 100 * ${percent})`;
        }

        return directionVideo;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoInfo]);

    const { videoArray, priorityVideoState } = useContext(VideoContextKey);
    const { videoModalState } = useContext(VideoModalContextKey);
    const [isVideoModalShow] = videoModalState;

    // Redux state
    const dispatch = useDispatch();
    const { volume, muted } = useSelector((state) => state.video);

    // State
    const [, setRender] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [defaultStatus, setDefaultStatus] = useState(true);
    const [loading, setLoading] = useState(false);
    const [userInteracting, setUserInteracting] = useState(false);

    const [priorityVideo, setPriorityVideo] = priorityVideoState;

    // inview state
    const [inViewRef, isInView] = useInView({ threshold: 0.5 });

    // ref
    const videoRef = useRef(null);
    const volumeBarRef = useRef(null);
    const volumeThumbRef = useRef(null);

    useEffect(() => {
        videoArray[videoId].update = setRender;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        playing && setDefaultStatus(false);
        playing
            ? videoRef.current.play().catch((err) => {
                  err.code !== 20 && console.error(err);
              })
            : videoRef.current.pause();
    }, [playing]);

    useEffect(() => {
        const volumeValid = valueValidate(volume, 0, 1);
        videoRef.current.volume = volumeValid;
    }, [volume]);

    useEffect(() => {
        videoRef.current.muted = muted;
    }, [muted]);

    useEffect(() => {
        const volumeValid = valueValidate(volume, 0, 1);

        if (muted) {
            volumeBarRef.current.style.width = '0%';
            volumeThumbRef.current.style.transform = 'translate(100%, -50%)';
        } else {
            // update UI
            let percent = volumeValid * 100;

            volumeBarRef.current.style.width = percent + '%';
            volumeThumbRef.current.style.transform = `translate(${100 - percent}%, -50%)`;
        }
    }, [volume, muted]);

    useEffect(() => {
        updateInViewArr();

        if (!isInView) {
            handleResetVideo();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInView]);

    useEffect(() => {
        userInteracting && window.addEventListener('scroll', handleRemoveInteractive);

        return () => {
            userInteracting && window.removeEventListener('scroll', handleRemoveInteractive);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInteracting]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if ((priorityVideo !== -1 && videoId !== priorityVideo) || isVideoModalShow) {
            playing && handleResetVideo();
            return;
        }
        if (isInView && !userInteracting) {
            const activeId = findFirstInViewId();
            videoId === activeId ? setPlaying(true) : handleResetVideo();
        }
    });

    // Functions

    const handleTogglePlayBtn = () => {
        setPlaying(!playing);
        setUserInteracting(true);

        // Click play btn when video is stopping
        if (!playing) {
            setPriorityVideo(videoId);
        }
    };

    const findFirstInViewId = () => {
        const firstInViewId = videoArray.findIndex((obj) => obj?.inView === true);
        return firstInViewId;
    };

    const updateInViewArr = () => {
        videoArray[videoId].inView = isInView;

        for (let i = videoId + 1; i < videoArray.length; i++) {
            const isDeleted = videoArray[i]?.data?.isDeleted;

            if (videoArray[i]?.update && !isDeleted) {
                videoArray[i].update((prev) => !prev);
                break;
            }
        }
    };

    const handleRemoveInteractive = () => {
        setTimeout(() => {
            const activeId = findFirstInViewId();

            videoId !== activeId ? handleResetVideo() : setUserInteracting(false);

            setPriorityVideo(-1);
        }, 250);

        // remove this event right after first run
        window.removeEventListener('scroll', handleRemoveInteractive);
    };

    const handleResetVideo = () => {
        // Reload video and set the states to default
        videoRef.current.load();
        setPlaying(false);
        setDefaultStatus(true);
        setUserInteracting(false);
    };

    const handleVolumeBtn = () => {
        dispatch(toggleMuted());
    };

    const valueValidate = (value, min, max) => {
        let valueValid = value;

        if (valueValid > max) {
            valueValid = max;
        } else if (valueValid < min) {
            valueValid = min;
        }

        return valueValid;
    };

    const handleVolumeChange = (e) => {
        const value = +e.target.value;
        const valueValid = valueValidate(value, 0, 100);

        // Update UI volume bar
        volumeBarRef.current.style.width = valueValid + '%';
        volumeThumbRef.current.style.transform = `translate(${100 - valueValid}%, -50%)`;

        // Set volume of video
        videoRef.current.volume = valueValid / 100;

        valueValid === 0 && !muted && dispatch(changeMuted(true));
        valueValid > 0 && muted && dispatch(changeMuted(false));
    };

    const handleSetVolume = (e) => {
        const value = +e.target.value;
        const valueValid = valueValidate(value, 0, 100);

        const action = changeVolume(valueValid / 100);
        dispatch(action);
    };

    return (
        <div className={cx('player-space', directionVideo.class)}>
            {loading && playing && (
                <span className={cx('video-loading')}>
                    <TikTokLoading medium />
                </span>
            )}
            <div className={cx('default-space')} style={directionVideo.style} onClick={handleOpenVideoModal}>
                <Image
                    className={cx('thumb')}
                    src={thumbUrl}
                    ref={inViewRef}
                    fallback={images.noImage}
                    onLoad={() => setThumbLoaded(true)}
                />
                <video
                    ref={videoRef}
                    className={cx('video', { hidden: defaultStatus })}
                    loop
                    onWaiting={() => setLoading(true)}
                    onPlaying={() => setLoading(false)}
                >
                    <source src={videoUrl} />
                </video>
            </div>

            {/* Control */}
            <button className={cx('control', 'report-btn')}>
                <FontAwesomeIcon icon={faFlag} />
                <span>Báo cáo</span>
            </button>

            {/* Icon play/pause */}
            <button className={cx('control', 'play-control')} onClick={handleTogglePlayBtn}>
                {playing ? (
                    <span className={cx('toggle-video-btn')}>
                        <PlayVideoIcon />
                    </span>
                ) : (
                    <span className={cx('toggle-video-btn')}>
                        <PauseVideoIcon />
                    </span>
                )}
            </button>

            {/* Volume icon */}
            <div className={cx('volume-container')}>
                <div className={cx('volume-control')}>
                    <div className={cx('volume-background')}>
                        <div className={cx('volume-bar')} ref={volumeBarRef}>
                            <div className={cx('volume-thumb')} ref={volumeThumbRef}></div>
                        </div>
                    </div>

                    <input
                        className={cx('volume-range')}
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        onChange={handleVolumeChange}
                        onMouseUp={handleSetVolume}
                    />
                </div>

                <button className={cx('control', 'volume-btn', { mute: muted })} onClick={handleVolumeBtn}>
                    {muted ? (
                        <FontAwesomeIcon className={cx('volume-icon')} icon={faVolumeMute} />
                    ) : (
                        <FontAwesomeIcon className={cx('volume-icon')} icon={faVolumeHigh} />
                    )}
                </button>
            </div>
        </div>
    );
}

VideoControl.propTypes = {
    videoId: PropTypes.number.isRequired,
    videoInfo: PropTypes.object.isRequired,
    setThumbLoaded: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default VideoControl;
