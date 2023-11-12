import { useState, useEffect, useMemo } from 'react';
import useResize from '../../../utils/hooks/Pong/useResize.ts'

function usePaddleRight(inner: {x: number, y: number}, double: boolean, opponentType: string)
{
	const [paddleRight, setPaddleRight] = useState({ x: inner.x * (double ? 0.233 : 0.739) - inner.y * 0.10, y: inner.y * 0.273});
	const mouseBox = useMemo(() => ({top: inner.y * 0.25, bot: inner.y * 0.825, left: inner.x * 0.5, right: inner.x * 0.875}), [inner]);
	
	useResize(paddleRight, setPaddleRight);
	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) =>
		{
			if (opponentType === "local" && event.clientY >= mouseBox.top && event.clientY <= mouseBox.bot && event.clientX >= mouseBox.left && event.clientX <= mouseBox.right)
				setPaddleRight({ x: paddleRight.x, y: (event.clientY - mouseBox.top) });
		};
		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, [paddleRight, inner]);
	return (paddleRight);
}

export default usePaddleRight;
