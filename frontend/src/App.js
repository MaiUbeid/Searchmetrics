import React, { useState, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Table } from './components';

import './style.scss';

const GET_KEYWORDS = gql`
  query getKeywords($category: String) {
    getKeywords(category: $category) {
      word
      score
      tags
    }
  }
`;

function App() {
  const [input, setInput] = useState('');

  const [categories, setCategories] = useState([
    {
      id: 1,
      title: 'sport',
      keywords: 'athletics, sportsman, sportswoman',
    },
    { id: 2, title: 'dance', keywords: 'terpsichore, trip, the light' },
    { id: 3, title: 'write', keywords: 'publish, compose, pen' },
  ]);

  const inputEl = useRef(null);

  let keywords = [];

  const { data, loading, error } = useQuery(GET_KEYWORDS, {
    variables: { category: input },
  });

  if (error) return <p>Error</p>;

  const handleSubmit = (event) => {
    event.preventDefault();
    setInput(inputEl.current.value);
    if (data) {
      keywords = data.getKeywords.map((item) => {
        return item.word;
      });
    }
    setCategories([
      ...categories,
      {
        id: categories.length + 1,
        title: input,
        keywords: keywords.join(', '),
      },
    ]);
    setInput('');
  };

  return (
    <div className="app">
      <h1 className="app__logo">
        Get <span className="app__logo--span">Categories</span>
      </h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="category"
          placeholder="Type Category..."
          className="app__input"
          ref={inputEl}
        />
        <input
          type="submit"
          value="Add Category"
          className="app__button--text"
        />
      </form>

      <Table
        rows={categories}
        columns={['Category', 'Keywords', '']}
        id={1}
        className="app__table"
        addKeyword={() => {}}
      />
    </div>
  );
}

export default App;
