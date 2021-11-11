import React from "react";

import Item from "../Item/Item";
import "./ItemIndex.css";

const ItemIndex = (props) => {
  return (
    <>
      { props.items.length !== 0 && 
        <ul className="firstList">
          { props.items.map( item => 
              <Item 
                data={item}
                removeItem = {props.removeItem}
                toggleDone = {props.toggleDone}
                editItem = {props.editItem}
                addItem = {props.addItem}
                parentKey = {[]}
                key={item.key}
              />
            )
          }
        </ul>
      }
    </>
  );
}

export default ItemIndex;