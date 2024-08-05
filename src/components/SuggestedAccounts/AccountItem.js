import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import Image from '~/components/Image';
import AccountPreview from './AccountPreview';

const cx = classNames.bind(styles);

function AccountItem({ data, hoverActivate = false }) {
    const fullName = `${data.first_name} ${data.last_name}`;

    let CompWrapper = Fragment;
    const compProps = {};

    if (hoverActivate) {
        CompWrapper = AccountPreview;

        const accountProperProps = {
            data: data,
            className: cx('preview'),
        };

        Object.assign(compProps, accountProperProps);
    }

    return (
        <CompWrapper {...compProps}>
            <Link to={`/@${data.nickname}`} className={cx('account-item')}>
                <Image className={cx('avatar')} src={data.avatar} alt={data.full_name} />
                <div className={cx('item-info')}>
                    <h4 className={cx('nickname')}>
                        <span>{data.nickname}</span>
                        {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                    </h4>
                    <span className={cx('name')}>{fullName}</span>
                </div>
            </Link>
        </CompWrapper>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
    hoverActivate: PropTypes.bool,
};

export default AccountItem;
