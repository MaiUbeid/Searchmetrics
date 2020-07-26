import React from 'react';
import PropTypes from 'prop-types';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Table({ rows, columns, id, className, addKeyword }) {
  function renderHead(columnsData) {
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
  }

  function renderBody(rowsData) {
    return rowsData.reduce((acc, el, idx, arr) => {
      const rowCells = Object.keys(el);
      const cells = rowCells.map((cell, idx, arr) => (
        <td key={`${el[cell]}-${idx}`}>{el[cell]}</td>
      ));
      acc.push(
        <tr key={`${el}-${idx}`} data-id={el.id}>
          {cells}
          <FontAwesomeIcon
            icon={faPlusCircle}
            className="app__icon"
            onClick={addKeyword}
          />
        </tr>
      );
      return acc;
    }, []);
  }

  return (
    <table id={id} className={className}>
      <thead>{renderHead(columns)}</thead>
      <tbody>{renderBody(rows)}</tbody>
    </table>
  );
}

Table.defaultProps = {
  className: '',
  addKeyword: () => {},
};

Table.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.number.isRequired,
  className: PropTypes.string,
  addKeyword: PropTypes.func,
};
