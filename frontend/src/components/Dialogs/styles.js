import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  selects: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectsColumn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    margin: theme.spacing(2),
  },
  formControl: {
    width: '33%',
    margin: theme.spacing(1),
  },
  formControlFull: {
    width: '100%',
  },
  collection: {
    textTransform: 'capitalize',
  },
  content: {
    minHeight: 400,
  },
  error: {
    marginTop: theme.spacing(2),
  },
}));
