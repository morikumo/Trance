import { useState, useContext } from "react";
import styled from "styled-components";
import { SoundContext } from "../../../utils/context/SoundContext";
import Exemple from "../../../assets/images/btn-profile.png"

const Container = styled.div`
	display: flex;
	flex-direction: column;
	text-align: start;
	align-item: start;
`;

const Card = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 2.5vh;
	margin: 0.5vh;
	font-size: 1.5vh;
	border: 2px solid dimgrey;
	border-radius: 5px;
	text-shadow: 1px 1px 2px dimgrey;
	background: linear-gradient(0.5turn, rgb(50, 50, 50, 0.95), rgb(25, 25, 25, 0.95));
	position: relative;
`;

const Picture = styled.img`
	height: 6vh;
`

const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	bottom: 1%;
	width: 100%;
`;

const ChangePage = styled.button`
	font-size: 2vh;
	display: block;
	margin-top: 2.5vh;
	text-shadow: 2px 2px 4px dark;
	border-radius: 5px;
	background: linear-gradient(0.5turn, grey, dimgrey);
	&:hover{background: linear-gradient(0turn, grey, dimgrey);}
	cursor: pointer;
	@media all and (min-height: 832px) and (max-width: 1280px){
		font-size: 1.4vh;
	}
	margin: 10px;
`;

const matchDataNames = ["nickname 1", "nickname 2", "nickname 3", "nickname 4", "nickname 5",
"nickname 6", "nickname 7", "nickname 8", "nickname 9", "nickname 10", "nickname 11"];

const matchDataScores = ["5 - 11", "11 - 3", "11 - 0", "1 - 11", "11 - 8",
"5 - 3", "11 - 10", "11 - 10", "2 - 11", "11 - 6", "5 - 7"];

const username = "Username";

const matchDataWinner = ["Username", "Username", "rayan", "richar", "lais",
"hamid", "Username", "hamid", "Username", "rayan", "moha"];

const matchDataMode = ["Simple", "Simple", "Double", "Simple", "Double",
"Simple", "Double", "Simple", "Double", "Simple", "Double"];

const matchDataDifficulty = ["Easy", "Hard", "Hard", "Medium", "Medium",
"Hard", "Easy", "Medium", "Easy", "Hard", "Medium"];

function MatchHistory()
{
	const [startIndex, setStartIndex] = useState(0);
	const { handleSFX } = useContext(SoundContext);

	const handlePrev = () => {
		if (startIndex - 4 >= 0)
			setStartIndex(startIndex - 4);
		handleSFX('clic');
	};
	const handleNext = () => {
		if (startIndex + 4 < matchDataNames.length)
			setStartIndex(startIndex + 4);
		handleSFX('clic');
	};

	return (<Container>
				{matchDataNames.slice(startIndex, startIndex + 4).map((leader, index) => (
				<Card key={startIndex + index}>
					<Picture src={Exemple} alt="Picture"/>
					<h2>{username}</h2>
					<h4 style={{ position: "absolute", top: "10%", left: "34%" }}>Mode: </h4>
					<h3>{matchDataMode[startIndex + index]}</h3>
					<h2 style={{ position: "absolute", top: "0%", left: "47%" }}>{matchDataWinner[startIndex + index] === username ? "Victory" : "Defeat"}</h2>
					<h1>{matchDataScores[startIndex + index]}</h1>
					<h4 style={{ position: "absolute", top: "10%", left: "61.5%" }}>Difficulty: </h4>
					<h3>{matchDataDifficulty[startIndex + index]}</h3>
					<h2>{leader}</h2>
					<Picture src={Exemple} alt="Picture"/>
				</Card>))}
				<ButtonContainer>
						{startIndex > 0 && <ChangePage onClick={handlePrev}>{"<"}</ChangePage>}
						{startIndex < matchDataNames.length - 4 && <ChangePage onClick={handleNext}>{">"}</ChangePage>}
				</ButtonContainer>
			</Container>);
}

export default MatchHistory;