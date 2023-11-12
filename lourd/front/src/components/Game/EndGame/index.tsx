import { useContext } from 'react';
import { GameContext } from '../../../utils/context/GameContext'
import styled from 'styled-components';

const Card = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 25%;
	height: 75%;
	border-radius: 5px;
	background-color: dimgrey;
	z-index: 2;
`

function EndGame(props: {winner: {x: number, y: number}})
{
	const { setInGame, setScores } = useContext(GameContext);

	setInGame(null);
	setScores({x: 0, y:0});
	return (<Card>
				Player 1 : {props.winner.x}<br />
				Player 2 : {props.winner.y}
			</Card>);
}

export default EndGame;
