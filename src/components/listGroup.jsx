import React from 'react';

const ListGroup = (props) => {
  const { items, textProperty, valueProperty } =props;
  return (
    <ul className="list-group">
      {items.map(genre=>(
        <li key={genre[valueProperty]} className="list-group-item">{genre[textProperty]}</li>
      ))}
    </ul>
  );
}
 
export default ListGroup;