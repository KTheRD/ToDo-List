import React from "react";
import Input from "../CommonComponents/Input/Input";

const AddForm = (props) => {
  return (
    <div>
      <Input 
        action = {(value) => props.addItem(value, props.parentKey)} 
        cancelAction = {props.cancelAction} 
        buttonText={"+"} 
        defaultValue={""}
      />
    </div>
  );
}

export default AddForm;