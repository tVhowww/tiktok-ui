import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function MENU_ITEMS({ data }) {
    return (
        <Button className={cx('menu-item')} leftIcon={data.icon} to={data.to}>
            {data.title}
        </Button>
    );
}

export default MENU_ITEMS;
