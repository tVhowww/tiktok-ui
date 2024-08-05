import Tippy from '@tippyjs/react/headless';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Button from '~/components/Button';
import Image from '~/components/Image';
import styles from './AccountPreview.module.scss';

const cx = classNames.bind(styles);

function AccountPreview({ data, children, className }) {
    const renderPreview = (attrs) => {
        return (
            <div tabIndex={'-1'} className={cx({ [className]: className })} {...attrs}>
                <PopperWrapper>
                    <div className={cx('wrapper')}>
                        <div className={cx('header')}>
                            <Image className={cx('avatar')} src={data?.avatar} alt={data?.first_name} />
                            <Button className={cx('follow-btn')} outline>
                                Follow
                            </Button>
                        </div>
                        <div className={cx('body')}>
                            <p className={cx('nickname')}>
                                <strong>{data?.nickname}</strong>
                                {data?.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                            </p>
                            <p className={cx('name')}>{`${data.first_name} ${data.last_name}`}</p>
                            <p className={cx('analytics')}>
                                <strong className={cx('value')}>{data.followers_count}</strong>
                                <span className={cx('label')}>Followers</span>
                                <strong className={cx('value')}>{data.likes_count}</strong>
                                <span className={cx('label')}>Likes</span>
                            </p>
                        </div>
                    </div>
                </PopperWrapper>
            </div>
        );
    };

    return (
        <span>
            <Tippy placement="bottom-start" interactive delay={[800, 0]} offset={[-26, 0]} render={renderPreview}>
                {children}
            </Tippy>
        </span>
    );
}

AccountPreview.propTypes = {
    data: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default AccountPreview;
