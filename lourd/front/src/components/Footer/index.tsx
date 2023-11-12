import styled from 'styled-components'

const Container = styled.footer`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: fixed;
	bottom: 0;
	width: 100%;
	font-size: 17px;
	@media all and (max-height: 832px) {
		display: none;
	}
`;

const NamesContainer = styled.div`
	display: flex;
	flex-direction: row;
`;

const StyledLink = styled.a`
	font-size: 15px;
	padding: 15px;
	&:hover{color: darkgrey;}
	@media all and (max-width: 512px) {
		padding: 10px;
	}
`;

function Footer()
{
	return (<Container>
				Creators
				<NamesContainer>
					<StyledLink href="https://profile.intra.42.fr/users/mabid" target="_blank">mabid</StyledLink>
					<StyledLink href="https://profile.intra.42.fr/users/rben-tkh" target="_blank">rben-tkh</StyledLink>
					<StyledLink href="https://profile.intra.42.fr/users/lkurdy" target="_blank">lkurdy</StyledLink>
					<StyledLink href="https://profile.intra.42.fr/users/anrechai" target="_blank">anrechai</StyledLink>
					<StyledLink href="https://profile.intra.42.fr/users/aperis" target="_blank">aperis</StyledLink>
				</NamesContainer>
			</Container>);
}

export default Footer;
