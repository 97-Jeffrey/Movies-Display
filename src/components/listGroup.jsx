import React from 'react';

const ListGroup = (props) => {
  const { items, textProperty, valueProperty, onItemSelect, selectedGenre } =props;
  return (
    <ul className="list-group">
      {items.map(genre=>(
        <li 
          onClick={()=>onItemSelect(genre)} 
          key={genre[valueProperty]} 
          className={genre===selectedGenre? 
            "list-group-item active": "list-group-item"}>
            {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
}

ListGroup.defaultProps={
  textProperty:"name",
  valueProperty:"_id"
}
 
export default ListGroup;