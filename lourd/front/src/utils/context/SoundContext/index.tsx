import { createContext, useState, useEffect, ReactNode, useContext  } from 'react';
import { GameContext } from '../GameContext/';
import useSound from 'use-sound';
import LittlerootTownOST from '../../../assets/sounds/ost/LittlerootTownOST.wav'
import Route101OST from '../../../assets/sounds/ost/Route101OST.wav'
import OldaleTownOST from '../../../assets/sounds/ost/OldaleTownOST.wav'
import GoldenrodCityOST from '../../../assets/sounds/ost/GoldenrodCityOST.wav'
import BattleOST from '../../../assets/sounds/ost/BattleOST.wav'
import HeaderSFX from '../../../assets/sounds/sfx/HeaderSFX.wav'
import FallaborTownOST from '../../../assets/sounds/ost/FallaborTownOST.wav'
import NewBarkTownOST from '../../../assets/sounds/ost/NewBarkTownOST.wav'
import SurfingOST from '../../../assets/sounds/ost/SurfingOST.wav'
import VerdanturfTownOST from '../../../assets/sounds/ost/VerdanturfTownOST.wav'
import CeruleanCityOST from '../../../assets/sounds/ost/CeruleanCityOST.wav'
import ExitSFX from '../../../assets/sounds/sfx/ExitSFX.wav'
import ClicSFX from '../../../assets/sounds/sfx/ClicSFX.wav'
import ClicSFX2 from '../../../assets/sounds/sfx/ClicSFX2.wav'
import ClicSFX3 from '../../../assets/sounds/sfx/ClicSFX3.wav'
import ClicSFX4 from '../../../assets/sounds/sfx/ClicSFX4.wav'
import GoBackSFX from '../../../assets/sounds/sfx/GoBackSFX.wav'
import PaddleSFX from '../../../assets/sounds/sfx/PaddleSFX.wav'
import GoalSFX from '../../../assets/sounds/sfx/GoalSFX.wav'
import WallSFX from '../../../assets/sounds/sfx/WallSFX.wav'

type Song = {
	title: string;
	url: string;
	volume: number;
};

type SoundContextType = {
	handleMuteSFX: (type: string) => void;
	handleSFX: (name: string) => void;
	menuSFX: boolean;
	gameSFX: boolean;
	handleMuteGame: () => void;
	battleGameMusic: boolean;
	setBattleGameMusic: (value: boolean) => void,
	gameMusic: boolean;
	playlist: Song[];
	currentSong: number;
	handleChangeMusic: (value?: boolean) => void;
	handleMutePlaylist: () => void;
	menuMusic: boolean;
};

export const SoundContext = createContext<SoundContextType>({
	handleMuteSFX: () => {},
	handleSFX: () => {},
	menuSFX: true,
	gameSFX: true,
	handleMuteGame: () => {},
	battleGameMusic: true,
	setBattleGameMusic: () => {},
	gameMusic: true,
	playlist: [],
	currentSong: 0,
	handleChangeMusic: () => {},
	handleMutePlaylist: () => {},
	menuMusic: true
});


export const SoundProvider = ({ children }: { children: ReactNode }) => {
	const { inGame } = useContext(GameContext);
	const [playlist] = useState<Song[]>([
		{
			title: 'Littleroot Town',
			url: LittlerootTownOST,
			volume: 0.2
		},
		{
			title: 'Route 101',
			url: Route101OST,
			volume: 0.2
		},
		{
			title: 'Oldale Town',
			url: OldaleTownOST,
			volume: 0.18
		},
		{
			title: 'Goldenrod City',
			url: GoldenrodCityOST,
			volume: 0.13
		},
		{
			title: 'Fallabor Town',
			url: FallaborTownOST,
			volume: 0.2
		},
		{
			title: 'Battle',
			url: BattleOST,
			volume: 0.07
		},
		{
			title: 'New Bark Town',
			url: NewBarkTownOST,
			volume: 0.12
		},
		{
			title: 'Surfing',
			url: SurfingOST,
			volume: 0.15
		},
		{
			title: 'Verdanturf Town',
			url: VerdanturfTownOST,
			volume: 0.18
		},
		{
			title: 'Cerulean City',
			url: CeruleanCityOST,
			volume: 0.2
		}
	]);
	const [menuMusic, setMenuMusic] = useState(true);
	const [gameMusic, setGameMusic] = useState(true);
	const [battleGameMusic, setBattleGameMusic] = useState(true);
	const [currentSong, setCurrentSong] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [play, { stop }] = useSound(playlist[currentSong].url, {
		volume: playlist[currentSong].volume,
		onend: () => {
			setCurrentSong((currentSong + 1) % playlist.length);
		}
	});
	const handleMuteGame = () => setGameMusic(!gameMusic);
	const handleMutePlaylist = () => setMenuMusic(!menuMusic);
	const handleChangeMusic = (next?: boolean) => {
		stop();
		if (next === undefined)
			setCurrentSong(playlist.findIndex((song) => song.title === 'Battle'));
		else if (currentSong !== 0 || next === true)
			setCurrentSong((currentSong + (next ? 1 : -1)) % playlist.length);
		else 
			setCurrentSong(playlist.length - 1);
	}
	useEffect(() => {
		if ((menuMusic && !inGame) || (gameMusic && inGame))
			setIsPlaying(true);
		else
			setIsPlaying(false);
	}, [menuMusic, gameMusic, inGame]);
	useEffect(() => {
		stop();
		if (isPlaying)
			play();
	}, [play, isPlaying]);
	const [menuSFX, setMenuSFX] = useState(true);
	const [gameSFX, setGameSFX] = useState(true);
	const [headerSFX] = useSound(HeaderSFX, { volume: 0.45 });
	const [exitSFX] = useSound(ExitSFX, { volume: 0.65 });
	const [clicSFX] = useSound(ClicSFX, { volume: 0.45 });
	const [clicSFX2] = useSound(ClicSFX2, { volume: 0.5 });
	const [clicSFX3] = useSound(ClicSFX3, { volume: 0.5 });
	const [clicSFX4] = useSound(ClicSFX4, { volume: 0.5 });
	const [goBackSFX] = useSound(GoBackSFX, { volume: 0.5 });
	const [paddleSFX] = useSound(PaddleSFX, { volume: 2.1 });
	const [goalSFX] = useSound(GoalSFX, { volume: 1.5 });
	const [wallSFX] = useSound(WallSFX, { volume: 2 });
	const handleMuteSFX = (type: string) => {
		type === "menu" ? setMenuSFX(!menuSFX) : setGameSFX(!gameSFX);
	}
	const handleSFX = (name: string) => {
		if (menuSFX && name === "header")
			headerSFX();
		else if (menuSFX && name === "exit")
			exitSFX();
		else if (menuSFX && name === "clic")
			clicSFX();
		else if (menuSFX && name === "clic2")
			clicSFX2();
		else if (menuSFX && name === "clic3")
			clicSFX3();
		else if (menuSFX && name === "clic4")
			clicSFX4();
		else if (menuSFX && name === "goBack")
			goBackSFX();
		else if (gameSFX && name === "paddle")
			paddleSFX();
		else if (gameSFX && name === "goal")
			goalSFX();
		else if (gameSFX && name === "wall")
			wallSFX();
	};
	return (<SoundContext.Provider value={{ menuSFX, gameSFX, handleMuteSFX, handleSFX, handleMuteGame, battleGameMusic, setBattleGameMusic, gameMusic, playlist, currentSong, handleChangeMusic, handleMutePlaylist, menuMusic }}>
				{children}
			</SoundContext.Provider>);
};
