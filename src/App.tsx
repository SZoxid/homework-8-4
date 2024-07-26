import React, { useReducer } from "react";
import "../src/App.css";
import { MdDeleteOutline } from "react-icons/md";
import { IoCheckmarkSharp } from "react-icons/io5";

type Todo = {
  id: number;
  title: string;
  done: boolean;
};

type State = {
  todos: Todo[];
  text: string;
};

type Action =
  | { type: "ADD_TODO"; payload: string }
  | { type: "DELETE_TODO"; payload: number }
  | { type: "TOGGLE_TODO"; payload: number }
  | { type: "SET_TEXT"; payload: string };

const initialState: State = {
  todos: [
    { id: 1, title: "Buy groceries", done: false },
    { id: 2, title: "Walk the dog", done: true },
    { id: 3, title: "Complete homework", done: false },
    { id: 4, title: "Read a book", done: true },
    { id: 5, title: "Exercise", done: false },
  ],
  text: "",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TODO":
      const newTodo: Todo = {
        id: Date.now(),
        title: action.payload,
        done: false,
      };
      return { ...state, todos: [...state.todos, newTodo], text: "" };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.payload),
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload ? { ...t, done: !t.done } : t
        ),
      };
    case "SET_TEXT":
      return { ...state, text: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addNewTodo = () => {
    if (state.text.trim() !== "") {
      dispatch({ type: "ADD_TODO", payload: state.text });
    }
  };

  const toggleDone = (id: number) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  const deleteTodo = (id: number) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const setText = (text: string) => {
    dispatch({ type: "SET_TEXT", payload: text });
  };

  const undoneTodos = state.todos.filter((t) => !t.done);
  const doneTodos = state.todos.filter((t) => t.done);

  return (
    <div className="h-[729px] flex justify-center items-center">
      <div className="w-[530px] h-[670px] flex flex-col items-center rounded-[20px] bg-[#1D1825]">
        <div className="w-[80%] flex justify-between mt-[50px]">
          <input
            type="text"
            placeholder="Add a new task"
            value={state.text}
            onChange={(event) => setText(event.target.value)}
            className="w-[85%] h-[40px] rounded-[8px] border-[1px] border-[#9E78CF] bg-[#1D1825] text-[16px] font-normal text-[#777777] outline-none pl-[15px]"
          />
          <button
            disabled={state.text === ""}
            onClick={addNewTodo}
            className="w-10 h-10 flex bg-[#9E78CF] text-[#fff] text-[26px] rounded-[8px] items-center justify-center"
          >
            +
          </button>
        </div>
        <div className="w-[80%] mt-[40px]">
          <h1 className="text-[18px] font-normal text-[#fff] font-sans">
            Tasks to do - {undoneTodos.length > 0 ? undoneTodos.length : "Bo'sh"}
          </h1>
          <ul className="h-[250px] mt-[2px] text-[18px] font-medium text-[#9E78CF] overflow-y-scroll">
            {undoneTodos.map((t) => (
              <li
                key={t.id}
                className="w-[100%] h-[75px] flex bg-[#15101C] mt-4 rounded-md items-center justify-between pl-2 pr-2"
              >
                <span> {t.title}</span>
                <div className="flex justify-between w-[60px]">
                  <button onClick={() => toggleDone(t.id)}>
                    <IoCheckmarkSharp />
                  </button>
                  <button onClick={() => deleteTodo(t.id)}>
                    <MdDeleteOutline className="w-[25px] h-[25px]" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-[80%] mt-[20px]">
          <h2 className="text-[18px] font-normal text-[#fff] font-sans">
            Done - {doneTodos.length > 0 ? doneTodos.length : "Bo'sh"}
          </h2>
          <ul className="h-[200px] mt-[2px] text-[18px] font-medium text-[#9E78CF] overflow-y-scroll">
            {doneTodos.map((t) => (
              <li
                key={t.id}
                className="w-[100%] h-[75px] flex bg-[#15101C] mt-4 rounded-md items-center justify-between pl-2 pr-2"
              >
                <span> {t.title}</span>
                <div className="flex justify-between w-[60px]">
                  <button onClick={() => toggleDone(t.id)}>
                    <IoCheckmarkSharp />
                  </button>
                  <button onClick={() => deleteTodo(t.id)}>
                    <MdDeleteOutline className="w-[25px] h-[25px]" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
