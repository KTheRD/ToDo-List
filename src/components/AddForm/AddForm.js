import { Box } from "@mui/system";
import React from "react";
import Input from "../CommonComponents/Input/Input";

const AddForm = (props) => {
  return (
    <Box>
      <Input 
        action = {(value) => props.addItem(value, props.parentKey)} 
        cancelAction = {props.cancelAction} 
        buttonText={"+"} 
        defaultValue={""}
      />
    </Box>
  );
}

export default AddForm;