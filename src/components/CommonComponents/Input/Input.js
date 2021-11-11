import React, {/*useEffect, useRef,*/ useState} from "react";

import Button from "../Button/Button";

import { TextField } from "@mui/material";

const Input = (props) => {

  const [value, setValue] = useState(props.defaultValue)

  const inputHandler = (event) => {
    setValue(event.target.value)
  }

  const keyPressHandler = (event) => {
    if (value !== ""){
      if (event.key === "Enter") {
        sendData(value);
      }
    }
  }

  const keyDownHandler = (event) => {
    if (event.key === "Escape") {
      props.cancelAction();
    }
  }

  const buttonHandler = (event) => {
    if (value !== ""){
      sendData(value)
    }
  }

  const sendData = (value) => {
    props.action(value);
    setValue("");
  }

  //const inputRef = useRef(null);

  //useEffect(() => inputRef.current.focus(), [])

  return (
    <>
      <TextField 
        label={props.defaultValue}
        variant="standard" 
        //ref = {inputRef}
        value={value} 
        onChange={inputHandler} 
        onKeyPress={keyPressHandler} 
        onKeyDown = {keyDownHandler}
        autoFocus 
        sx = {{
          "flex-grow": 1
        }}
      />
      <Button action={buttonHandler} buttonText={props.buttonText}/>
    </>
  );
} 

export default Input;