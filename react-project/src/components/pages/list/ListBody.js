import React, {useEffect, useState} from 'react';
import {FaChevronDown, FaChevronRight, FaEdit, FaTrashAlt} from 'react-icons/fa';
import {IconContext} from 'react-icons/lib';
import './List/List.css';
import ListDataService from "../../../service/list";
import CategoryDataService from '../../../service/category';
import ContentDataService from "../../../service/content";

function ListBody({setHidden, setCategoryState, newCategoryState, newItemState}) {
  const [filter, setFilter] = useState('');
  const [openCategories, setOpenCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState();
  const [state, setState] = useState({list: [], categories: [], contents: new Map()});

  useEffect(() => {
    getList(window.location.pathname.split('/').pop())
  }, [])

  useEffect(() => {
    console.log("NEW CATEGORY STATE")
    console.log(newCategoryState);
    createCategory(newCategoryState);

  }, [newCategoryState]);

  useEffect(() => {
    console.log("NEW ITEM STATE")
    console.log(newItemState);
    createContents(newItemState)
  }, [newItemState])

  const applyFilter = (d) => {
    let v = [];
    d.map(l => {
      if (l.title.toLowerCase().includes(filter.toLowerCase())) {
        v.push(l);
      }
    })
    return v;
  }

  const getList = (title) => {
    ListDataService.get(title)
      .then(response => {
        setState(prevState => ({...prevState, list: response.data}));
        getCategories(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  const getCategories = (data) => {
    var temp = []

    CategoryDataService.get()
      .then((response) => {
        temp = response.data.filter(c => {
          return c.listId === data.id
        })
        console.log(temp)
        let map = new Map();
        temp.map(m => {
          map.set(m.id, [])
        })

        setState(prevState => (
          {...prevState,
            categories: temp,
            contents: map
          }));
        temp.map(c => getContents(c));
      })
      .catch(e => {
        console.log(e);
      });
  }

  const getContents = (data) => {
    ContentDataService.get(data.id)
      .then(response => {
        setState(prevState => ({
          ...prevState, contents: state.contents.set(data.id, response.data)
        }));
      })
      .catch(e => {
        console.log(e);
      });

  }

  const createContents = (newContent) => {
    let temp = state.contents.get(newContent.categoryId);
    let data = {
      content: newContent.contents, description: newContent.description, categoryId: newContent.categoryId
    }

    if (temp !== undefined) temp.push(data)
    setState(prev => (
      {...prev,
        contents: state.contents.set(newContent.id, temp)
      }));

    ContentDataService.create(data)

  }

  const createCategory = (n) => {
    let temp;
    let data = {
      title: n.title === '' ? 'Untitled' : n.title, description: n.description, listId: state.list.id
    }

    CategoryDataService.create(data)

    // temp = state.categories;
    // temp.push(response.data);
    // console.log(response.data);
    // setState(prevState => (
    //   {...prevState,
    //     categories: temp,
    //     contents: state.contents.set(response.data.id, temp)
    //   }));
  }

  const deleteContents = (id) => {
    ContentDataService.delete(id)
      .then(response => {
        console.log(response.data);
      })
  }

  const activateCategory = (category) => {
    setActiveCategory(category);
    setCategoryState(category);
  }

  const toggle = (category) => {
    let temp = openCategories.filter(c => {
      return c !== category;
    })

    if (temp.length === openCategories.length) {
      temp.push(category);
      activateCategory(category)
    }

    setOpenCategories(temp);
  }

  return (<div className='body'>
    <div className='list-top-bar'>
      <div className='list-title'>
        {state.list.title}
      </div>

      <div className='list-top-bar-lw'>
        <button
          className='list-new-category l-input'
          onClick={() => setHidden(false)}
        >
          Add Category
        </button>

        <input
          className='list-search l-input'
          type='text'
          placeholder='Search'
          onInput={e => setFilter(e.target.value)}
        />
      </div>
    </div>

    <div className='list-main-display'>
      {applyFilter(state.categories).map((c, index) => (<div
        key={index}
        className='list-category'
        onClick={() => {
        }}
      >
        <div className='category-top'>
          <button
            className='category-button'
            onClick={() => toggle(c)}
          >
            {c.title}
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
                onClick={() => deleteCategory(c.id)}
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
                onClick={() => toggle(c)}
              >
                {openCategories.includes(c) ? <FaChevronDown/> : <FaChevronRight/>}
              </button>
            </IconContext.Provider>
          </div>
        </div>

        <div className={openCategories.includes(c) ? 'category-body-wrapper' : 'category-body-wrapper w-hidden '}
        >
          <div className={openCategories.includes(c) ? 'category-body hidden' : 'category-body'}>
            {(state.contents.get(c.id) !== undefined && state.contents.get(c.id).length > 0) ? state.contents.get(c.id).map((m, index2) => (
                <div
                  style={{
                    backgroundColor: 'inherit', paddingTop: (index2 !== 0) ? 12 : 0
                  }}
                  key={index2}
                >
                  {m.content}
                </div>)) :

              <div
                style={{backgroundColor: 'inherit'}}
              >
                Add some stuff
              </div>}
          </div>
        </div>
      </div>))}
    </div>
  </div>)
}

export default ListBody;
