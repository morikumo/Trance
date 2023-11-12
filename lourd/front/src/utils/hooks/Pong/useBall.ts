import { useState, useEffect, useMemo, useContext } from 'react';
import { SoundContext } from '../../context/SoundContext'
import { GameContext } from '../../context/GameContext'
import useResize from '../../../utils/hooks/Pong/useResize.ts'

function useBall(inner: {x: number, y: number}, opponentType: string, double: boolean, speed: number, data: {trainingHeight: number, width: number, height: number, radius: number}, dataDoubleWall: { height: number, bot: number, left: number, right: number}, paddleLeft: {x: number, y: number}, paddleRight: {x: number, y: number}, secondPaddleLeftX: number, secondPaddleRightX: number)
{
	const [direction, setDirection] = useState<'left' | 'right'>('left');
	const [stopGame, setstopGame] = useState<boolean>(true);
	const initialBallPos = useMemo(() => ({ x: inner.x * 0.375, y: Math.random() * (inner.y * 0.65 - data.radius * 2) + data.radius * 2}), [inner, stopGame]);
	const [ball, setBall] = useState({...initialBallPos});
	const newBall = useMemo(() => ({ ...ball }), [ball]);
	const [ballX, setballX] = useState<number>(0);
	const [ballY, setballY] = useState<number>((Math.random() * 14) - 7);
	const [speedBall, setSpeedBall] = useState(4 * speed);
	const innerBox = useMemo(() => ({bot: inner.y * 0.656, left: inner.x * 0.01, right: inner.x * 0.742}), [inner]);
	const wallX = useMemo(() => ({left: (dataDoubleWall.left + data.width) * 1.15, right: dataDoubleWall.right * 0.989}), [dataDoubleWall.left, dataDoubleWall.right]);
	const secondPaddleX = useMemo(() => ({left: (secondPaddleLeftX * 0.99), right: (secondPaddleRightX * 0.97)}), [secondPaddleLeftX, secondPaddleRightX]);
	const secondPaddleSideX = useMemo(() => ({left: (secondPaddleLeftX + data.width) * 1.01, right: (secondPaddleRightX + data.width * 1.85)}), [secondPaddleLeftX, secondPaddleRightX]);
	const secondPaddleMiddleX = useMemo(() => ({left: secondPaddleLeftX + (data.width / 2), right: (secondPaddleRightX + (data.width / 2))}), [secondPaddleLeftX, secondPaddleRightX]);
	const paddleX = useMemo(() => ({left: (paddleLeft.x + data.width) * 1.10, right: paddleRight.x * 0.989}), [paddleLeft.x, paddleRight.x]);
	const paddleY = useMemo(() => ({left: paddleLeft.y, right: (opponentType === "training" ? 0 : paddleRight.y)}), [paddleLeft.y, paddleRight.y]);
	const paddleWidth = useMemo(() => ({left: paddleLeft.x , right: paddleRight.x + data.width}), [paddleLeft.x, paddleRight.x]);
	const paddleHeight = useMemo(() => ({left: paddleY.left + data.height + data.radius , right: (opponentType === "training" ? data.trainingHeight : paddleY.right) + data.height + data.radius }), [paddleY]);
	const paddleCenter = useMemo(() => ({left: (paddleY.left + data.height / 2) , right: (paddleY.right + (opponentType === "training" ? data.trainingHeight : data.height) / 2)}), [paddleY]);
	const deltaLeftY = useMemo(() => ((newBall.y - paddleCenter.left) / (data.height / 2) * 5), [newBall, paddleCenter.left]);
	const deltaRightY = useMemo(() => ((newBall.y - paddleCenter.right) / (data.height / 2) * (opponentType === "training" ? 1 : 5)), [newBall, paddleCenter.right]);
	const { handleSFX } = useContext(SoundContext);
	const { scores, setScores } = useContext(GameContext);

	useResize(ball, setBall);
	useEffect(() =>
	{
		const interval = setInterval(() =>
			{
				if (stopGame)
				{
					if (scores.x < 11 && scores.y < 11)
					{
						setTimeout(() => {
							setBall(initialBallPos);
							setstopGame(false);
						}, 1250);
					}
					clearInterval(interval);
				}
				else
				{
					direction === 'left' ? setballX(ballX - speedBall) : setballX(ballX + speedBall)
					newBall.x = ball.x + (direction === 'left' ? -speedBall : speedBall);
					newBall.y = ball.y + ballY;
					setBall(newBall);
					if (double && ((newBall.y >= (paddleY.left - data.radius) && newBall.y <= paddleHeight.left && ((newBall.x >= secondPaddleX.left && newBall.x <= secondPaddleMiddleX.left) || (newBall.x <= secondPaddleSideX.left && newBall.x >= secondPaddleMiddleX.left)))
					|| (opponentType !== "training" && (newBall.x >= secondPaddleX.right && newBall.x <= secondPaddleMiddleX.right && newBall.y >= (paddleY.right - data.radius) && newBall.y <= paddleHeight.right)
					|| (opponentType !== "training" && (newBall.x <= secondPaddleSideX.right && newBall.x >= secondPaddleMiddleX.right && newBall.y >= (paddleY.right - data.radius) && newBall.y <= paddleHeight.right)))))
					{
						if (newBall.x >= secondPaddleX.left && newBall.x <= secondPaddleMiddleX.left || newBall.x >= secondPaddleX.right && newBall.x <= secondPaddleMiddleX.right)
							setDirection('left');
						else
							setDirection('right');
						if ((newBall.x >= secondPaddleX.left && newBall.x <= secondPaddleMiddleX.left) || (newBall.x <= secondPaddleSideX.left && newBall.x >= secondPaddleMiddleX.left))
							setballY(deltaLeftY / 2);
						else if ((newBall.x >= secondPaddleX.right && newBall.x <= secondPaddleMiddleX.right) || (newBall.x <= secondPaddleSideX.right && newBall.x >= secondPaddleMiddleX.right))
							setballY(deltaRightY / 2);
						handleSFX("paddle");
					}
					else if ((newBall.x <= paddleX.left && newBall.y >= (paddleY.left - data.radius) && newBall.y <= paddleHeight.left)
					|| (newBall.x >= paddleX.right && newBall.y >= (paddleY.right - data.radius) && newBall.y <= paddleHeight.right)
					|| (double && (newBall.x <= wallX.left || newBall.x >= wallX.right) && newBall.y >= data.radius && newBall.y <= dataDoubleWall.height + data.radius)
					|| (double && (newBall.x <= wallX.left || newBall.x >= wallX.right) && newBall.y >= innerBox.bot - dataDoubleWall.height && newBall.y <= innerBox.bot))
					{
						setDirection(newBall.x <= paddleX.left ? 'right' : 'left');
						if (speedBall < 15)
							setSpeedBall(speedBall + 0.1);
						if (!(newBall.x <= wallX.left || newBall.x >= wallX.right))
							setballY(newBall.x <= paddleX.left ? deltaLeftY : deltaRightY);
						handleSFX("paddle");
					}
					else if (newBall.y <= 20 || newBall.y >= innerBox.bot)
					{
						setballY(newBall.y <= 20 ? Math.abs(ballY) : -Math.abs(ballY));
						handleSFX("wall");
					}
					else if (newBall.x <= paddleWidth.left || newBall.x >= paddleWidth.right)
					{
						if (opponentType !== "training" && newBall.x <= paddleWidth.left)
							setScores({ x: scores.x, y: scores.y + 1 });
						else if (opponentType !== "training")
							setScores({ x: scores.x + 1, y: scores.y });
						if (scores.x < 11 && scores.y < 11)
							handleSFX("goal");
						setSpeedBall(4 * speed);
						setballY((Math.random() * 14) - 7);
						setstopGame(true);
					}
				}
			}, 10);
			return () => clearInterval(interval);
	}, [ball, stopGame]);
	return (ball);
}

export default useBall;
