import React, { useState } from "react";
import Input from "../CommonComponents/Input/Input";

import { Grid, Container, Box } from "@mui/material";

import Button from "../CommonComponents/Button/Button";
import AddForm from "../AddForm/AddForm";
import "./Item.css";

const Item = (props) => {

  const clickHandler = (event) => {
    if (!event.target.closest('.MuiButtonBase-root') && !event.target.closest('.MuiTextField-root')){
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
    <li>
      <Container 
        sx={{
          "borderRadius": "5px",
          "backgroundColor": "#B2E7E8",
          "boxShadow": "0 0 15px 7px rgba(0, 0, 0, 0.247)",
          "padding": "5px",
          "margin": "10px",
          "marginLeft": "0px",
          "userSelect": "none"
        }}
        onClick = {clickHandler}
      >
        <Grid
          sx={{
            "alignItems": "center"
          }}
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid xs = {10} item>
            { !isEdited ?
                <div className={props.data.isDone ? " done" : ""}>
                  <Box sx={{
                    "font": '1.2em "Arial", serif'
                  }}>
                    {props.data.name}
                  </Box>
                </div> :
                <Input action={editHandler} 
                  buttonText={"Ok"} 
                  defaultValue={props.data.name} 
                  cancelAction = {toggleEditing}
                />
            }
          </Grid>
          <Grid 
            container 
            item 
            xs 
            columnSpacing={1} 
            sx={{
              "alignItems": "center"
            }}
          >
            <Grid item xs="6">
              { props.data.subItems && props.data.subItems.length > 0 &&
                <Box sx={{
                  "border":"4px #8FB9AA solid ",
                  "border-radius":"25%",
                  "padding": "5px",
                  "width": "auto",
                  "textAlign": "center",
                  "font": '1.2em "Arial", serif'
                }}>
                  <>
                    {props.data.subItems.reduce((acc, item) => item.isDone ? ++acc : acc, 0)}/{props.data.subItems.length}
                  </>
                </Box>
              }
            </Grid>
            { !addingNow &&
              <Grid item xs="3">
                <Button
                  action = {toggleEditing}
                  buttonText = {!isEdited ? "Edit" : "Cancel"}
                />
              </Grid>
            }
            { !(isEdited || addingNow) &&
              <Grid item xs="3">
                <Button 
                  action = {() => props.removeItem(props.data.key, props.parentKey)}
                  buttonText = "Delete"
                />
              </Grid>
            }
            { (isEdited || addingNow) && 
              <Grid item xs="3">
                <Button
                  action = {toggleAdding}
                  buttonText = {!addingNow ? "+" : "Cancel"}
                />
              </Grid>
            }
          </Grid>
        </Grid>
      </Container>
      { ((props.data.subItems && props.data.subItems.length !== 0) || addingNow) && 
        <ul>
          { addingNow && 
            <li key = {"add"} sx={{"flexFlow": "column wrap", "alignItems": "stretch" }}>
              { addingNow &&
                <Box sx={{
                  "borderRadius": "5px",
                  "backgroundColor": "#B2E7E8",
                  "boxShadow": "0 0 15px 7px rgba(0, 0, 0, 0.247)",
                  "padding": "5px",
                  "margin": "10px",
                  "marginLeft": "0px",
                  "userSelect": "none"
                }}>
                  <AddForm
                    addItem = {props.addItem}
                    parentKey = {[props.data.key, ...props.parentKey]}
                    cancelAction = {toggleAdding}
                  />
                </Box>
              }
            </li>
          }
          { props.data.subItems &&
              props.data.subItems.map( item => 
                <Item 
                  key = {item.key}
                  data={item}
                  removeItem = {props.removeItem}
                  toggleDone = {props.toggleDone}
                  editItem = {props.editItem}
                  addItem = {props.addItem}
                  parentKey = {[props.data.key, ...props.parentKey]}
                />
              )
          }
        </ul>
      }
    </li>
  );
}

export default Item;