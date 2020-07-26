import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Table from './components/Table';
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
  const [categories, setCategories] = useState([]);
  const rows = [];
  let keywords = [];

  const { data, loading, error } = useQuery(GET_KEYWORDS, {
    variables: { category: 'water' },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const handleChange = ({ target: { value } }) => {
    if (value !== '') {
      value = value.trim().toLowerCase();
      setInput(value);
    }
  };

  const handleClick = () => {
    console.log('input: ', input);
    if (data) {
      keywords = data.getKeywords.map((item) => {
        return item.word;
      });
    }
    setCategories([
      ...categories,
      { id: categories.length + 1, title: input, keywords: keywords },
    ]);

    rows.push(categories[0]);
    // console.log(categories);
  };

  return (
    <div className="app">
      <h1 className="app__logo">
        Get <span className="app__logo--span">Categories</span>
      </h1>

      <input
        type="text"
        name="category"
        placeholder="Type Category..."
        className="app__input"
        onChange={handleChange}
      />

      {console.log(rows)}
      <Table
        rows={rows}
        columns={['Category', 'Keywords', '']}
        id={1}
        className="app__table"
        // addKeyword={addKeyword}
      />

      <div className="app__button">
        <button className="app__button--text" onClick={() => handleClick()}>
          Add Category
        </button>
      </div>
    </div>
  );
}

export default App;
