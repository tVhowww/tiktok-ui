import { useState } from 'react';
import { createPortal } from 'react-dom';

function useVideoModal(ModalComponent) {
    const [isVideoModalShow, setIsVideoModalShow] = useState(false);
    const [propsVideoModal, setPropsVideoModal] = useState({});
    const [urlStart, setUrlStart] = useState('/#/');

    const showVideoModal = () => {
        setIsVideoModalShow(true);
        document.body.classList.add('video-modal');

        const { pathname, hash, search } = window.location;
        const urlOrigin = pathname + hash + search;
        setUrlStart(urlOrigin);
    };

    const hideVideoModal = (type) => {
        setIsVideoModalShow(false);
        document.body.classList.remove('video-modal');
        window.history.replaceState(null, '', urlStart);
    };

    const VideoModalComponent = () => {
        return (
            isVideoModalShow &&
            createPortal(<ModalComponent handleClose={hideVideoModal} {...propsVideoModal} />, document.body)
        );
    };

    return {
        VideoModalComponent,
        propsVideoModal,
        setPropsVideoModal,
        videoModalState: [isVideoModalShow, showVideoModal],
    };
}

export default useVideoModal;
