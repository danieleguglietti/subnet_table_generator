import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	useMediaQuery,
	useTheme
} from '@material-ui/core';
import React, { useState } from 'react';
import NetManager from '../../Nets';
import { useNetContext } from '../NetProvider/NetProvider';
import styles from './styles';

interface IForm {}

const Form = (props: IForm) => {
	const classes = styles();

	const [validAddress, setAddressValid] = useState(true);
	const [validMask, setMaskValid] = useState(true);

	const [address, setAddress] = useState<string>('');
	const [mask, setMask] = useState<string>('');
	const [n, setN] = useState<number>(2);

	const { dispatch } = useNetContext();

	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('md'));

	const handleAddressInput = (event: React.ChangeEvent<{ value: string }>) => {
		if (!/(?:(?:[1-2]*[0-9]*[0-9])\.){3}(?:[1-2]*[0-9]*[0-9])/.test(event.target.value))
			return setAddressValid(false);

		setAddress(event.target.value);
		setAddressValid(true);

		console.log(address);
	};

	const handleMaskInput = (event: React.ChangeEvent<{ value: string }>) => {
		if (!/(?:255\.)(?:(?:255|0)\.){2}(?:255|0)/.test(event.target.value))
			return setMaskValid(false);

		let valid = true;

		event.target.value.split('.').forEach((byte, i, arr) => {
			if (byte === '255' && arr[i - 1] && arr[i - 1] === '0') {
				setMaskValid(false);
				valid = false;
			}
		});

		if (!valid) return;

		setMask(event.target.value);
		setMaskValid(true);
	};

	const handleNChange = (
		event: React.ChangeEvent<{ value: unknown }>,
		child: React.ReactNode
	) => {
		setN(event.target.value as number);
	};

	const handleOnClick = () => {
		const net: NetManager = new NetManager(address, mask, n);
		const newState = net.createSubnets;

		dispatch({ type: 'UPDATE', payload: newState });
	};

	return (
		<Box component='form' className={matches ? classes.root : classes.root_responsive}>
			<TextField
				variant='outlined'
				error={!validAddress}
				label='Indirizzo'
				className={classes.txt}
				onChange={handleAddressInput}
			/>
			<TextField
				variant='outlined'
				error={!validMask}
				label='Maschera'
				className={classes.txt}
				onChange={handleMaskInput}
			/>
			<Select variant='outlined' onChange={handleNChange} defaultValue={2}>
				{[...Array<number>(63)].map((_, index: number) => (
					<MenuItem key={index} value={index + 2}>
						{index + 2}
					</MenuItem>
				))}
			</Select>
			<Button
				variant='contained'
				color='primary'
				onClick={handleOnClick}
				disabled={
					!validAddress ||
					!validMask ||
					mask.length === 0 ||
					address.length === 0
				}
			>
				Calcola
			</Button>
		</Box>
	);
};

export default Form;
