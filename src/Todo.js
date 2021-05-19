import * as db from './db.js';
import './Todo.css';
import React, { useState } from "react";

function Todo(props) {
	//const [done, setDone] = useState(props.done)
	function checkBox(e){ props.checkTodo(props.id,props.done) }
	function del(e){ 
		e.target.disabled = true // prevent double-deletion
		props.delTodo(props.id) 
	}
	function ignore(e) {
		e.preventDefault()
	}
	function edit(e){
		e.target.select()
	}
	function changeTodo(e){
		console.log(e.target.value)
		props.updateTodo(props.id, e.target.value)
	}

	return (
		<li className="todo">
			<input className="todo__check" id={"todo-"+props.id} type="checkbox" checked={props.done} onChange={checkBox}/>
			<label htmlFor={"todo-"+props.id} className="todo__check">
				&#x2714;
			</label>
			<input 
				className="todo__input"
				type="text" 
				defaultValue={props.name}
				onMouseDown={ignore}
				onDoubleClick={edit}
				onChange={changeTodo}
			></input>
			<button className="todo__button" onClick={del}>&times;</button>
		</li>
	)
}

export default Todo

