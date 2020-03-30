import React, { useState, useContext } from 'react';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import SaveIcon from '@material-ui/icons/Save';
import NodeIcon from '@material-ui/icons/Share';
import LinkIcon from '@material-ui/icons/PlayForWork';

import { UIContext } from 'contexts/ui';

import useStyles from './styles';

const Actions = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { setBackdropOpen, setDialogs } = useContext(UIContext);

  const actions = [
    { icon: <SaveIcon />, name: 'Save The Graph', type: 'save' },
    { icon: <NodeIcon />, name: 'Create A Node', type: 'node' },
    {
      type: 'link',
      name: 'Create A Link',
      icon: <LinkIcon className={classes.icon} />,
    },
  ];

  const handler = type => () => {
    setDialogs(type)(true);
  };

  const handleOpen = () => {
    setOpen(true);
    setBackdropOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setBackdropOpen(false);
  };

  return (
    <div className={classes.root}>
      <SpeedDial
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        icon={<SpeedDialIcon />}
        className={classes.speedDial}
        ariaLabel="Open Actions Dial"
      >
        {actions.map(action => (
          <SpeedDialAction
            tooltipOpen
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handler(action.type)}
            classes={{ staticTooltipLabel: classes.tooltip }}
          />
        ))}
      </SpeedDial>
    </div>
  );
};

export default Actions;
