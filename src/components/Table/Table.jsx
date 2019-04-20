import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ButtonModal from "../Buttons/ButtonModal";

import LocalHospital from '@material-ui/icons/LocalHospital';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#ff3333",
    color: theme.palette.common.white,
    fontSize: 18,
    fontWeight: "bold"
  },
  body: {
    fontSize: 16
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '90%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

function CustomizedTable(props) {
  const { classes, children } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Nume</CustomTableCell>
            <CustomTableCell align="right">Problema</CustomTableCell>
            <CustomTableCell align="right">Descriere</CustomTableCell>
            <CustomTableCell align="right">Status</CustomTableCell>
            <CustomTableCell align="right">Ajuta</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {children.map(row => (
            <TableRow className={classes.row} key={row.id}>
              <CustomTableCell component="th" scope="row">
                {row.name}
              </CustomTableCell>
              <CustomTableCell align="right">{row.problem}</CustomTableCell>
              <CustomTableCell align="right">
                <ButtonModal></ButtonModal>
              </CustomTableCell>

              <CustomTableCell style={{
                color: row.status === 'In asteptare' ? 'red' : 'green'
              }} align="right">{row.status}</CustomTableCell>
              <CustomTableCell align="right">
                <Button variant="contained" style={{ background: "#ff3333", color: "white", fontWeight: "bold" }} className={classes.button}>
                  Ajuta
                  <LocalHospital />
                </Button>
              </CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);