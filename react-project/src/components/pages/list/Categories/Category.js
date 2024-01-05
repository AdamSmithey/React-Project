import React, {useEffect, useState} from 'react';
import {FaChevronDown, FaChevronRight, FaEdit, FaTrashAlt} from 'react-icons/fa';
import {IconContext} from 'react-icons/lib';
import './Category.css'
import ContentDataService from "../../../../service/content";
import Content from "../Contents/Content";

function Category({category, active, setActive, setDestroyed, newContentState, setPopout}) {
  const [isOpen, setOpen] = useState(false);
  const [contents, setContents] = useState([]);

  useEffect(() => {
    getContents(category.id);
  }, [category])

  useEffect(() => {
    // check to make sure this state exists
    // to avoid calling this function on preload
    if (!(newContentState === undefined)) {
      createContent(newContentState);
    }
  }, [newContentState])

  const getContents = (id) => {
    ContentDataService.get(id)
      .then(response => {
        setContents(response.data);
      })
      .catch(e => {
        console.log(e);
      });

  }

  const createContent = (c) => {
    let data = {
      content: c.contents,
      description: c.description,
      categoryId: c.categoryId,
      index: contents.length
    }

    ContentDataService.create(data)
      .then(response => {
        setContents(contents.concat(response.data))
      })
  }

  const deleteThis = () => {
    contents.forEach(c => {
      ContentDataService.delete(c.id)
    })

    setDestroyed(category);
  }

  const toggleOpen = (direct) => {
    if(!(isOpen && !(active === category)) || direct) setOpen(!isOpen)
    setActive(category);
  }

  return (
    <div
      className='category'
      onClick={() => {
      }}
    >
      <div className='category-top'>
        <button
          className='category-button'
          onClick={() => toggleOpen(false)}
        >
          {category.title}
        </button>

        <div
          className='category-other'
        >
          <IconContext.Provider
            value={{
              style: {
                backgroundColor: 'inherit', position: 'relative'
              }
            }}
          >
            <button
              style={{paddingRight: 18, borderStyle: 'none'}}
              onClick={() => {
                contents.forEach(c => {
                  ContentDataService.delete(c.id)
                })

                setDestroyed(category);
              }}
            >
              <FaTrashAlt/>
            </button>

            <button
              style={{paddingRight: 16, borderStyle: 'none'}}
              onClick={() => {}}
            >
              <FaEdit/>
            </button>

            <button
              style={{borderStyle: 'none'}}
              onClick={() => toggleOpen(true)}
            >
              {isOpen ? <FaChevronDown/> : <FaChevronRight/>}
            </button>
          </IconContext.Provider>
        </div>
      </div>

      <div className={isOpen ? 'category-body-wrapper' : 'category-body-wrapper w-hidden '}>
        <div className={isOpen ? 'category-body hidden' : 'category-body'}>
          {contents.map((c, index) => (
            <Content key={index} content={c} setPopout={setPopout}/>
          ))}
          <div
            style={{backgroundColor: 'inherit'}}
            hidden={contents.length > 0}
          >
            Add some stuff
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category;
