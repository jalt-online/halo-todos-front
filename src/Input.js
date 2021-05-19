import * as db from './db.js';
import './Input.css';
import React, { useState } from "react";

function Input(props) {
	const [name, setName] = useState("");
	
	function update(e) {
		setName(e.target.value);
	}

	function submit(e) {
		e.preventDefault();
		props.postTodo(name)
		console.log(e)
		setName("")
	}

  	return (
	<div className="input">
	  		<button className="input__button" id="chevron" onClick={props.checkTodos}><span className="input__chevron">&#8964;</span></button>
		<form className="input__form" onSubmit={submit}>
	  		<input className="input__input" id="techron" type="text" value={name} onChange={update}></input>
	  	</form>
	</div>
  	)
}

export default Input
