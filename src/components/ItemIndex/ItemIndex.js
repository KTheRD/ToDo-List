import React from "react";

import Item from "../Item/Item";
import "./ItemIndex.css"

const ItemIndex = (props) => {
  return (
    <ul className="ItemUl FirstList">
      { props.items.map( item => 
          <li key = {item.key}>
            <Item data={item}
              removeItem = {props.removeItem}
              toggleDone = {props.toggleDone}
              editItem = {props.editItem}
              addItem = {props.addItem}
              parentKey = {[]}
            />
          </li>
        )
      }
    </ul>
  );
}

export default ItemIndex;