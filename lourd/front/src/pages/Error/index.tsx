import styled from 'styled-components'
import { StyledContainer } from '../../utils/styles/Atoms.tsx'
import ErrorGif from '../../assets/images/error404.gif'
import { useEffect } from 'react';


const CenteredContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

const ErrorLogo = styled.img`
	max-width: 800px;
	margin: auto;
	margin-bottom: -50px;
	@media all and (max-width: 768px) {
		display: none;
	}
	@media all and (max-height: 720px) {
		display: none;
	}`

const Title = styled.h1`
	font-weight: 300;
	text-align: center;
	`
	
	const SubTitle = styled.h2`
	font-weight: 300;
	text-align: center;
	margin-bottom: 200px;
`

function Error()
{
	useEffect(() => {
		document.title = '404Error - ft_transcendence';
	}, []);
	return (<StyledContainer>
				<CenteredContent>
					<ErrorLogo src={ErrorGif} alt='ErrorGif' />
					<Title>Page not found</Title>
					<SubTitle>The page you are looking for may have been moved, deleted or possibly never existed...</SubTitle>
				</CenteredContent>
			</StyledContainer>);
}

export default Error;
