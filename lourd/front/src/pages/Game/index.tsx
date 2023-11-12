import { useNavigate  } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import Pong from '../../components/Game/Pong/index.tsx';
import styled, { css } from 'styled-components'
import { StyledContainer } from '../../utils/styles/Atoms.tsx'
import { GameContext } from '../../utils/context/GameContext/index.tsx';
import { SoundContext } from '../../utils/context/SoundContext/index.tsx'

interface Validate{
	isValidate?: boolean;
}

const Container = styled.div`
	display: block;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
`;

const MenuTitle = styled.h1`
	font-size: 3.7vh;
	@media all and (min-height: 832px) and (max-width: 560px){
		font-size: 3vh;
	}
	@media all and (min-height: 832px) and (max-width: 1280px){
		font-size:  3vh;
	}
`;

const StyledLink = styled.a`
	width: 78.2%;
	padding: 1vh;
	margin: 0.2vh;
	font-size: 2.5vh;
	border: 2px solid transparent;
	border-radius: 5px;
	text-shadow: 2px 2px 4px black;
	cursor: pointer;
	background: linear-gradient(0.5turn, transparent, dimgrey);
	&:hover{background: linear-gradient(0turn, transparent, dimgrey);}
	@media all and (min-height: 832px) and (max-width: 560px){
		font-size: 2vh;
	}
`;

const MenuButton = styled.button<Validate>`
	width: 80%;
	padding: 1vh;
	margin: 0.2vh;
	font-size: 2.5vh;
	border: 2px solid transparent;
	border-radius: 5px;
	text-shadow: 2px 2px 4px black;
	cursor: pointer;
	background: linear-gradient(0.5turn, transparent, dimgrey);
	&:hover{background: linear-gradient(0turn, transparent, dimgrey);}
	${props => props.isValidate
		&& css`width: 55%;
				margin: 1.5vh;
	`}
	@media all and (min-height: 832px) and (max-width: 560px){
		font-size: 2vh;
	}
`;

const ButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const SpeedButton = styled.button`
	width: 26.3%;
	padding-top: 2.5vh;
	padding-bottom: 2.5vh;
	margin: 0.5vh;
	font-size: 2.7vh;
	border-radius: 5px;
	text-shadow: 2px 2px 4px black;
	cursor: pointer;
	background: linear-gradient(0.5turn, transparent, dimgrey);
	&:hover{background: linear-gradient(0turn, transparent, dimgrey);}
`;

const Description = styled.p`
	font-size: 2.1vh;
	@media all and (max-height: 832px) and (max-width: 512px){
		font-size: 1.6vh;
	}
	@media all and (min-height: 832px) and (max-width: 1280px){
		font-size: 1.5vh;
	}
`;

const PrevLink = styled.button`
	position: fixed;
	bottom: 0%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 2vh;
	display: block;
	margin: auto;
	border-radius: 5px;
	text-shadow: 2px 2px 4px black;
	background: linear-gradient(0.5turn, grey, dimgrey);
	&:hover{background: linear-gradient(0turn, grey, dimgrey);}
	cursor: pointer;
	@media all and (min-height: 832px) and (max-width: 1280px){
		font-size: 1.4vh;
	}
`;

function Game()
{
	const [online, setOnline] = useState('Online Mode');
	const [friend, setFriend] = useState('Friend Mode');
	const [showMenu, setShowMenu] = useState(true);
	const [showMode, setShowMode] = useState(true);
	const [showOption, setShowOption] = useState(false);
	const [opponent, setOpponent] = useState<string>("");
	const [optionDouble, setDouble] = useState<boolean | undefined>(undefined);
	const [optionSpeed, setSpeed] = useState<number | undefined>(undefined);
	const { logged, inPause, inGame, setInGame, dataInGame, setDataInGame } = useContext(GameContext);
	const { handleSFX, handleChangeMusic, gameMusic, battleGameMusic, currentSong, playlist} = useContext(SoundContext);
	const navigate = useNavigate();
	
	const handleHover = (online: boolean) => online ? setOnline("Log In To Play") : setFriend("Log In To Play");
	const handleHoverEnd = (online: boolean) => online ? setOnline("Online Mode") : setFriend("Friend Mode");
	const handleModeClick = (opponentType: string) => {
		setOpponent(opponentType);
		setShowMode(false);
		setShowOption(true);
		handleSFX("clic");
	};
	const handleOptionClick = (doubleParam?: boolean, speedParam?: number) => {
		if (doubleParam !== undefined && doubleParam !== optionDouble)
		{
			setDouble(doubleParam);
			handleSFX("clic2");
		}
		if (speedParam !== undefined && speedParam !== optionSpeed)
		{
			setSpeed(speedParam)
			handleSFX("clic3");
		}
	}
	const handleValidate = () => {
		setShowMenu(false);
		handleSFX("clic4");
		setInGame(opponent);
		setDataInGame({double: optionDouble, speed: optionSpeed})
		if (gameMusic && battleGameMusic && currentSong !== playlist.findIndex((song) => song.title === 'Battle'))
			handleChangeMusic();
	}
	const handleGoBack = () => {
		setDouble(undefined);
		setSpeed(undefined);
		setShowOption(false);
		setShowMode(true);
		handleSFX("goBack");
	}
	const handleExit = () => {
		handleSFX("exit");
		navigate(-1);
	}
	useEffect(() => {
		document.title = 'Game - ft_transcendence';
		if (inPause)
			setShowMenu(false);
	}, [inPause]);
	return (
		<Container>
			<StyledContainer style={{ display: showMenu && !inPause ? 'block' : 'none' }}>
				<MenuTitle style={{ display: showMode ? 'block' : 'none' }}>Choose Your Game Mode</MenuTitle>
				{logged ? <MenuButton onClick={() => handleModeClick("online")} style={{ display: showMode ? 'inline-block' : 'none' }}>Online Mode</MenuButton> :
				<StyledLink href='https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-aeba805b245ea71102f8f22a968dba17bf5d1a866dc5fe07bca7e32f61a5f496&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fauth%2Flogin&response_type=code' onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHoverEnd(true)} style={{ display: showMode ? 'inline-block' : 'none' }}>{online}</StyledLink>}
				<Description style={{ display: showMode ? 'block' : 'none' }}>Play against opponents from around the world with a matchmaking system, test your skills,<br />and show who's the best in exciting online Pong duels.</Description>
				{logged ? <MenuButton onClick={() => handleModeClick("friend")} style={{ display: showMode ? 'inline-block' : 'none' }}>Friend Mode</MenuButton> :
				<StyledLink href='https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-aeba805b245ea71102f8f22a968dba17bf5d1a866dc5fe07bca7e32f61a5f496&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fauth%2Flogin&response_type=code' onMouseEnter={() => handleHover(false)} onMouseLeave={() => handleHoverEnd(false)} style={{ display: showMode ? 'inline-block' : 'none' }}>{friend}</StyledLink>}
				<Description style={{ display: showMode ? 'block' : 'none' }}>Challenge your friends to an epic showdown in Friend Mode.<br />Invite your pals for a thrilling game of Pong, where you can settle old scores and have a blast in intense one-on-one battles.</Description>
				<MenuButton onClick={() => handleModeClick("local")} style={{ display: showMode ? 'inline-block' : 'none' }}>Local Mode</MenuButton>
				<Description style={{ display: showMode ? 'block' : 'none' }}>Share fun face-to-face moments with a friend on the same computer,<br />engaging in intense Pong battles where every move counts.</Description>
				<MenuButton onClick={() => handleModeClick("training")} style={{ display: showMode ? 'inline-block' : 'none' }}>Training Mode</MenuButton>
				<Description style={{ display: showMode ? 'block' : 'none' }}>Hone your skills and perfect your game by playing against a wall where points are not counted.<br />An ideal way to practice and become a true Pong master.</Description>
				<PrevLink style={{ display: showMode ? 'block' : 'none' }} onClick={handleExit}>Go Back</PrevLink>
				<MenuTitle style={{ display: showOption ? 'block' : 'none' }}>Choose Your Game Option</MenuTitle>
				<MenuButton onClick={() => handleOptionClick(false, undefined)} style={{ display: showOption ? 'inline-block' : 'none' }}>Simple{optionDouble === false && ' ✓'}</MenuButton>
				<Description style={{ display: showOption ? 'block' : 'none' }}>Each player controls a paddle to bounce the ball back to their opponent.<br />The objective is to score points without letting the ball pass behind their own paddle.</Description>
				<MenuButton onClick={() => handleOptionClick(true, undefined)} style={{ display: showOption ? 'inline-block' : 'none' }}>Double{optionDouble === true && ' ✓'}</MenuButton>
				<Description style={{ display: showOption ? 'block' : 'none' }}>Each player manages one paddle within their territory and one on their opponent's territory,<br />introducing a strategic gameplay dynamic where players must juggle between the two to score points.</Description>
				<MenuTitle style={{ display: showOption ? 'block' : 'none' }}>Choose Your Game Difficulty</MenuTitle>
				<ButtonContainer style={{ display: showOption ? 'flex' : 'none' }}>
					<SpeedButton onClick={() => handleOptionClick(undefined, 1)}>Easy{optionSpeed === 1 && ' ✓'}</SpeedButton>
					<SpeedButton onClick={() => handleOptionClick(undefined, 1.5)}>Medium{optionSpeed === 1.5 && ' ✓'}</SpeedButton>
					<SpeedButton onClick={() => handleOptionClick(undefined, 2)}>Hard{optionSpeed === 2 && ' ✓'}</SpeedButton>
				</ButtonContainer>
				<MenuButton onClick={handleValidate} style={{ display: (showOption && optionDouble !== undefined && optionSpeed !== undefined) ? 'inline-block' : 'none' }} isValidate>Play {opponent} mode</MenuButton>
				<PrevLink style={{ display: showOption ? 'block' : 'none' }} onClick={handleGoBack}>Go Back</PrevLink>
			</StyledContainer>
			{!showMenu && inGame && dataInGame.double !== undefined && dataInGame.speed !== undefined && <Pong opponentType={inGame} double={dataInGame.double} speed={dataInGame.speed}/>}
			{!showMenu && !inGame && optionDouble !== undefined && optionSpeed !== undefined && <Pong opponentType={opponent} double={optionDouble} speed={optionSpeed}/>}
		</Container>
	);
}

export default Game;
