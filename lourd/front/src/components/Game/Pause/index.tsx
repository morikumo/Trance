import styled from "styled-components";
import { useContext, useState } from "react";
import { GameContext } from '../../../utils/context/GameContext'

const Card = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 40%;
	height: 35%;
	border-radius: 5px;
	background-color: rgb(25, 25, 25, 0.95);
	z-index: 10;
	display: flex;
	flex-direction: column;
	justify-content: center;
	justify-content: center;
	align-items: center;
	text-align: center;
	font-size: 3vh;
	margin-bottom: 50px;
	text-shadow: 2px 2px 4px black;
	@media all and (max-width: 848px) {
		font-size: 2vh;
	}
`;

const Text = styled.p`
	font-size: 2.2vh;
	@media all and (max-width: 848px) {
		font-size: 1.7vh;
	}
`

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
`;

const MenuButton = styled.button`
	width: 30%;
	padding: 5px;
	margin: 5px;
	font-size: 2vh;
	border-radius: 5px;
	text-shadow: 2px 2px 4px black;
	cursor: pointer;
	background: linear-gradient(0.5turn, darkgrey, dimgrey);
	&:hover{background: linear-gradient(0turn, darkgrey, dimgrey);}
	@media all and (max-width: 848px) {
		font-size: 1.5vh;
	}
`;

function Pause(props: {resize: boolean, opponent: boolean})
{
	const { setInGame, setInPause, setDataInGame, scores, setScores } = useContext(GameContext);
	const [display, setDisplay] = useState(true);

	const handleGiveUp = () => {
		setInGame(null);
		setScores({x: 0, y:0});
		setInPause(false);
		setDataInGame({double: undefined, speed: undefined});
	}
	const handleBeBack = () => {
		setDisplay(false);
	}
	return (<>{display && <Card>
				{!props.opponent && "Game In Progress"}<br/>
				{props.opponent ? "Pause" : `Scores: ${scores.x} - ${scores.y}`}
				{props.opponent && <Text>Please wait a moment.<br />Your opponent has temporarily interrupted the game.<br />Note that after one minute, this will be considered an automatic abandonment.</Text>}
				{!props.opponent && <Text>You have 1 minute to return, otherwise,<br />you will be considered to have abandoned the game.</Text>}
				<ButtonContainer>
					{!props.opponent && <MenuButton onClick={handleGiveUp}>Give up</MenuButton>}
					{<MenuButton onClick={handleBeBack}>Okay</MenuButton>}
				</ButtonContainer>
			</Card>}</>);
}

export default Pause;
