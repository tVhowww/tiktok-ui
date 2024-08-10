import { useState, useEffect, useRef } from 'react';

function useInView({ threshold = 0 }) {
    const [inView, setInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setInView(true);
                    } else {
                        const intersectionRatio = entry.intersectionRatio;
                        if (intersectionRatio <= threshold) {
                            setInView(false);
                        }
                    }
                });
            },
            { threshold },
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(ref.current);
            }
        };
    }, [threshold]);

    return [ref, inView];
}

export default useInView;
