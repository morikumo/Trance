import { createGlobalStyle } from 'styled-components'
import Background from '../../assets/images/background.gif'

const GlobalStyle = createGlobalStyle`
	@font-face {
		font-family: 'PixelFont';
		src: url('./src/assets/other/PixelFont.ttf') format('truetype');
	}
	* {
		color: white;
		text-decoration: none;
		outline: none;
		font-family: 'PixelFont', sans-serif;
		&::selection {
			background-color: transparent;
	}
	body {
		background: url(${Background});
		margin: 0;
		}
	}`

export default GlobalStyle;
