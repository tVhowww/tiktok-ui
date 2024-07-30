import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import {
    HomeIcon,
    HomeActiveIcon,
    UserLeftArrowIcon,
    UserLeftArrowActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    CompassIcon,
    CompassActiveIcon,
    LiveIcon,
    LiveActiveIcon,
} from '~/components/Icons';
import Image from '~/components/Image';
import config from '~/config';
import SuggestedAccounts from '~/components/SuggestedAccounts';

const cx = classNames.bind(styles);

function Sidebar() {
    const currentUser = {
        nickname: 'nguyentrunghau',
    };
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                <MenuItem
                    title="Explore"
                    to={config.routes.explore}
                    icon={<CompassIcon />}
                    activeIcon={<CompassActiveIcon />}
                />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<UserLeftArrowIcon />}
                    activeIcon={<UserLeftArrowActiveIcon />}
                />
                <MenuItem
                    title="Friends"
                    to={config.routes.friends}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
                <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
                <MenuItem
                    title="Profile"
                    to={`/@${currentUser.nickname}`}
                    image={
                        <Image
                            className={cx('user-avatar')}
                            src="https://lh3.googleusercontent.com/a/ACg8ocL8Uo5tbwx6hSLaKGF-JQim6LJSpbCjEAeV5RY6OGjEaA=s96-c"
                            alt="Nguyen Trung Hau"
                        />
                    }
                />
            </Menu>

            <SuggestedAccounts label="Suggested accounts" />
            <SuggestedAccounts label="Following accounts" />
        </aside>
    );
}

export default Sidebar;
