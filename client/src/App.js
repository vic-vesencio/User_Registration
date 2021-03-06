import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from "@material-ui/core/styles"
import './App.css';

import Todos from './MainPage/Todos/Todos';
import Users from './MainPage/Users/Users';

//theme
import { darkTheme, lightTheme } from './Theme';

const App = (props) => {

  return (
    <ThemeProvider theme={localStorage.getItem("preferred-theme") === "dark" ? darkTheme : lightTheme}>
      <Router>
        <Switch>
          <Route path="/todos" exact component={Todos} />
          <Route path="/" exact component={Users} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
