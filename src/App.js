import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Images from './components/Images';
import Homepage from './components/Homepage';
import Footer from './components/Footer';

const App = () => (
	<>
		<div className="App">
			<Router>
				<Switch>
					<Route path="/" exact component={Homepage} />
					<Route path="/images" exact component={Images} />
				</Switch>
			</Router>
		</div>
		<Footer />
	</>
);

export default App;
