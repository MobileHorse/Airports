import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { userActions, skyActions } from '../_actions';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { InputLabel, Select, MenuItem, FormControl } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 400,
  },
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    marginTop: 100,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  modalContent: {
    marginTop: 0,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    overflow: 'auto',
    maxHeight: 500
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  logout: {
    color: '#ffffff'
  },
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  cardTitle: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

function HomePage() {
  const users = useSelector(state => state.users);
  const states = useSelector(state => state.sky);
  const user = useSelector(state => state.authentication.user);
  const [open, setOpen] = React.useState(false);
  const [departing, setDeparting] = React.useState('');
  const [arriving, setArriving] = React.useState('');
  const [departingFlights, setDepartingFlights] = React.useState('');
  const [arrivingFlights, setArrivingFlights] = React.useState('');
  const [itemValue, setItemValue] = useState('');
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.getAll());
    dispatch(skyActions.getAllStates());

  }, []);

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }


  function getModalStyle() {
    const top = 150;
    const left = 150;

    return {
      top: `${top}%`,
      left: `${left}%`,
      // transform: `translate(-${top}%, -${left}%)`,
    };
  }
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const changeDeparting = (e) => {
    let curTimestamp = new Date().getTime()/1000 | 0;
    console.log("curTimestamp ====> ", curTimestamp);
    let tm = e.target.value;
    getDeparture(itemValue[0], curTimestamp - tm * 60 * 1000, curTimestamp + tm * 60 * 1000);
    getArrival(itemValue[0], curTimestamp - tm * 60 * 1000, curTimestamp + tm * 60 * 1000);
    setDeparting(e.target.value);
  }

  const changeArriving = (e) => {
    let curTimestamp = new Date().getTime()/1000 | 0;
    console.log("curTimestamp ====> ", curTimestamp);
    let tm = e.target.value;
    getDeparture(itemValue[0], curTimestamp - tm * 60 * 1000, curTimestamp + tm * 60 * 1000);
    getArrival(itemValue[0], curTimestamp - tm * 60 * 1000, curTimestamp + tm * 60 * 1000);

    setArriving(e.target.value);
  }

  const body = (
    <div style={modalStyle} className={classes.modalPaper}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-helper-label">departing flights</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={departing}
                onChange={changeDeparting}
              >
                <MenuItem value="">
                  {/* <em>None</em> */}
                </MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </FormControl>
            <Container maxWidth="lg" fixed className={classes.modalContent}>
              <Grid container justify="center">
                {
                  departingFlights && departingFlights.map((val, key) => {
                    return (
                    <Card className={classes.root} variant="outlined" key={key}>
                      <CardContent>
                        <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
                          ICAO: {val.icao24}
                        </Typography>
                        <Typography variant="h5" component="h2">
                          DepartureAirport: {val.estDepartureAirport}
                        </Typography>
                        <Typography variant="body2" component="p">
                          HorizontalDistance : {val.estDepartureAirportHorizDistance}
                        </Typography>
                        <Typography variant="body2" component="p">
                          VerticalDistance : {val.estDepartureAirportVertDistance}
                          <br />
                        </Typography>
                      </CardContent>
                      {/* <CardActions>
                        <Button size="small" onClick={() => { getCityInfo(value); }}>Flight Info</Button>
                      </CardActions> */}
                    </Card>
                    );
                  })
                }
              </Grid>
            </Container>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-helper-label">arriving flights</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={arriving}
                onChange={changeArriving}
              >
                <MenuItem value="">
                  {/* <em>None</em> */}
                </MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </FormControl>
            <Container fixed maxWidth="lg" className={classes.modalContent}>
              <Grid container justify="center">
              {
                  arrivingFlights && arrivingFlights.map((val, key) => {
                    return (
                    <Card className={classes.root} variant="outlined" key={key}>
                      <CardContent>
                        <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
                          ICAO: {val.icao24}
                        </Typography>
                        <Typography variant="h5" component="h2">
                          ArrivalAirport: {val.estArrivalAirport}
                        </Typography>
                        <Typography variant="body2" component="p">
                          HorizontalDistance : {val.estArrivalAirportHorizDistance}
                        </Typography>
                        <Typography variant="body2" component="p">
                          VerticalDistance : {val.estArrivalAirportVertDistance}
                          <br />
                        </Typography>
                      </CardContent>
                      {/* <CardActions>
                        <Button size="small" onClick={() => { getCityInfo(value); }}>Flight Info</Button>
                      </CardActions> */}
                    </Card>
                    );
                  })
                }
              </Grid>
            </Container>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );

  function getCityInfo(value) {
    console.log(value);
    let curTimestamp = new Date().getTime()/1000 | 0;
    console.log("curTimestamp ====> ", curTimestamp);
    getDeparture(value[0], curTimestamp - 10 * 60 * 1000, curTimestamp + 10 * 60 * 1000);
    getArrival(value[0], curTimestamp - 10 * 60 * 1000, curTimestamp + 10 * 60 * 1000);
    setOpen(true);
    setItemValue(value);
  }

  function getDeparture(icao, begin, end) {
    var options = {
      method: 'GET',
      headers: {}
    };
    fetch('https://opensky-network.org/api/states/all?icao='+ icao +'&time=' + begin, options)
    // fetch('https://opensky-network.org/api/flights/departure?airport=EDDF&begin=' + begin + '&end=' + end, options)
    // fetch('https://opensky-network.org/api/flights/departure?airport='+ airport +'&begin=' + begin + '&end=' + end, options)
      .then(response => response.json())
      .then(data => {
        setDepartingFlights(data);
        // dispatch(success(data));
        // history.push('/');
      })
      .catch(error => {
        // dispatch(failure(error.toString()));
        // dispatch(alertActions.error(error.toString()));
      });
  }

  function getArrival(airport, begin, end) {
    var options = {
      method: 'GET',
      headers: {}
    };
    fetch('https://opensky-network.org/api/flights/arrival?airport=EDDF&begin=1517227200&end=1517230800', options)
    // fetch('https://opensky-network.org/api/flights/arrival?airport='+ airport +'&begin=' + begin + '&end=' + end, options)
      .then(response => response.json())
      .then(data => {
        setArrivingFlights(data);
        // dispatch(success(data));
        // history.push('/');
      })
      .catch(error => {
        // dispatch(failure(error.toString()));
        // dispatch(alertActions.error(error.toString()));
      });
  }

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
            </Typography>
          <Typography component="h1" variant="h6" noWrap>
            <Link href="login" className={classes.logout}>
              Logout
              </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container justify="center">
            {states !== undefined && states.items !== undefined && states.items.states.map((value, key) => {
              return (key <= 10) && (
                <Card className={classes.root} variant="outlined" key={value[0]}>
                  <CardContent>
                    <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
                      {value[2]}
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {value[1]}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Latitude : {value[5]}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Longitude : {value[6]}
                      <br />
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => { getCityInfo(value); }}>Flight Info</Button>
                  </CardActions>
                </Card>
              )
            })}
          </Grid>
        </Container>
      </main>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        {body}
      </Modal>
    </div>
  );
}

export { HomePage };
