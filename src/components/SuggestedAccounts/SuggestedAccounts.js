import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';
import config from '~/config';
import * as accountServices from '~/services/accountService';
import ShowAccount from '../ShowAccount';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label }) {
    const [accounts, setAccounts] = useState([]);
    const [seeAll, setSeeAll] = useState(false);

    const { totalLoadSuggested: total, defaultShowSuggested: show } = config.accounts;

    const currentItems = seeAll ? accounts : accounts.slice(0, show);
    const btnTitle = seeAll ? 'Hide less' : 'See more';
    const options = {
        hoverActivate: true,
    };

    useEffect(() => {
        const fetchAPI = async () => {
            const result = await accountServices.getSuggestedAccount(total);

            setAccounts(result);
        };

        fetchAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleToggleSeeAll = () => {
        setSeeAll(!seeAll);
    };

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>

            <ShowAccount data={currentItems} btnTitle={btnTitle} onClick={handleToggleSeeAll} {...options} />
        </div>
    );
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};

export default SuggestedAccounts;
