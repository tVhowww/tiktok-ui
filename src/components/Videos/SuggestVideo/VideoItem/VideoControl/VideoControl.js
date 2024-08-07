import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { PauseVideoIcon, PlayVideoIcon } from '~/components/Icons';
import Image from '~/components/Image';
import TikTokLoading from '~/components/Loadings/TikTokLoading';
import styles from './VideoControl.module.scss';
import images from '~/assets/images';
import { VideoContextKey } from '~/context/VideoContext';
import { VideoModalContextKey } from '~/context/VideoModalContext';

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

    // State
    const [, setRender] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [defaultStatus, setDefaultStatus] = useState(true);
    const [loading, setLoading] = useState(false);
    const [userInteracting, setUserInteracting] = useState(false);

    const [priorityVideo, setPriorityVideo] = priorityVideoState;

    // inview state

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

    // Functions
    const handleTogglePlayBtn = () => {
        setPlaying(!playing);
        // setUserInteracting(true);

        // Click play btn when video is stoping
        if (!playing) {
            setPriorityVideo(videoId);
        }
    };

    return (
        <div className={cx('player-space', directionVideo.class)}>
            {loading && (
                <span className={cx('video-loading')}>
                    <TikTokLoading medium />
                </span>
            )}
            <div className={cx('default-space')} style={directionVideo.style} onClick={handleOpenVideoModal}>
                <Image
                    className={cx('thumb')}
                    src={thumbUrl}
                    fallback={images.noImage}
                    onLoad={() => setThumbLoaded(true)}
                />
                <video
                    loop
                    className={cx('video', { hidden: defaultStatus })}
                    ref={videoRef}
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
                        <div className={cx('volume-bar')}>
                            <div className={cx('volume-thumb')}></div>
                        </div>
                    </div>

                    <input className={cx('volume-range')} type="range" min="0" max="100" step="1" />
                </div>
                {/* volume muted/unmuted */}
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
