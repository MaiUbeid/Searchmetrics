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
  const inputEl = useRef(null);
  const [input, setInput] = useState(null);

  const [categories, setCategories] = useState([
    {
      id: 1,
      title: 'sport',
      keywords: [
        'athletics',
        'sportsman',
        'sportswoman',
        'fun',
        'paly',
        'disport',
        'lark',
        'boast',
        'rollick',
        'frolic',
      ],
    },
    {
      id: 2,
      title: 'dance',
      keywords: [
        'terpsichore',
        'trip the light fantastic',
        'dancers',
        'tango',
        'choreography',
        'choreographer',
        'waltz',
        'troupe',
        'ballroom',
        'music',
      ],
    },
    {
      id: 3,
      title: 'write',
      keywords: [
        'publish',
        'compose',
        'pen',
        'spell',
        'drop a line',
        'indite',
        'read',
        'rewrite',
        'submit',
        'reword',
      ],
    },
  ]);

  let keywords = [];

  const [rows, setRows] = useState(
    categories.map((item) => {
      return {
        id: item.id,
        title: item.title,
        keywords:
          typeof item.keywords === 'object'
            ? item.keywords.slice(0, 3).join(', ')
            : item.keywords,
      };
    })
  );

  const { data, loading, error } = useQuery(GET_KEYWORDS, {
    variables: { category: input },
    skip: input === null,
  });

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  const handleSubmit = (event) => {
    event.preventDefault();
    setInput(`${inputEl.current.value}`);

    if (data && data.getKeywords.length !== 0) {
      keywords = data.getKeywords.map((item) => {
        return item.word;
      });

      setCategories([
        ...categories,
        {
          id: categories.length + 1,
          title: input,
          keywords: keywords,
        },
      ]);
      setRows([
        ...rows,
        {
          id: categories.length + 1,
          title: input,
          keywords: keywords.slice(0, 3).join(', '),
        },
      ]);
      setInput('');
    }
  };

  function addKeyword(e) {
    e.preventDefault();
    if (e.target.parentNode.nodeName.toLowerCase() === 'tr') {
      const id = e.target.parentNode.getAttribute('data-id');
      const elementIndex = rows.findIndex((element) => element.id == id);
      let { keywords } = categories.find((item) => {
        if (id == item.id) return item;
      });
      let { keywords: prevKeywords } = rows.find((item) => {
        if (id == item.id) return item;
      });
      let prevKeywordsLength;
      if (typeof prevKeywords === 'string')
        prevKeywordsLength = prevKeywords.split(',').length;
      else prevKeywords = prevKeywords.length;

      if (keywords.length > prevKeywordsLength) {
        let newKeyword = keywords[prevKeywordsLength];
        rows[elementIndex].keywords = [
          ...rows[0].keywords.split(','),
          newKeyword,
        ];
        setRows(rows); // don't word
      }
    }
  }

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
        rows={rows}
        columns={['Category', 'Keywords', '']}
        id={1}
        className="app__table"
        addKeyword={addKeyword}
      />
    </div>
  );
}

export default App;
