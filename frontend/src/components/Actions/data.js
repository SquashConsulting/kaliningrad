import SaveIcon from '@material-ui/icons/Save';
import LoadIcon from '@material-ui/icons/Publish';
import ResetIcon from '@material-ui/icons/Restore';
import NodeIcon from '@material-ui/icons/AddCircle';
import CollectionIcon from '@material-ui/icons/Share';
import LinkIcon from '@material-ui/icons/PlayForWork';

/* Constant Exports */

export const UI = {
  Dialog: {
    title: 'Are you sure?',
    message: 'If you click "okay" your current state will be erased.',
  },
  ERRORS: {
    invalidFormat: 'Invalid file format, please upload a .json file',
  },
};

export const ACTIONS = [
  {
    type: 'save',
    Icon: SaveIcon,
    name: 'Save The Graph',
  },
  {
    type: 'upload',
    Icon: LoadIcon,
    name: 'Load Graph',
  },
  {
    type: 'reset',
    Icon: ResetIcon,
    name: 'Reset Graph',
  },
  {
    type: 'collection',
    Icon: CollectionIcon,
    name: 'Create A Collection',
  },
  {
    type: 'node',
    Icon: NodeIcon,
    name: 'Create A Node',
  },
  {
    type: 'link',
    name: 'Create A Link',
    Icon: LinkIcon,
  },
];
