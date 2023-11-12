import { useState, useEffect } from 'react';

function useWindowSize()
{
	const [windowSize, setWindowSize] = useState({ x: window.innerWidth, y: window.innerHeight });

	useEffect(() => {
		const handleResize = () => {
			if (windowSize.y < 832)
				setWindowSize({x: window.innerWidth * 1.3, y: window.innerHeight * 1.2});
			else
				setWindowSize({ x: window.innerWidth, y: window.innerHeight });
		}
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [window.innerWidth, window.innerHeight]);
	return (windowSize);
}

export default useWindowSize;
