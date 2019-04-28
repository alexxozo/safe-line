/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";

import Table from "./components/Table/Table";
import AppBar from "./components/AppBar/AppBar";
import Grid from "@material-ui/core/Grid";

import withStyles from "@material-ui/core/styles/withStyles";

import axios from 'axios';
import socketIo from 'socket.io-client';

import { apiUrl } from './config';
class Dashboard extends React.Component {

    state = {
        rows: [],
        socket: null
    };

    async componentDidMount() {
        this.getPatients();
        const socket = socketIo(`${apiUrl}/psychologist`);
        socket.on('patientsChanged', this.getPatients);
        this.setState({ socket });
    }

    getPatients = async () => {
        const response = await axios.get(`${apiUrl}/api/patient`);
        const rows = response.data.map((patient) => {
            console.log(patient);
            return({
                ...patient,
                status: 'In asteptare',
            })
        });
        this.setState({ rows });
    }

    render() {

        return (
            <div>
                <AppBar></AppBar>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justify="center"
                >
                    <Table>
                        {this.state.rows}
                    </Table>

                </Grid>
            </div >

        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default Dashboard;
