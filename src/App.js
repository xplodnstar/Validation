import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Form from './Form'
import Submit from './Submit'
import './App.css';

const App = (props) => (
  <Router>
    <div id="page">
      <Route exact path="/" component={Form} />
      <Route exact path="/submit" component={Submit} />
    </div>
  </Router >
)

export default App;
