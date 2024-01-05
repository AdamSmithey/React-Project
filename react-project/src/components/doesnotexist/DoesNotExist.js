import React, { useEffect, useState } from "react";
import './DoesNotExist.css'

function DNE() {
    const [show, setShow] = useState(false)
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            console.log('hello')
            setShow(true);
          }, 800) 
      
          // Cleanup fn
          return () => clearTimeout(delayDebounceFn)
    }, []);
    
    return(
        <div className='dne-wrapper'>
            {(show) ? (<div>This page does not exist</div>) : null}
        </div>
    )
}

export default DNE; 