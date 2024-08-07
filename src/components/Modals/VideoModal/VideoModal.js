import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faMusic } from '@fortawesome/free-solid-svg-icons';
import Image from '~/components/Image';
import styles from './VideoModal.module.scss';

const cx = classNames.bind(styles);

function VideoModal(props) {
    const { data = {}, handleClose } = props;
    const {
        id: videoId,
        created_at: createdAt,
        music: musicInfo,
        user: {
            id: userId,
            is_followed,
            avatar: avatarUrl,
            nickname: userName,
            first_name: firstName,
            last_name: lastName,
            tick,
        },
    } = data;

    useEffect(() => {
        window.history.replaceState(null, '', `/#/videos/${videoId}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('content-container')}>
            <header className={cx('video-info')}>
                <div className={cx('info__account')}>
                    <Link to={'/@' + userName}>
                        <div style={{ display: 'flex', alignItems: 'center' }} onClick={handleClose}>
                            <Image className={cx('avatar')} src={avatarUrl} />

                            <div className={cx('body')}>
                                <p className={cx('username')}>
                                    {userName}
                                    {tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                                </p>
                                <p className={cx('fullname')}>
                                    {firstName} {lastName} · {createdAt?.slice(0, 10)}
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>

                <p className={cx('description')}>
                    {/* <HashtagFilter onCloseModal={handleClose}>{description}</HashtagFilter> */}
                </p>
                <Link to={'/music'} className={cx('music')} target="_blank">
                    <FontAwesomeIcon className={cx('icon-music')} icon={faMusic} />
                    {musicInfo || `Nhạc nền - ${firstName} ${lastName}`}
                </Link>
            </header>
        </div>
    );
}

VideoModal.propTypes = {
    props: PropTypes.object.isRequired,
};

export default VideoModal;
