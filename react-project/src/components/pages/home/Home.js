import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./Lists-Body.css";
import './SideMenu.css';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import ListDataService  from "../../../service/list";
import CategoryDataService from '../../../service/category';
import SideMenuHome from "./SideMenuHome";

/**
 *
 * @param updateRoutes This is a callback to the router that activates whenever a new
 * list is added.
 * @returns {JSX.Element} The body of the home page: the list of lists and the home page's side menu
 * @constructor
 */
function Body({lists, updateLists}) {
	const [display, toggleDisplay] = useState(true);
	const [filter, setFilter] = useState('');
	const [newList, setNewList] = useState({title: undefined, des: undefined})

	useEffect(() => {

		// null check
		if(newList.title !== undefined) {
			let title = newList.title;

			// check if this title exists, and do not proceed if it does
			if(lists.filter(c => {return c.title === title}).length === 0) {
				createList(title);
			}
		}
	}, [newList])

	const createList = (s) => {
		// create the data packet
		let data = {
			title: s,
		};

		// send data packet through axios request
		ListDataService.create(data)
			.then(response => {
				// update the list of lists with the full data
				updateLists(lists.concat(response.data));

				// create data packet for default category
				data = {
					title: 'General',
					description: 'Default category',
					listId: response.data.id
				}

				// send packet to server via axios request
				CategoryDataService.create(data)
					.catch(e => {
						console.log(e);
					});
			})
			.catch(e => {
				console.log(e);
			});
	}

	return (
		<div className="lists-body" style={{minHeight: (window.screen.height - 190)}}>
			<SideMenuHome setNewList={setNewList}/>
			<div className='lists-body-wrapper'>
				<div className='lists-top-bar'>
					<div className="lists-button-wrapper">
						<button
							className='l-bu lists-toggle-button'
							onClick={() => toggleDisplay(true)}
							style={{fontWeight: display ?'bold' : 'normal'}}
						>Recent
						</button>
						<button
							className='l-bu lists-toggle-button'
							onClick={() => toggleDisplay(false)}
							style={{fontWeight: display ?'normal' : 'bold'}}
						>
							All
						</button>
					</div>
					<input
						className='find-list-search l-input'
						type='text'
						placeholder='Search'
						onInput={e => setFilter(e.target.value)}
					/>
				</div>
				<div className="lists-panel">
					{
						// apply specified filter to all list titles
						lists.filter(c => {
							return c.title.toLowerCase().includes(filter.toLowerCase())}
						).map((list,index) => (
							<div className='lists-list'>
								<Link
									className='list-display'
									key={index}
									to={list.title.replace(/ /g, '-')}
								>
										{list.title}
								</Link>
							</div>
						))
					}
				</div>
			</div>
		</div>
	)
}

export default Body; 
