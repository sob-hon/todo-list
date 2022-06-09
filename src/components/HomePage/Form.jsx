import React, { useState, useEffect, useRef } from "react";
import TodoCreator from "./FormInput";
import TodoList from "./List";
import { createTheme } from "@material-ui/core/styles";
import ButtonAppBar from "./AppBar";
import { useUserInfo } from "./../../hooks/UseUserInfo";
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: { main: "#000000" },
  },
});

const Form = () => {
  const context = useUserInfo();
  const [newTodo, setNewTodo] = useState({});
  const [todos, setTodos] = useState([]);
  const inputRef = useRef();
  const [isInputEmpty, setInputEmpty] = useState(false);
  const [newTaskData, setNewTaskData] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const getAllTodos = () => {
    axios
      .get("http://185.126.200.101:4005/tasks", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setTodos(
          response.data.map((todo) => {
            return { ...todo, isEditing: false };
          })
        );
      });
  };

  useEffect(() => {
    getAllTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(newTodo);
    clearInput();
    inputRef.current.focus();
  };

  const preventSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const addTodo = () => {
    if (newTaskData !== "") {
      console.log("hello");
      axios
        .post(
          "http://185.126.200.101:4005/tasks",
          { description: newTaskData, completed: false },
          {
            headers: {
              Authorization: context.userInfo.token,
            },
          }
        )
        .then((response) => {
          setTodos([...todos, { ...response.data, isEditing: false }]);
          setNewTaskData("");
        });
    } else {
      setInputEmpty(true);
    }
  };

  const deleteTodo = (todo) => {
    axios
      .delete(`http://185.126.200.101:4005/tasks/${todo._id}`, {
        headers: {
          Authorization: context.userInfo.token,
        },
      })
      .then(() => {
        const newTodos = todos.filter((t) => t._id !== todo._id);
        setTodos(newTodos);
      });
  };

  const clearInput = () => {
    setNewTodo("");
  };

  const setTodo = (todo) => {
    setInputEmpty(false);
    setNewTodo(todo);
  };

  return (
    <>
      <ButtonAppBar />
      <div className="wrapper">
        <form onSubmit={handleSubmit} className="form">
          <TodoCreator
            theme={theme}
            todo={newTodo}
            setTodo={setTodo}
            clearInput={clearInput}
            inputRef={inputRef}
            isInputEmpty={isInputEmpty}
            preventSubmit={preventSubmit}
            setNewTaskData={setNewTaskData}
            newTaskData={newTaskData}
          />

          <TodoList
            theme={theme}
            todos={todos}
            setTodos={setTodos}
            deleteTodo={deleteTodo}
            preventSubmit={preventSubmit}
            setSelectedRow={setSelectedRow}
            setOpen={setOpen}
            open={open}
            selectedRow={selectedRow}
          />
        </form>
      </div>
    </>
  );
};

export default Form;
