import React from "react";
import "./SidePanel.css";
export default function SidePanel({categoryState, setItemHidden}) {

  return (
    <div className="side">
      {categoryState === undefined ?
        <div className="default">
          select something
        </div> :
        <div className="display">
          <div className="title">
            Title: {categoryState.title}
          </div>
          <div className='description'> 
            Description: {categoryState.description}
          </div>
          <div> 
            <button 
              className='l-input'
              onClick={() => setItemHidden(false)}

            >
              Add Item
            </button>
          </div>
        </div>
      }
    </div>
  )
}