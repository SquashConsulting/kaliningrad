import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '98vh',
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: '#fcfcfc',
  },
  graph: {
    backgroundColor: theme.palette.common.white,
  },
  backdrop: {
    zIndex: theme.zIndex.speedDial - 1,
  },
}));
