import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import * as db from './db.js';

async function main() {
	const todos = await db.getTodos()
	
	ReactDOM.render(
	  <React.StrictMode>
	    <App todos = {todos.data} filter = {"all"}/>
	  </React.StrictMode>,
	  document.getElementById('root')
	);
}
main()
