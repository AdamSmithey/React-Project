import React, {useEffect, useState} from 'react';
import NewCategory from '../Menus/NewCategory';
import SidePanel from '../SidePanel/SidePanel';
import './List.css';
import NewItem from '../Menus/NewItem';
import Category from "../Categories/Category";
import CategoryDataService from "../../../../service/category";
import ListDataService from "../../../../service/list";

function List() {
  const [filter, setFilter] = useState('');

  const [categoryHidden, setCategoryHidden] = useState(true);
  const [itemHidden, setItemHidden] = useState(true);

  const [newCategoryState, setNewCategoryState] = useState();
  const [newContentState, setNewContentState] = useState({categoryId: -1});
  const [activeCategory, setActiveCategory] = useState();

  const [top, setTop] = useState();
  const [state, setState] = useState({list: [], categories: []});

  const [popout, setPopout] = useState();

  useEffect(() => {
    getList(
      window.location.pathname
        .split('/')
        .pop()
        .replace('-', " ")
    )
  }, [])

  useEffect(() => {
    // new item menu
    if (!itemHidden) {
      setTop(buildComponent(
        <NewItem
          categoryState={activeCategory}
          setNewItemState={setNewContentState}
          setHidden={setItemHidden}
        />
      ))
    }
    // new category menu
    else if (!categoryHidden) {
      setTop(buildComponent(
        <NewCategory
          setNewCategoryState={setNewCategoryState}
          setHidden={setCategoryHidden}
        />
      ))
    } else setTop(null)
  }, [categoryHidden, itemHidden]);

  // create a new category when the newCategoryState
  // is updated.
  useEffect(() => {
    // check to make sure this state exists
    // to avoid calling this function on preload
    if (!(newCategoryState === undefined)) {
      createCategory(newCategoryState);
    }
  }, [newCategoryState])

  const getList = (title) => {
    ListDataService.get(title)
      .then(response => {
        setState(prevState => ({...prevState, list: response.data}));
        getCategories(response.data.id);
      })
      .catch(e => {
        console.log(e);
      });
  }

  const getCategories = (id) => {

    // get category data from db
    CategoryDataService.get()
      .then((response) => {

        // update state
        setState(prevState => ({
          ...prevState,
          categories:
          // filter the data and return
          // an array of categories
            response.data.filter(c => {
              return c.listId === id
            }
            ),
        }));
      })
      .catch(e => {
        console.log(e);
      });
  }

  const createCategory = (n) => {
    // instantiate new data packet
    let data = {
      title: n.title === '' ? 'Untitled' : n.title,
      description: n.description,
      listId: state.list.id
    }

    // create new category
    CategoryDataService.create(data)
      .then(response => {
        // update state
        setState(prevState => (
          {
            ...prevState,
            categories: state.categories.concat(
              response.data
            )
          }
        ))
      })
  }

  const deleteCategory = (category) => {
    if(activeCategory === category) setActiveCategory(undefined);

    setState(prev => ({
      ...prev, categories: state.categories.filter(c => {
        return c !== category;
      })
    }))
    
    CategoryDataService.delete(category.id)
      .then(response => {
        console.log(response.data);
      })
  }

  return (
    <div className='list' style={{minHeight: (window.screen.height - 190)}}>
      <SidePanel
        categoryState={activeCategory}
        setItemHidden={setItemHidden}
      />
      <div className='body'>
        <div className='list-top-bar'>
          <div className='list-title'>
            {state.list.title}
          </div>

          <div className='list-top-bar-lw'>
            <button
              className='list-new-category l-input'
              onClick={() => setCategoryHidden(false)}
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
          { // filter categories according to search value
            state.categories.filter(l => {
              return l.title.toLowerCase().includes(filter.toLowerCase().trim())
            }).map((c, index) => (
              <Category
                key={index}
                category={c}
                active={activeCategory}
                setActive={setActiveCategory}
                setDestroyed={deleteCategory}
                newContentState={newContentState.categoryId === c.id ? newContentState : undefined}
                setPopout={setPopout}
              />
            ))
          }
        </div>
      </div>
      {popout}
      {top}
    </div>
  )
}

function buildComponent(thing) {
  return (
    <div
      style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        marginTop: -50,
        padding: '15% 38%',
        backgroundColor: 'rgba(0, 0, 0, .7)',
        zIndex: 90
      }}>
      <div
        style={{
          padding: 32,
          borderRadius: 5,
          backgroundColor: 'rgb(255, 255, 255)'
        }}
      >
        {thing}
      </div>
    </div>
  )
}

export default List;
