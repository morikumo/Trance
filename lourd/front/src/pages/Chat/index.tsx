import { useEffect } from 'react';
import { StyledContainer } from '../../utils/styles/Atoms.tsx'

function Chat()
{
	useEffect(() => {
		document.title = 'Chat - ft_transcendence';
	}, []);
  return (
		<StyledContainer>
			Chat
		</StyledContainer>
  );
}

export default Chat;
