import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ShowAccount.module.scss';
import AccountItem from '../SuggestedAccounts/AccountItem';

const cx = classNames.bind(styles);

function ShowAccount({ data, hoverActivate }) {
    return (
        <div className={cx('content')}>
            {data.map((item, index) => (
                <AccountItem key={index} data={item} hoverActivate={hoverActivate} />
            ))}
        </div>
    );
}

ShowAccount.propTypes = {
    data: PropTypes.array.isRequired,
    hoverActivate: PropTypes.bool,
};

export default ShowAccount;
