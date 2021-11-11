import React, { useState } from "react";
import Input from "../CommonComponents/Input/Input";

import Button from "../CommonComponents/Button/Button";
import AddForm from "../AddForm/AddForm";
import "./Item.css";

const Item = (props) => {

  const clickHandler = (event) => {
    if (event.target.tagName !== "BUTTON" && event.target.tagName !== "INPUT"){
      props.toggleDone(
        props.data.key, 
        props.parentKey, 
      );
    }
  }

  const editHandler = (value) => {
    props.editItem(
      props.data.key, 
      props.parentKey, 
      (item => {
        item.name = value; 
        return item;
      })(props.data)
    );
    toggleEditing();
  }

  const [isEdited, setEdited] = useState(false);

  const [addingNow, setAdding] = useState(false);

  const toggleEditing = () => {
    setEdited(!isEdited);
  }

  const toggleAdding = () => {
    setAdding(!addingNow);
    setEdited(false);
  }

  return (
    <>
      <div onClick = {clickHandler}>
        { !isEdited ?
          <div className={props.data.isDone ? " done" : ""}>
            {props.data.name}
          </div> :
          <Input action={editHandler} 
            buttonText={"Ok"} 
            defaultValue={props.data.name} 
            cancelAction = {toggleEditing}
          />
        }
        { !addingNow &&
          <Button
            action = {toggleEditing}
            buttonText = {!isEdited ? "Edit" : "Cancel"}
          />
        }
        { !(isEdited || addingNow) &&
          <Button 
            action = {() => props.removeItem(props.data.key, props.parentKey)}
            buttonText = "Delete"
          />
        }
        { (isEdited || addingNow) && 
          <Button
            action = {toggleAdding}
            buttonText = {!addingNow ? "Add" : "Cancel"}
          />
        }
        { addingNow &&
          <AddForm
            addItem = {props.addItem}
            parentKey = {[props.data.key, ...props.parentKey]}
            cancelAction = {toggleAdding}
          />
        }
        { props.data.subItems && props.data.subItems.length > 0 &&
          <>
            {props.data.subItems.reduce((acc, item) => item.isDone ? ++acc : acc, 0)}/{props.data.subItems.length}
          </>
        }
      </div>
      { props.data.subItems && 
        <ul className="ItemUl">
          {props.data.subItems.map( item => 
            <li key = {item.key}>
              <Item data={item}
                removeItem = {props.removeItem}
                toggleDone = {props.toggleDone}
                editItem = {props.editItem}
                addItem = {props.addItem}
                parentKey = {[props.data.key, ...props.parentKey]}
              />
            </li>
          )}
        </ul>
      }
    </>
  );
}

export default Item;