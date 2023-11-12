import { useContext } from "react";
import styled from "styled-components";
import { GameContext } from '../../../utils/context/GameContext/'
import Exemple from "../../../assets/images/btn-profile.png"

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	align-item: center;
	background: linear-gradient(0.5turn, rgb(50, 50, 50, 0.95), rgb(25, 25, 25, 0.95));
	border: 2px solid dimgrey;
	border-radius: 5px;
	width: 60%;
	margin: auto;
`;

const UserInfo = styled.div`
	display: flex;
	flex-direction: row;
	text-align: center;
	align-item: center;
	background: linear-gradient(0.5turn, rgb(50, 50, 50, 0.95), rgb(25, 25, 25, 0.95));
	border: 1px solid dimgrey;
	padding: 2vh;
`

const Picture = styled.img`
	height: 15vh;
`

const Nickname = styled.input`
	font-size: 2vw;
	height: 5vh;
	width: 16vw;
	margin-left: 2vw;
	background: transparent;
`

const Bio = styled.textarea`
	font-size: 2vw;
	width: 100%;
	padding: 1vh;
	resize: none;
	height: 22vh;
	box-sizing: border-box;
	background: transparent;
	border: 1px solid dimgrey;
`

const Status = styled.p`
	font-size: 30px;
	font-weight: 300;
`

function UserProfile()
{
	const { inGame } = useContext(GameContext);
	const nickname = "Hamid";
	const bio = "I love les prunelles";


	return (<Container>
				<UserInfo>
					<Picture src={Exemple} alt="Exemple"/>
					<Nickname placeholder={nickname} maxLength={10}/>
					<Status>{inGame ? "In-Game": "Available"}</Status>
					achievement<br />
				</UserInfo>
					<Bio placeholder={bio} maxLength={100}/>
				<>
				</>
				<>
					2fa<br />
					logout
				</>
			</Container>);
}

export default UserProfile;
