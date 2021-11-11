import React from "react";

const Button = (props) => {
  
  const handleClick = () => {
    props.action()
  }

  return (
    <button onClick={handleClick}>
      {props.buttonText}
    </button>
  );
}

export default Button;