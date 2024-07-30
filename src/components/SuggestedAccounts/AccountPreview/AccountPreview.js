import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AccountPreview() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img
                    className={cx('avatar')}
                    src="https://lh3.googleusercontent.com/a/ACg8ocL8Uo5tbwx6hSLaKGF-JQim6LJSpbCjEAeV5RY6OGjEaA=s96-c"
                    alt=""
                />
                <Button className={cx('follow-btn')} outline>
                    Follow
                </Button>
            </div>
            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <strong>tVhowww</strong>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </p>
                <p className={cx('name')}>Nguyễn Trung Hậu</p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>6.8M</strong>
                    <span className={cx('label')}>Followers</span>
                    <strong className={cx('value')}>886.8M</strong>
                    <span className={cx('label')}>Likes</span>
                </p>
            </div>
        </div>
    );
}

export default AccountPreview;
