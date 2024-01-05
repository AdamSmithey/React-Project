import React, {useEffect, useState} from "react";
import "./Contents.css";

export default function Content({content, setPopout}) {
  const [des, setDes] = useState({
    x: undefined,
    y: undefined,
    hover: undefined,
    over: false})
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // sends the popout to the list object
    let popout =
      <div
        className={`content-description popout ${loaded ? "fade-out" : "fade-in"}`}
        //hidden = {loaded}
        style={{
          top: des.y - 30,
          left: des.x - 5,
          maxWidth: 200,
        }}
        // onMouseOver={() =>
        //   setDes(prevState => ({
        //     ...prevState,
        //     hover: false,
        //     over: true})
        // )}
        onMouseLeave={() =>
          setDes(prevState => ({
            ...prevState,
            over: false})
        )}
      >
        {content.description}
      </div>

    if(des.hover !== undefined) {
      const timeout =
        setTimeout(() => {
          setPopout(popout);
          setLoaded((des.hover || des.over) && !loaded);
        }, !loaded ? 1000 : 0);

      return () => clearTimeout(timeout);
    }

  }, [des])

  return (
    <div>
      <div
        className="contents"
        style={{marginTop: (content.index === 0) ? 0 : 4}}
        onMouseOver={(e) =>
          setDes(prevState => ({
            ...prevState,
            hover: true,
            over: false})) 
        }
        onMouseLeave={(e) =>
          setDes(prevState => ({
            ...prevState,
            hover: false}))
        }
        onMouseMove={(e) => {
          if(!loaded) {
            setDes(prevState => ({
              ...prevState,
              x: e.pageX,
              y: e.pageY}))
          }
        }}

      >
        {content.content}
      </div>
    </div>
  )
}
