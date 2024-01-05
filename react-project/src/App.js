import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Footer from './components/footer/Footer';
import NavigationBar from './components/navigation-bar/NavigationBar'
import Home from './components/pages/home/Home';
import List from './components/pages/list/List/List';
import DNE from './components/doesnotexist/DoesNotExist';
import ListDataService  from "./service/list";

import './App.css';

function App() {
	const [state, setState] = useState([]);

	// retrieve the initial list data and store it
	useEffect(() => {
		ListDataService.getAll()
			.then(response => {
				setState(response.data);
			})
			.catch(e => {
				console.log(e);
			});
	},[])

	return(
		<div>
			<NavigationBar/>
			{/* stores and handles all the routes */}
			<Router>
				<Routes>
					{/* create a route for the home directory*/}
					<Route path='/' element={<Home lists={state} updateLists={setState}/>} />
					{
						// create a route for each list
						state.map((list,index) => (
							<Route
								key={index}
								path={`/${list.title.replace(/ /g, '-')}`}
								element={<List/>}
							/>
						))
					}
					{/* routes to a "does not exist" page when the page does not exist*/}
					<Route path='*' element={<DNE wait={1000}/>}/>
				</Routes>
			</Router>
		</div>
	)
}

export default App;
