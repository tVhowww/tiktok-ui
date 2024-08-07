import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import * as videoService from '~/services/videoService';
import SuggestVideo from '~/components/Videos/SuggestVideo';
import VideoModalContext from '~/context/VideoModalContext';
import HomeAccountLoading from '~/components/Loadings/HomeAccountLoading';
import TikTokLoading from '~/components/Loadings/TikTokLoading';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    const [videoList, setVideoList] = useState([]);
    const [page, setPage] = useState(0);

    const pageRandom = useRef([]);
    const observer = useRef();
    const loadingRef = useRef();

    useEffect(() => {
        const getVideoList = async () => {
            try {
                const result = await videoService.getSuggestVideo(page);
                result.sort(() => Math.random() - 0.5);
                setVideoList((prevVideos) => [...prevVideos, ...result]);
            } catch (error) {
                console.error('Error fetching video list:', error);
            }
        };

        getVideoList();
    }, [page]);

    const handleRandomPage = (min, max) => {
        const countPage = max + 1 - min;
        const randomList = pageRandom.current;
        let page;

        if (randomList.length >= countPage) {
            if (randomList.length === countPage) randomList.push(max);
            page = ++randomList[randomList.length - 1];
            return page;
        }

        do {
            page = Math.floor(Math.random() * countPage + min);
        } while (randomList.indexOf(page) !== -1);

        randomList.push(page);
        return page;
    };

    useEffect(() => {
        const options = {
            rootMargin: '0px 0px 80px 0px',
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setPage(handleRandomPage(1, 10));
                }
            });
        };

        observer.current = new IntersectionObserver(observerCallback, options);

        const currentLoadingRef = loadingRef.current;
        if (currentLoadingRef) {
            observer.current.observe(currentLoadingRef);
        }

        return () => {
            if (currentLoadingRef) {
                observer.current.unobserve(currentLoadingRef);
            }
        };
    }, [page]);

    return (
        <div className={cx('wrapper')}>
            <VideoModalContext>
                <SuggestVideo data={videoList} />
            </VideoModalContext>
            <div ref={loadingRef}>
                {videoList.length === 0 ? (
                    <HomeAccountLoading />
                ) : (
                    <span className={cx('auto-load-more')}>
                        <TikTokLoading />
                    </span>
                )}
            </div>
        </div>
    );
}

export default Home;
