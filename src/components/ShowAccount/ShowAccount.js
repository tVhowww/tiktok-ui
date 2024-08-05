import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ShowAccount.module.scss';
import AccountItem from '../SuggestedAccounts/AccountItem';

const cx = classNames.bind(styles);

function ShowAccount({ data, hoverActivate, btnTitle, onClick }) {
    return (
        <div className={cx('content')}>
            {data.map((item, index) => (
                <AccountItem key={index} data={item} hoverActivate={hoverActivate} />
            ))}

            {data && data.length > 0 && (
                <p className={cx('more-btn')} onClick={onClick}>
                    {btnTitle}
                </p>
            )}
        </div>
    );
}

ShowAccount.propTypes = {
    data: PropTypes.array.isRequired,
    hoverActivate: PropTypes.bool,
};

export default ShowAccount;
