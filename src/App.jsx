import { useState } from 'react'

import './App.css'
import { ToDoProvider } from './contexts'
import { useEffect } from 'react'
import ToDoForm from './components/ToDoForm'
import ToDoItem from './components/ToDoItem'

function App() {
  const [todos , setTodos] = useState([])
  
  const addToDo = (todo)=>{
    setTodos((oldtodo)=>[{id:Date.now(),...todo},...oldtodo] )
  }
  const updatedToDo = (id,todo )=>{
    setTodos((oldtodo)=> oldtodo.map((prevTodo)=>prevTodo.id === id ? todo : prevTodo))
  }
  const deleteToDo = (id) => {
    setTodos((oldtodo)=> oldtodo.filter((todo)=> todo.id !== id ))
  }
  const toggleComplete = (id)=>{
    setTodos((oldtodo)=> oldtodo.map((todo)=> todo.id === id ? {...todo,completed: !todo.completed}: todo))
  }


  useEffect(()=>{
   const todos = JSON.parse(localStorage.getItem("todos"))

   if(todos && todos.length >0){
     setTodos(todos)
   }
  },[])

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])

  return (
    <ToDoProvider value={{todos,addToDo,deleteToDo,toggleComplete,updatedToDo}}>
    <div className="bg-[#172842] min-w-full min-h-screen py-8 ">
     <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
        <div className="mb-4">
            {/* Todo form goes here */} 
            <ToDoForm />
        </div>
        <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo)=>(
              <div key={todo.id} className='w-full'>
                <ToDoItem todo={todo}/>
              </div>
            ))}
        </div>
     </div>  
    </div>
</ToDoProvider>
  )
}

export default App
