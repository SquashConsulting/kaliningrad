import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  speedDial: {
    position: 'absolute',
    right: theme.spacing(2),
    bottom: theme.spacing(2),
  },
  icon: {
    transform: 'rotate(270deg)',
  },
  tooltip: {
    textAlign: 'center',
    width: 'calc(100% + 80px)',
  },
}));
