import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
});

const Header = (props) =>  {
        
        const {classes} = props 

        return (
            <header className={classes.root} >
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={12}>
                    <Paper className={classes.paper}>Locale.ai Task</Paper>
                    </Grid>
                </Grid>
            </header>
        );
}

export default withStyles(styles)(Header);