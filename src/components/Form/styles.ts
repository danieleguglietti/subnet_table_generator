import { createStyles, makeStyles, Theme } from '@material-ui/core';

const styles = makeStyles((theme: Theme) => createStyles({
    root: {
        margin: '50px 0',
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        // padding: `0 ${theme.spacing(25)}px`
    },
    root_responsive: {
        marginBottom: '30px',
        flex: 0.8,
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
            marginBottom: '10px',
        }
    },
    select: {
        width: 'max-width'
    },
    txt: {
        width: 'max-width'
    }
}));

export default styles;