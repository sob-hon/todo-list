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
  const noteRef = useRef({});
  const [isInputEmpty, setInputEmpty] = useState(false);

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

  const addTodo = (text) => {
    if (text !== "") {
      axios.create(
        "http://185.126.200.101:4005/tasks",
        { description: text, completed: false },
        {
          headers: {
            Authorization: context.userInfo.token,
          },
        }
      );
      const newTodos = [...todos, { description: text, isEditing: false }];
      console.log(newTodos);
      setNewTodo({});
      setTodos(newTodos);
    } else {
      console.log("text", text);
      setInputEmpty(true);
    }
  };

  const removeTodo = (todo) => {
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

  const completeTodo = (inx) => {
    const newTodos = [...todos];
    newTodos[inx].isCompleted = !newTodos[inx].isCompleted;
    setTodos(newTodos);
  };

  const editTodo = (inx) => {
    const newTodos = [...todos];
    newTodos[inx].isEditing = !newTodos[inx].isEditing;
    setTodos(newTodos);
  };

  const saveTodo = (inx) => {
    const newTodos = [...todos];
    newTodos[inx].isEditing = !newTodos[inx].isEditing;
    newTodos[inx].text = noteRef.current[inx].value;
    setTodos(newTodos);
  };

  const clearInput = () => {
    setNewTodo({});
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
          />

          <TodoList
            theme={theme}
            todos={todos}
            completeTodo={completeTodo}
            editTodo={editTodo}
            deleteTodo={removeTodo}
            saveTodo={saveTodo}
            noteRef={noteRef}
            preventSubmit={preventSubmit}
          />
        </form>
      </div>
    </>
  );
};

export default Form;
