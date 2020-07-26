import React from 'react';
import PropTypes from 'prop-types';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Table({
  rows,
  columns,
  id,
  className,
  keywords,
  keywordsLength,
}) {
  const addKeyword = (keywords, keywordsLength) => {
    const newKeywords = [keywords.slice(0, keywordsLength + 1)];
    console.log(newKeywords); /// here wrong code
  };

  const renderHead = (columnsData) => {
    return columnsData.reduce((acc, el, idx, arr) => {
      acc.push(
        <th key={`${el}-${idx}`} className="dataTableClass__th">
          {el}
        </th>
      );
      if (idx === arr.length - 1) {
        return <tr>{acc}</tr>;
      }
      return acc;
    }, []);
  };

  const renderBody = (rowsData) => {
    return rowsData.reduce((acc, el, idx, arr) => {
      const rowCells = Object.keys(el);
      const cells = rowCells.map((cell, idx, arr) => (
        <td key={`${el[cell]}-${idx}`}>{el[cell]}</td>
      ));
      acc.push(
        <tr key={`${el}-${idx}`}>
          {cells}
          <button
            className="app__button--icon"
            onClick={() => addKeyword(keywords, keywordsLength)}
          >
            <FontAwesomeIcon icon={faPlusCircle} className="app__icon" />
          </button>
        </tr>
      );
      return acc;
    }, []);
  };

  return (
    <table id={id} className={className}>
      <thead>{renderHead(columns)}</thead>
      <tbody>{renderBody(rows)}</tbody>
    </table>
  );
}

Table.defaultProps = {
  className: '',
  keywords: [],
};

Table.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.number.isRequired,
  className: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
};
