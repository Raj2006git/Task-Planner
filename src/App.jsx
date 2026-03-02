import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    let todos = JSON.parse(localStorage.getItem("todos"))
    if(todos)
      setTodos(todos)
  }, [])
  

  const saveTOLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  

  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleAdd = () => {
    if (editId) {
      setTodos(todos.map(item => item.id === editId ? { ...item, todo } : item))
      setEditId(null)
    } else {
      if (todo.trim() !== "") {
        setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
      }
    }
    setTodo("")
    saveTOLS()
  }

  const handleEdit = (e, id) => {
    let t = todos.find(i => i.id === id)
    setTodo(t.todo)
    setEditId(id)
    saveTOLS()
  }

  const handleDelete = (e, id) => {
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos([...newTodos]);
    saveTOLS()
  }

  const handleCheckbox = (e) => {
    let id = e.target.id;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos([...newTodos]);
    saveTOLS()
  }

  


  return (
    <>
      <Navbar tasks = {todos}/>
      <div className='m-10 border-2 border-none rounded-lg flex flex-col justify-center items-center bg-gray-200 text-black w-[50%] justify-self-center pt-5 pb-5 shadow-lg' >
        <div className='font-bold text-4xl font-marker'>To-Do List</div>
        <div className='flex flex-row w-[90%] justify-center pb-7'>
          <input value={todo} onChange={handleChange} type="text" placeholder='Add a new Task...' className='border-2 border-gray-300 rounded-lg p-2 m-2 bg-white w-[70%]' />
          <button onClick={handleAdd} className='bg-blue-500 text-white rounded-full p-1 px-5.5 flex items-center justify-center cursor-pointer hover:bg-blue-700' disabled={todo.trim() === ""}>
            <FaPlus /></button>
          {editId && <span className='ml-2 text-green-700 font-semibold'>Editing...</span>}
        </div>
        <div className='todos flex flex-col items-center gap-3 cursor-pointer pb-5 justify-center font-indie'>
          {todos.length === 0 && <div>No Todos to Display</div>}
          {todos.map(item => (
            <div key={item.id} className="todo-item flex justify-between items-center gap-3 w-[100%]">
              <input onChange={handleCheckbox} type="checkbox" value={item.isCompleted} id={item.id} className='size-6'/>
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              <div className="buttons flex items-center justify-between gap-3">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-green-500 text-white rounded-md p-1 cursor-pointer hover:bg-green-700 size-8 flex items-center justify-center'><FaRegEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-red-500 text-white rounded-md p-1 cursor-pointer hover:bg-red-700 size-8 flex items-center justify-center'><MdOutlineDelete /></button>
              </div>
            </div>
          ))}
        </div>
          <div>
            <div> <span className='font-bold font-marker'>Finished Tasks</span>
              <div className='font-indie text-blue-500'>{todos.filter(item => item.isCompleted).map(item => (
                <div key={item.id}>{item.todo}</div>
              ))}</div>
              </div>
          </div>
      </div>
    </>
  )
}

export default App
