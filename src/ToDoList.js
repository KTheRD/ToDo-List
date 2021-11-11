import React, { useEffect, useState } from "react";

import ItemIndex from "./components/ItemIndex/ItemIndex";
import AddForm from "./components/AddForm/AddForm";
import * as uuid from "uuid";

import "./ToDoList.css"
import { Box } from "@mui/system";

const ToDoList = (props) => {

  const [items, setItems] = useState([]);

  const getParent = (arr, keys, keyIndex = keys.length-1) => {
    if (keyIndex === -1){
      return arr;
    } else {
      let currentKey = keys[keyIndex];
      let index = arr.findIndex((item) => item.key === currentKey);
      if (!arr[index].subItems) arr[index].subItems = [];
      return getParent(arr[index].subItems, keys, --keyIndex)
    }
  }

  const toggleWithChildren = (item, isDone) => {
    item.isDone = isDone;
    if (item.subItems) {
      for (let subItem of item.subItems){
        toggleWithChildren(subItem, isDone);
      }
    }
  }

  const updateParents = (items, keys) => {
    if (keys.length > 0){
      let currentKey = keys.shift();
      let parent = getParent(items, keys);
      let currentItem = parent[parent.findIndex((item) => item.key === currentKey)];
      if (
        currentItem.subItems.reduce((acc, item) => item.isDone ? acc : false, true) === 
        !currentItem.isDone
      ) {
        currentItem.isDone = !currentItem.isDone;
        updateParents(items, keys);
      }
    }
  }

  const setAndSaveItems = (newItems) => {
    localStorage.setItem("items", JSON.stringify(newItems));
    setItems(newItems);
  }

  const toggleDone = (key, parentKey) => {
    let newItems = JSON.parse(JSON.stringify(items));
    let parent = getParent(newItems, parentKey);
    let doneItem = parent[parent.findIndex((item) => item.key === key)];
    toggleWithChildren(doneItem, !doneItem.isDone);
    updateParents(newItems, parentKey);
    setAndSaveItems (newItems);
  }

  const addItem = (name, parentKey) => {
    let newItems = JSON.parse(JSON.stringify(items));
    let parent = getParent(newItems, parentKey);
    parent.push(
      {
        name:name, 
        key:uuid.v4(),
        isDone:false,
      }
    );
    updateParents(newItems, parentKey);
    setAndSaveItems(newItems);
  }

  const removeItem = (key, parentKey) => {
    let newItems = JSON.parse(JSON.stringify(items));
    let parent = getParent(newItems, parentKey);
    parent.splice(parent.findIndex((item) => item.key === key),1);
    updateParents(newItems, parentKey);
    setAndSaveItems(newItems);
  }

  const editItem = (key, parentKey, newItem) => {
    let newItems = JSON.parse(JSON.stringify(items));
    let parent = getParent(newItems, parentKey); 
    parent[parent.findIndex((item) => item.key === key)] = newItem;
    setAndSaveItems(newItems);
  }

  useEffect(() => setItems(JSON.parse(localStorage.getItem("items")) || []), []); 

  return (
    <Box 
      sx={{
        "padding": "20px",
        "margin": "auto",
        "marginTop": "100px",
        "maxWidth": "800px",
        "borderRadius": "5px",
        "backgroundColor": "#304D63",
        "boxShadow": "0 0 15px 7px rgba(0, 0, 0, 0.247)",
      }}
    >
      <AddForm
        addItem = {addItem}
        parentKey = {[]}
        cancelAction={() => void 0}
      />
      <ItemIndex 
        items = {items}
        removeItem = {removeItem}
        toggleDone = {toggleDone}
        editItem = {editItem}
        addItem = {addItem}
      />
    </Box>  
  );
}

export default ToDoList;