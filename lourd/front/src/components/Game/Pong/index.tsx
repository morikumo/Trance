import styled, { css } from 'styled-components';
import { StyledContainer } from '../../../utils/styles/Atoms.tsx'
import { useState, useMemo, useContext } from 'react';
import { GameContext } from '../../../utils/context/GameContext/'
import { SoundContext } from '../../../utils/context/SoundContext/'
import { Link } from 'react-router-dom';
import { Stage, Layer, Rect, Circle } from 'react-konva';
import useWindowSize from '../../../utils/hooks/WindowSize/useWindowSize.ts'
import usePaddleLeft from '../../../utils/hooks/Pong/usePaddleLeft.ts'
import usePaddleRight from '../../../utils/hooks/Pong/usePaddleRight.ts'
import useBall from '../../../utils/hooks/Pong/useBall.ts'
import EndGame from '../EndGame/'

interface GameData
{
	isOpponent?: boolean;
	isLocal?: boolean;
	isTraining?: boolean;
}

const Score = styled.h2<GameData>`
	font-size: 4vh;
	font-weight: 500;
	position: fixed;
	left: 25%;
	transform: translate(-50%, -80%);
	${props => props.isOpponent
		&& css`
		left: 75%;
	`}
	${props => props.isTraining
		&& css`left: 50%;
	`}
`

const Divider = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	white-space: pre;
	font-size: 24px;
	font-width: 500;
`;

const StyledStage = styled(Stage)`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	height: 90%;
	border: 2px solid dimgrey;
`;

const Notice = styled.p<GameData>`
	position: fixed;
	font-size: 3vh;
	top: 91%;
	left: -24%;
	width: 100%;
	${props => props.isLocal && css`
		left: 25%;
	`}
	@media all and (max-height: 832px) {
		top: 92%;
	}
	@media all and (max-width: 768px) and (min-height: 832px) {
		font-size: 2.5vh;
		top: 92.2%;
		left: -24%;
		${props => props.isLocal && css`
			left: 26%;
		`}
	}
	@media all and (max-width: 640px) and (min-height: 832px) {
		font-size: 2vh;
		top: 93.2%;
		left: -24%;
		${props => props.isLocal && css`
			left: 26%;
		`}
	}
`;

const BtnTraining = styled(Link)<GameData>`
	font-size: 18px;
	position: fixed;
	bottom: -1%;
	left: 75%;
	transform: translate(-50%, -50%);
	padding: 1px 5px;
	border-radius: 5px;
	text-shadow: 2px 2px 4px black;
	background: linear-gradient(0.5turn, grey, dimgrey);
	&:hover{background: linear-gradient(0turn, grey, dimgrey);}
`

import Pause from '../Pause/'

function Pong(props: {opponentType: string, double: boolean, speed: number})
{
	const inner = useWindowSize();
	const data = useMemo(() => ({ trainingHeight: inner.y * 0.675, width: inner.x * 0.01, height: inner.y * 0.10, radius: inner.x * 0.006}), [inner]);
	const paddleLeft = usePaddleLeft(inner, false);
	const paddleRight = usePaddleRight(inner, false, props.opponentType);
	const dataDoubleWall = useMemo(() => ({ height: inner.y * 0.15, bot: inner.y * 0.524, left: paddleLeft.x - data.width, right: (inner.x * 0.739 - inner.y * 0.10) + data.width}), [inner]);
	const secondPaddleLeft = usePaddleLeft(inner, props.double);
	const secondPaddleRight = usePaddleRight(inner, props.double, props.opponentType);
	const ball = useBall(inner, props.opponentType, props.double, props.speed, data, dataDoubleWall, paddleLeft, paddleRight, secondPaddleLeft.x, secondPaddleRight.x)
	const divider = useMemo(() => ("|\n".repeat(Math.floor(inner.y / 42))), [inner.y]);
	const { inPause, setInPause, scores } = useContext(GameContext);
	const { handleSFX } = useContext(SoundContext);

	if (inPause)
		setInPause(false);
	return (<StyledContainer>
				{props.opponentType !== "training" && <Score>{scores.x}</Score>}
				{props.opponentType === "training" ? <Score isTraining>Training Mode</Score> : <Score isOpponent>{scores.y}</Score>}
				<Divider>{divider}</Divider>
				{props.double ?
				<StyledStage width={inner.x * 0.752} height={inner.y * 0.68}>
					<Layer>
						<Rect x={dataDoubleWall.left} y={0} width={data.width} height={dataDoubleWall.height} fill="white" />
						<Rect x={paddleLeft.x} y={paddleLeft.y} width={data.width} height={data.height} fill="white" />
						<Rect x={secondPaddleRight.x} y={secondPaddleRight.y} width={data.width} height={props.opponentType === "training" ? 0 : data.height} fill="white" />
						<Rect x={dataDoubleWall.left} y={dataDoubleWall.bot} width={data.width} height={dataDoubleWall.height} fill="white" />
						<Circle x={ball.x} y={ball.y} radius={data.radius} fill="white" />
						<Rect x={dataDoubleWall.right} y={0} width={data.width} height={props.opponentType === "training" ? 0 : dataDoubleWall.height} fill="white" />
						<Rect x={secondPaddleLeft.x} y={secondPaddleLeft.y} width={data.width} height={data.height} fill="white" />
						<Rect x={paddleRight.x} y={props.opponentType === "training" ? 0 : paddleRight.y} width={data.width} height={props.opponentType === "training" ? data.trainingHeight : data.height} fill="white" />
						<Rect x={dataDoubleWall.right} y={dataDoubleWall.bot} width={data.width} height={props.opponentType === "training" ? 0 : dataDoubleWall.height} fill="white" />
					</Layer>
				</StyledStage> :
				<StyledStage width={inner.x * 0.752} height={inner.y * 0.68}>
				<Layer>
					<Rect x={paddleLeft.x} y={paddleLeft.y} width={data.width} height={data.height} fill="white" />
					<Circle x={ball.x} y={ball.y} radius={data.radius} fill="white" />
					<Rect x={paddleRight.x} y={props.opponentType === "training" ? 0 : paddleRight.y} width={data.width} height={props.opponentType === "training" ? data.trainingHeight : data.height} fill="white" />
				</Layer>
				</StyledStage>}
				<Notice>Press ↑ and ↓{inner.x > 496 && " to move"}</Notice>
				{props.opponentType === "local" && <Notice isLocal>Use mouse{inner.x > 496 && " to move"}</Notice>}
				{props.opponentType === "training" && <BtnTraining to="/" onClick={() => handleSFX("exit")}>Go home</BtnTraining>}
				{props.opponentType !== "training" && (scores.x > 10 || scores.y > 10) && <EndGame winner={scores}/>}
			</StyledContainer>
	);
}

export default Pong;
