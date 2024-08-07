import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './TikTokLoading.module.scss';

const cx = classNames.bind(styles);

function TikTokLoading({ medium = false, small = false }) {
    return <div id={cx('loader')} className={cx({ medium, small })} />;
}

TikTokLoading.propTypes = {
    medium: PropTypes.bool,
    small: PropTypes.bool,
};

TikTokLoading.propTypes = {
    medium: PropTypes.bool,
    small: PropTypes.bool,
};

export default TikTokLoading;
