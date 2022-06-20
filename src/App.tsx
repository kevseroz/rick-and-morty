import React from 'react';
import './App.css';
import Characters from "./pages/characters";
import {Container} from "@material-ui/core";
import {useStyles} from "./styles/app";

function App() {
    const classes = useStyles()
  return (
    <Container className={classes.container}>
      <Characters />
    </Container>
  );
}

export default App;
