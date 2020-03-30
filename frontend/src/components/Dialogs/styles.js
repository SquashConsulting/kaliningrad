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
  formControl: {
    width: '33%',
    margin: theme.spacing(1),
  },
  collection: {
    textTransform: 'capitalize',
  },
}));
