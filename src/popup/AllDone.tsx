import * as React from 'react';
import Typography from '@material-ui/core/Typography';

interface IProps {}

export class AllDone extends React.Component<IProps> {
  render() {
    return (
      <Typography variant='h6'>Reported! All done for today...</Typography>
    );
  }
}
