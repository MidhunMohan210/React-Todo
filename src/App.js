import React from "react";
import { useState } from "react";
import "./App.css";
import { MdDeleteForever } from "react-icons/md";
import { BiSolidEditAlt } from "react-icons/bi";
import { IoIosDoneAll } from "react-icons/io";

function App() {
  const [toDos, setTodos] = useState([]);
  const [toDo, setTodo] = useState("");
  const [editId, setEditId] = useState(0);


  const addTodo=()=>{
    if(toDo !==""){

      setTodos([...toDos, { id: Date.now(), text: toDo, status: false }])
      setTodo("");
    }

    if (editId) {
      const updatedTodos = toDos.map((ele) =>
        ele.id === editId ? { ...ele, text: toDo } : ele
      );
      setTodos(updatedTodos);
      setEditId(0);
      setTodo('');
    }
    


  }

  const onDelete = (id) => {

      
    setTodos(toDos.filter((e) => e.id !== id));
  };

  const onComplte = (id) => {
    let complete = toDos.map((ele) => {
      if (ele.id === id) {
        return { ...ele, status: !ele.status };
      }
      return ele;
    });
    setTodos(complete);
  };

  const onEdit = (id) => {
    const editTodo = toDos.find((ele) => {
      return ele.id === id;
    });

    setTodo(editTodo.text);
    setEditId(editTodo.id);
  };

  const clearall=()=>{
    return setTodos([])
  }

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        {/* <h2>Whoop, it's Wednesday 🌝 ☕ </h2> */}
      </div>
      <div className="input">
        <input
          type="text"
          value={toDo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="🖊️ Add item..."
        />
        <button
          onClick={() =>
             addTodo()
          }
          className="add-button"
        >
          {editId?"Edit":"Add"}
        </button>

       
      </div>
      <div className="todos">
        {toDos.map((item) => {
          return (
            <div className="todo" id={item.status ? "done" : ""}>
              <div className="left">
                <p>{item.text}</p>
              </div>
              <div className="right">
                <IoIosDoneAll
                  className="done-icon"
                  onClick={() => onComplte(item.id)}
                />
                <BiSolidEditAlt
                  className="edit-icon"
                  onClick={() => onEdit(item.id)}
                />
                <MdDeleteForever
                  className="delete-icon"
                  onClick={() => onDelete(item.id)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
