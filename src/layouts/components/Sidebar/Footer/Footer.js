import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import images from '~/assets/images';
import Image from '~/components/Image';
import Hashtag from '~/components/Hashtag';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Footer() {
    const [openHashtag, setOpenHashtag] = useState(null);

    const handleOpenHashtag = (title) => {
        setOpenHashtag(title === openHashtag ? null : title);
    };

    return (
        <div className={cx('wrapper')}>
            <a
                className={cx('entrance-link')}
                href="https://effecthouse.tiktok.com/download?utm_campaign=ttweb_entrance_v1&utm_source=tiktok_webapp_main"
            >
                <Image className={cx('footer-img')} src={images.footer} alt="TikTok Effect" />
                <h4 className={cx('footer-text')}>Create TikTok effects, get a reward</h4>
            </a>

            <div>
                <h4
                    className={cx('footer-link', { active: openHashtag === 'Company' })}
                    onClick={() => handleOpenHashtag('Company')}
                >
                    Company
                </h4>

                {openHashtag === 'Company' && (
                    <div>
                        <Hashtag title="About" href="#" />
                        <Hashtag title="Newsroom" href="#" />
                        <Hashtag title="Contact" href="#" />
                        <Hashtag title="Careers" href="#" />
                    </div>
                )}
            </div>

            <div>
                <h4
                    className={cx('footer-link', { active: openHashtag === 'Program' })}
                    onClick={() => handleOpenHashtag('Program')}
                >
                    Program
                </h4>

                {openHashtag === 'Program' && (
                    <div>
                        <Hashtag title="TikTok for Good" href="#" />
                        <Hashtag title="Advertise" href="#" />
                        <Hashtag title="TikTok LIVE Creator Networks" href="#" />
                        <Hashtag title="Developers" href="#" />
                        <Hashtag title="Transparency" href="#" />
                        <Hashtag title="TikTok Rewards" href="#" />
                        <Hashtag title="TikTok Embeds" href="#" />
                    </div>
                )}
            </div>

            <div>
                <h4
                    className={cx('footer-link', { active: openHashtag === 'Term & Policies' })}
                    onClick={() => handleOpenHashtag('Term & Policies')}
                >
                    Term & Policies
                </h4>

                {openHashtag === 'Term & Policies' && (
                    <div>
                        <Hashtag title="Help" href="#" />
                        <Hashtag title="Safety" href="#" />
                        <Hashtag title="Terms" href="#" />
                        <Hashtag title="Privacy Policy" href="#" />
                    </div>
                )}
            </div>

            <span className={cx('copyright')}>© TikTok</span>
        </div>
    );
}

export default Footer;
