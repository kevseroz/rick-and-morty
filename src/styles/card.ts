import {createStyles, makeStyles} from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => createStyles({
    root: {
        display: 'flex',
        borderRadius: '10px',
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 20px 0px'

    },
    header: {
        fontWeight: 'bold',
        lineHeight: '28px',
        marginBottom: '30px'
    },
    cover: {
        width: '168px',
        height: '168px'
    },
    subtitles: {

        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    content: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    span: {
        color: '#9ca0a6'
    },
    divMargin: {
        marginBottom: '10px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        padding: '15px 40px'
    },
    dialogIconButton: {
        float: 'right',
    },
    dialogTitle: {
        fontSize: "20px",
        padding: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    filterInput: {
        marginBottom: '15px'
    }
}))