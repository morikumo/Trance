import { createContext, useState, ReactNode } from 'react';

type GameContextType = {
	logged: boolean;
	setLogged: (value: boolean) => void;
	inGame: string | null;
	setInGame: (value: string | null) => void;
	scores: {x: number, y: number},
	setScores: (value: {x: number, y: number}) => void,
	dataInGame: {double?: boolean, speed?: number};
	setDataInGame: (value: {double?: boolean, speed?: number}) => void;
	inPause: boolean;
	setInPause: (value: boolean) => void;
};

export const GameContext = createContext<GameContextType>({
	logged: false,
	setLogged: () => {},
	inGame: null,
	setInGame: () => {},
	scores: {x: 0, y: 0},
	setScores: () => {},
	dataInGame: {double: undefined, speed: undefined},
	setDataInGame: () => {},
	inPause: false,
	setInPause: () => {}
});

export const GameProvider = ({ children }: { children: ReactNode }) => {
	const [logged, setLogged] = useState(true);
	const [inPause, setInPause] = useState(false);
	const [inGame, setInGame] = useState<string | null>(null);
	const [dataInGame, setDataInGame] = useState<{double?: boolean, speed?: number}>({double: undefined, speed: undefined});
	const [scores, setScores] = useState<{x: number, y: number}>({x: 0, y: 0});

	return (
	<GameContext.Provider value={{ logged, setLogged, inGame, setInGame, scores, setScores, dataInGame, setDataInGame, inPause, setInPause }}>
		{children}
	</GameContext.Provider>);
};
