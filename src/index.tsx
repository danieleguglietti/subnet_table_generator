import React from 'react';
import ReactDOM from 'react-dom';

import {
	CssBaseline,
	ThemeProvider,
	Theme,
	createMuiTheme,
	Grid,
	makeStyles,
	createStyles,
	Typography
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
			display: 'flex',
			justifyContent: 'center',
			padding: '10px'
		},
		copy: {
			fontSize: '.9rem'
		},
		a: {
			color: '#707070',
			textDecoration: 'none',
			transition: 'all .2s ease-in-out',
			'&:hover': {
				color: 'black'
			}
		},
        foo: {
            marginTop: '75px'
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
					<footer className={classes.foo}>
						<Typography className={classes.copy}>
							Guglietti Daniele &copy; 2021. Code is aviable on{' '}
							<a href='https://github.com/danieleguglietti/subnet_table_generator' className={classes.a}>
								GitHub
							</a>{' '}
							repository.
						</Typography>
					</footer>
				</Grid>
				<Grid item md={2} />
			</Grid>
		</ThemeProvider>
	);
};

const rootElement: HTMLElement | null = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

// if(import.meta.hot) import.meta.hot.accept();
