import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles((theme) => ({
  root: {
    width: '100%',
    outline: 'none',
    padding: theme.spacing(4),
  },
  modal: {
    width: '50%',
    flexShrink: 0,
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    float: 'right',
    height: '100%',
    outline: 'none',
    minWidth: '30vw',
    overflowY: 'auto',
    padding: theme.spacing(2),
    transition: theme.transitions.create('width'),
  },
  content: {
    outline: 'none',
    marginTop: theme.spacing(8),
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    textTransform: 'capitalize',
    marginRight: theme.spacing(2),
  },
  contentTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentButton: {
    display: 'flex',
    marginTop: theme.spacing(4),
    flexDirection: 'row-reverse',
  },
  error: {
    width: '70%',
    marginTop: theme.spacing(2),
  },
}));
