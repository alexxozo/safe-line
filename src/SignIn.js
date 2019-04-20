import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LocalHospital from '@material-ui/icons/LocalHospital';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Joyride from 'react-joyride';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: "50%",
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
        backgroundColor: "red"
    },
});

class SignIn extends React.Component {

    state = {
        problem: 'Depresie',
        name: 'problem',
        run: true,
        steps: [
            {
                placement: 'center',
                target: '.hello',
                content: (
                    <div>
                        <h1 style={{
                            fontSize: "100px"
                        }}>😁</h1>
                        <h1>Salut!</h1>
                    </div>
                ),
            },
            {
                placement: 'center',
                target: '.hello',
                content: (
                    <div>
                        <h1 style={{
                            fontSize: "100px"
                        }}>🤦‍</h1>
                        <h2>Simti nevoia sa vorbesti cu cineva despre problemele tale?</h2>
                    </div>
                ),
            },
            {
                placement: 'center',
                target: '.hello',
                content: (
                    <div>
                        <h1 style={{
                            fontSize: "100px"
                        }}>💯</h1>
                        <h2>"Vorbeste cu un psiholog" este primul serviciu roman de asistenta medicala online!</h2>
                    </div>
                ),
            },
            {
                placement: 'center',
                target: '.hello',
                content: (
                    <div>
                        <h1 style={{
                            fontSize: "100px"
                        }}>👩‍⚕</h1>
                        <h2>Psihologi acreditati si voluntari experimentati te vor ajuta sa treci peste problemele care te apasa.</h2>
                    </div>
                ),
            },
            {
                placement: 'center',
                target: '.hello',
                content: (
                    <div>
                        <h1 style={{
                            fontSize: "100px"
                        }}>🔏 </h1>
                        <h2>Intreaga conversatie va fi confidentiala si nu vom folosi deloc datele tale personale!</h2>
                    </div>
                ),
            },
            {
                placement: 'center',
                target: '.hello',
                content: (
                    <div>
                        <h1 style={{
                            fontSize: "100px"
                        }}>🤝</h1>
                        <h1>Este simplu</h1>
                        <h2>Introdu datele ce ne vor ajuta sa te conectam cu un psiholog iar apoi apasa butonul rosu!</h2>
                    </div>
                ),
            },
        ]
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { classes } = this.props;
        const { steps, run } = this.state;

        return (
            <main className={classes.main}>
                <Joyride
                    continuous
                    run={run}
                    scrollToFirstStep
                    showProgress
                    showSkipButton
                    steps={steps}
                />
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LocalHospital />
                    </Avatar>
                    <Typography className="hello" component="h1" variant="h5">
                        Safe-Line
                    </Typography>
                    <form className={classes.form}>
                        <FormControl className="info" margin="normal" required fullWidth>
                            <InputLabel htmlFor="name">Nume</InputLabel>
                            <Input id="name" name="name" autoComplete="name" autoFocus />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Problema</InputLabel>
                            <Select
                                value={this.state.problem}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'problem',
                                    id: 'problem-select',
                                }}
                            >
                                <MenuItem value="Depresie"><em>Depresie</em></MenuItem>
                                <MenuItem value="Anxietate">Anxietate</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                placeholder="Detalii Suplimentare"
                                multiline={true}
                                rows={1}
                                rowsMax={4}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Contacteaza un psiholog
          </Button>
                    </form>
                </Paper>
            </main>
        );
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);