import {FaChevronDown, FaChevronRight} from "react-icons/fa";
import React, {useState} from "react";

export default function SideMenuHome({setNewList}) {
  const titleLimit = 80;
  const desLimit = 300;

  const [open, setOpen] = useState(false);
  const [state, setState] = useState({title: "", des: ""})
  
  // set new list data to main body and reset local state
  const create = () => {
    setNewList(state);
    clear();
  }

  const clear = () => {
    setState({title: "", des: ""})
  }

  return (
    <div className='side-menu'>
      <div className="side-menu-new-bar-wrapper">
        <button
          className='sm-nl-bu l-bu new-list'
          onClick={() => setOpen(!open)}
        >
          New
        </button>
        <button
          className='sm-nl-bu new-list-chevron l-bu'
          onClick={() => setOpen(!open)}
        >
          {
            (open) ?
              <FaChevronDown /> :
              <FaChevronRight />
          }
        </button>
      </div>
      <div className='side-menu-new-wrapper'>
        <div
          className={
            (open) ?
              'side-menu-new side-menu-new-t':
              'side-menu-new'
          }>
          <div className='sm-nl-title'>
            <div>
								<span className='sm-nl-title-text'>
									Title
								</span>
            </div>
            <input
              className="sm-nl-title-input l-input"
              value={state.title}
              onKeyDown={e => {
                if(e.key === 'Enter') {
                  create()
                }
              }}
              onInput={(e) => {
                // set new title if title does not exceed the length limit
                if(state.title.length+1 !== titleLimit) {
                  setState(prevState => ({...prevState, title: e.target.value}))
                }
              }}
            />
          </div>
          <div className="nl-create-cancel">
            <button
              className='sm-nl-bu-in l-input'
              onMouseUp={() => clear()}
            >
              Clear
            </button>
            <button
              className='sm-nl-bu-in l-input'
              onMouseUp={() => create()}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}