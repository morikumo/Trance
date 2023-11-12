import { useState, useContext } from "react";
import { SoundContext } from "../../../utils/context/SoundContext";
import useSound from 'use-sound';
import ClicSFX from '../../../assets/sounds/sfx/ClicSFX.wav'
import styled from 'styled-components'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
`;

const MenuButton = styled.button`
	width: 80%;
	padding: 1.5vh;
	margin: 1.5vh;
	font-size: 2.5vh;
	border-radius: 5px;
	text-shadow: 2px 2px 4px black;
	cursor: pointer;
	background: linear-gradient(0.5turn, transparent, dimgrey);
	&:hover{background: linear-gradient(0turn, transparent, dimgrey);}
	@media all and (min-height: 832px) and (max-width: 560px){
		font-size: 2vh;
	}
`;

const PlaylistContainer = styled.div`
	display: flex;
	align-items: center;
`;

const Title = styled.p`
	font-size: 2.7vh;
	font-weight: 300;
	margin: 2vw;
	@media all and (min-height: 832px) and (max-width: 560px){
		font-size: 2vh;
	}
`

function Audio()
{
	const { handleMuteSFX, menuSFX, gameSFX, handleSFX, handleMuteGame, battleGameMusic, setBattleGameMusic, gameMusic, playlist, currentSong, handleChangeMusic, handleMutePlaylist, menuMusic } = useContext(SoundContext);
	const [changed, setChanged] = useState(false);
	const [clicSFX] = useSound(ClicSFX, { volume: 0.5 });

	const handleFXSound = (type: boolean, name: string) => {
		type ? handleSFX("goBack") : (menuSFX || name === "menu") && clicSFX();
		handleMuteSFX(name)
	}
	const handleGameSound = () => {
		gameMusic ? handleSFX("goBack") : handleSFX("clic");
		handleMuteGame();
	}
	const handleMusicSound = () => {
		menuMusic ? handleSFX("goBack") : handleSFX("clic");
		handleMutePlaylist();
	}
	const handleChangingMusic = (next: boolean) => {
		if (!changed)
		{
			setChanged(true);
			handleChangeMusic(next);
			handleSFX("clic");
			setTimeout(() => setChanged(false), 1000);
		}
	}
	const handleBattleSound = () => {
		battleGameMusic ? handleSFX("goBack") : handleSFX("clic");
		setBattleGameMusic(!battleGameMusic);
	}

	return(<Container>
				<MenuButton onClick={() => handleFXSound(menuSFX, "menu")}>{menuSFX ? "Mute" : "Unmute"} Menu SFX</MenuButton>
				<MenuButton onClick={() => handleFXSound(gameSFX, "game")}>{gameSFX ? "Mute" : "Unmute"} Game SFX</MenuButton>
				<MenuButton onClick={handleMusicSound}>{menuMusic ? "Mute" : "Unmute"} Music In Lobby</MenuButton>
				<MenuButton onClick={handleGameSound}>{gameMusic ? "Mute" : "Unmute"} Music In Game</MenuButton>
				<MenuButton onClick={handleBattleSound}>Battle Music Auto: {battleGameMusic ? "On" : "Off"}</MenuButton>
				<PlaylistContainer>
					<MenuButton onClick={() => handleChangingMusic(false)}>{changed ? "..." : "<"}</MenuButton>
					<Title>{playlist[currentSong].title}</Title>
					<MenuButton onClick={() => handleChangingMusic(true)}>{changed ? "..." : ">"}</MenuButton>
				</PlaylistContainer>
			</Container>)
}

export default Audio;
