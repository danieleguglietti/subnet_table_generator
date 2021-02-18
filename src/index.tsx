import React from 'react';
import ReactDOM from 'react-dom';

import {
	CssBaseline,
	ThemeProvider,
	Theme,
	createMuiTheme,
	Grid,
	makeStyles,
	createStyles
} from '@material-ui/core';

const theme: Theme = createMuiTheme({
	palette: {
		type: 'dark'
	},
	typography: {
		fontFamily: 'Ubuntu',
		fontSize: 17
	}
});

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		main: {
			display: 'flex'
		}
	})
);

import { Tabella, Form, ProviderNet } from './components';

const App = () => {
	const classes = useStyles();

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Grid container>
				<Grid item md={2} />
				<Grid container item sm={12} md={8} className={classes.main}>
					<ProviderNet>
						<Form />
						<Tabella />
					</ProviderNet>
				</Grid>
				<Grid item md={2} />
			</Grid>
		</ThemeProvider>
	);
};

const rootElement: HTMLElement | null = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

// if(import.meta.hot) import.meta.hot.accept();
