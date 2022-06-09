import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import { useUserInfo } from "../../hooks/UseUserInfo";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    padding: 0,
  },
  li: {
    borderBottom: "1px dashed black",
  },
}));

const TodoList = ({
  theme,
  todos,
  setTodos,
  completeTodo,
  editTodo,
  deleteTodo,
  saveTodo,
  noteRef,
  preventSubmit,
  open,
  setOpen,
  selectedRow,
  setSelectedRow,
}) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);
  const context = useUserInfo();

  const handleToggle = (todo) => {
    axios
      .patch(
        `http://185.126.200.101:4005/tasks/${todo._id}`,
        {
          description: todo.description,
          completed: !todo.completed,
        },
        {
          headers: {
            Authorization: context.userInfo.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        let editedTask = todos.map((todo) => {
          if (todo._id === res.data._id) {
            return {
              description: res.data.description,
              completed: res.data.completed,
              _id: res.data._id,
            };
          } else {
            return todo;
          }
        });
        setTodos(editedTask);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <List className={classes.root}>
        {todos.map((todo) => {
          const labelId = `list-todo-${todo}`;
          return (
            <>
              <div>
                <Dialog
                  open={open}
                  onClose={() => {
                    setOpen(false);
                  }}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">
                    Update task {`${selectedRow?.description || ""}`}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      To subscribe to this website, please enter your email
                      address here. We will send updates occasionally.
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="Description"
                      label="Description"
                      type="text"
                      fullWidth
                      value={selectedRow?.description}
                      onChange={(e) => {
                        setSelectedRow((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }));
                      }}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      color="primary"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => {
                        axios
                          .patch(
                            `http://185.126.200.101:4005/tasks/${selectedRow._id}`,
                            {
                              description: selectedRow.description,
                              completed: selectedRow.completed,
                            },
                            {
                              headers: {
                                Authorization: context.userInfo.token,
                              },
                            }
                          )
                          .then((res) => {
                            console.log(res.data);
                            let editedTask = todos.map((todo) => {
                              if (todo._id === res.data._id) {
                                return {
                                  description: res.data.description,
                                  completed: res.data.completed,
                                  _id: res.data._id,
                                };
                              } else {
                                return todo;
                              }
                            });
                            console.log(editedTask);
                            setTodos(editedTask);
                            setOpen(false);
                          });
                      }}
                    >
                      Update
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
              <ListItem
                key={todo.id}
                role={undefined}
                dense
                button
                className={classes.li}
              >
                <ListItemIcon>
                  <Checkbox
                    color="primary"
                    edge="start"
                    checked={todo.completed}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                    onClick={() => handleToggle(todo)}
                    onKeyPress={preventSubmit}
                  />
                </ListItemIcon>

                <>
                  <ListItemText
                    id={labelId}
                    primary={`${todo.description}`}
                    style={{
                      textDecoration: todo.completed ? "line-through" : "",
                    }}
                  />
                  <ListItemIcon>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => {
                        setOpen(true);
                        setSelectedRow(todo);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </ListItemIcon>
                </>

                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() => deleteTodo(todo)}
                    edge="end"
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </>
          );
        })}
      </List>
    </ThemeProvider>
  );
};

export default TodoList;
