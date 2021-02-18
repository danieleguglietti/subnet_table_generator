import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@material-ui/core';
import React from 'react';
import type { Net } from '../../Nets';
import { useNetContext } from '../NetProvider/NetProvider';
import styles from './styles';

interface ITabella {}

const Tabella = (props: ITabella) => {
	const classes = styles();
    const { state } = useNetContext();

	return (
		<TableContainer component={Paper}>
			<Table aria-label='simple table' className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell>Indirizzo Sottorete</TableCell>
						<TableCell align='left'>Maschera Sottorete</TableCell>
						<TableCell align='left'>Indirizzo Broadcast</TableCell>
						<TableCell align='left'>Range Indirizzi</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{state.nets.map((net: Net, i: number) => (
						<TableRow key={i}>
							<TableCell>{net.address}</TableCell>
							<TableCell>{net.mask}</TableCell>
							<TableCell>{net.broadcast}</TableCell>
							<TableCell>{net.range}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default Tabella;
