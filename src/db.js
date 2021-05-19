import axios from 'axios';
const URL = 'https://halo-todo.herokuapp.com/todos'

export async function getTopId() {
	var data = await axios.get(URL)
	var dl = data.data.length
	if(!dl) return 1
	return data.data[dl-1].id + 1
}

export async function getTodos() {
	var data = await axios.get(URL)
	return data
}

export async function getTodo(id) {
	var data = await axios.get(URL+"/" + id)
	return data
}

export async function countTodos() {
	var data = await axios.get(URL + '/count')
	return data.data.length
}

export async function postTodo(todo) {
	var data = await axios.post(URL, todo)
	data = await axios.get(URL)
	return data
}

export async function putTodo(id,todo) {
	var data = await axios.put(URL + '/'+id, todo)
	return data
}


export async function delTodo(id) {
	var data = await axios.delete(URL + '/'+id)
	return data
}

export async function delTodos() {
	var data = await axios.get(URL)
	var todos = data.data
	var tl = todos.length
	for(var i = 0; i < tl; ++i)
		delTodo(todos[i].id)
	data = await axios.get(URL)
	return data
}

export async function delCompleted() {
	var data = await axios.get(URL)
	var todos = data.data.filter(d => d.isDone)
	var tl = todos.length
	for(var i = 0; i < tl; ++i)
		 await delTodo(todos[i].id)

}
export async function checkAll() {
	var data = await axios.get(URL)
	var todos = data.data
	var val = todos.some(d => !d.isDone)
	var tl = todos.length
	for(var i = 0; i < tl; ++i)
		await putTodo(todos[i].id, {isDone: val})
}
