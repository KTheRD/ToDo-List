import React from "react";

import { IconButton } from "@mui/material"
import { Add, Delete, Edit, Cancel} from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';

const Button = (props) => {
  
  const handleClick = () => {
    props.action()
  }

  return (
    <IconButton onClick={handleClick} >
      { 
        props.buttonText === "+" ? <Add/> : 
        props.buttonText === "Delete" ? <Delete/> :
        props.buttonText === "Edit" ? <Edit/> :
        props.buttonText === "Ok" ? <CheckIcon/> :
        props.buttonText === "Cancel" ? <Cancel/> :
        props.buttonText
      }
    </IconButton>
  );
}

export default Button;