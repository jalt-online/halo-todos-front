import './App.css';
import React, { useState } from "react";
import * as db from './db.js';
import Todo from './Todo.js';
import Input from './Input.js';


function App(props) {
	const [todos, setTodos] = useState(props.todos)
	const [filter, setFilter] = useState(props.filter)
	
	const todoList = todos
		.sort((a,b) => a.id - b.id)
		.filter(function(a){
			console.log(a, filter)
			var keep = false
			if(filter === "all") keep = true
			else if(filter === "active") keep = !a.isDone
			else keep = a.isDone
			console.log(keep)
			return keep
		})
		.map(todo => (
		<Todo 
			id={todo.id} 
			key={todo.id} 
			name={todo.content} 
			done={todo.isDone} 
			checkTodo={checkTodo}
			delTodo={delTodo}
			updateTodo={updateTodo}
		/>
	))
	const left = todos.filter((a)=>!a.isDone).length

	async function checkTodo(id,prev) {
		console.log("Called",id,prev)
		await db.putTodo(
			id,
			{isDone: !prev}
		)
		var after = await db.getTodos()
		setTodos(after.data)
	}


	async function postTodo(name) {
		var after = await db.postTodo({
			content: name,
			id: db.getTopId(),
			isDone: false
		})
		setTodos(after.data)
	}

	async function delTodo(id) {
		console.log(id)
		await db.delTodo(id)
		var after = await db.getTodos()
		setTodos(after.data)
	}

	async function updateTodo(id, val) {
		await db.putTodo(id, {content:val})
		var after = await db.getTodos()
		setTodos(after.data)
	}

	async function delCompleted() {
		await db.delCompleted()
		var after = await db.getTodos()
		setTodos(after.data)
	}

	async function checkTodos() {
		await db.checkAll()
		var after = await db.getTodos()
		setTodos(after.data)
	}

	async function clickFilter(e) {
		console.log("filter", e.target.id)
		setFilter(e.target.id)
		var after = await db.getTodos()
		setTodos(after.data)
	}

  return (
    <div className="app">
      <header className="hdr">
	  <h1>Todos</h1>
      </header>
	  <Input postTodo={postTodo} checkTodos={checkTodos}/>
	  	<ul className="list">
	  		{todoList}
	  	</ul>
	  <ftr className="ftr">
	  	<div className="ftr--left">
	  		{left} items left
	  	</div>
	  	<div className="ftr--middle"><form>
	  		<input className="ftr__input" name="filter" type="radio"id="all" defaultChecked={true} onChange={clickFilter}/>
	  		<label className="ftr__label" htmlFor="all">All</label>
	  		
	  		<input className="ftr__input" name="filter" type="radio" id="active" onChange={clickFilter} />
	  		<label className="ftr__label" htmlFor="active">Active</label>

	  		<input className="ftr__input" name="filter" type="radio" id="completed" onChange={clickFilter}/>
	  		<label className="ftr__label" htmlFor="completed">Completed</label>
	  	</form></div>
	  	<div className="ftr--right">
	  		<button className="ftr__button" onClick={delCompleted}>Clear completed</button>
	  	</div>
	  </ftr>
    </div>
  );
}

export default App;
