import React from 'react';

import CloseIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

const ModalContentWrapper = ({ title, onClose, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.contentTitle}>
        <IconButton color="primary" onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h5">{title}</Typography>
      </div>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default ModalContentWrapper;
