/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";

import Table from "./components/Table/Table";
import AppBar from "./components/AppBar/AppBar";
import Grid from "@material-ui/core/Grid";

import withStyles from "@material-ui/core/styles/withStyles";


let id = 0;
function createData(name, problem, status) {
    id += 1;

    return { id, name, problem, status };
}

const rows = [
    createData('Ionel', 'Depresie', 'In asteptare'),
    createData('Ionel', 'Depresie', 'In asteptare'),
    createData('Ionel', 'Depresie', 'In asteptare'),
    createData('Ionel', 'Depresie', 'In asteptare'),
    createData('Ionel', 'Depresie', 'In asteptare'),
];

class Dashboard extends React.Component {
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
                        {rows}
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
