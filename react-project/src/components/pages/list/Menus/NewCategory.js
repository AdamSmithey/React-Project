import React, {useState} from 'react';
import '../List/List.css';

export default function NewCategory({setNewCategoryState, setHidden}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const n = () => {
    setNewCategoryState({title: title, description: description});
    setHidden(true)
    reset();
  }

  const cancel = () => {
    setHidden(true);
    reset();
  }

  const reset = () => {
    setTitle('');
    setDescription('');
  }

  return (<div>
    <div
      className='nc-top'
      style={{
        fontWeight: 500, fontSize: 24, paddingBottom: 8, borderBottomStyle: 'solid'
      }}
    >
      New Category
    </div>
    <div
      className='nc-body'
      style={{
        display: 'flex', flexDirection: 'column', paddingTop: 16,
      }}
    >
      <div
        className='nc-title'
        style={{
          display: 'flex', justifyContent: 'space-between', marginBottom: 16
        }}
      >
        <span style={{paddingTop: 4, fontSize: 18}}>Title</span>
        <input
          className='l-input'
          type='text'
          placeholder='title'
          style={{
            paddingLeft: 8, paddingRight: 8, paddingTop: 6, paddingBottom: 6,

            width: '60%'
          }}
          onInput={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <div
        className='nc-description'
        style={{
          display: 'flex', justifyContent: 'space-between', marginBottom: 12
        }}
      >
        <span style={{paddingTop: 4, fontSize: 18}}>Description</span>
        <textarea
          className='l-input'
          placeholder='description'
          style={{
            paddingLeft: 8, paddingRight: 8, paddingTop: 6, paddingBottom: 6,

            height: 160, width: '60%',

            resize: 'none'
          }}
          onInput={e => setDescription(e.target.value)}
        />
      </div>
      <div
        className='nc-create-cancel'
        style={{
          display: 'flex', justifyContent: 'right',
        }}
      >
        <button
          className='nc-create-button l-input'
          onClick={() => n()}
          style={{
            paddingTop: 3, paddingBottom: 3, paddingLeft: 3, paddingRight: 3,
          }}
        >
          Create
        </button>
        <button
          className='nc-cancel-button l-input'
          onClick={() => cancel()}
          style={{
            marginLeft: 8,

            paddingTop: 3, paddingBottom: 3, paddingLeft: 3, paddingRight: 3,
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>)
}