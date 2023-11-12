import styled from 'styled-components'

export const StyledContainer = styled.main`
	background-color:rgb(25, 25, 25, 0.5);
	position: fixed;
	top: 54%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 75%;
	height: 75%;
	border: 2px solid dimgrey;
	border-radius: 10px;
	text-shadow: 2px 2px 9px black;
	@media all and (max-height: 832px) {
		top: 55%;
		width: 100%;
		height: 90%;
		border-radius: 0px;
	}
`;
