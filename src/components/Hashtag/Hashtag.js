import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Hashtag.module.scss';

const cx = classNames.bind(styles);

function Hashtag({ title, href }) {
    return (
        <a href={href} className={cx('wrapper')}>
            {title}
        </a>
    );
}

Hashtag.propTypes = {
    title: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
};

export default Hashtag;
