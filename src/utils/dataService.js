import taskService from '../services/taskService'
import userService from '../services/userService'
import { actionType } from './constants'
import { Store } from './store'
import { getNextWorkflowStep } from './workflow'

const observer = new Store()
let state = {
	tasks: []
}

function initStore() {
	Promise.all([
		taskService.getAll(),
		userService.getAll()
	]).then(([tasks, users]) => {
		state = {
			tasks: tasks,
			users: users
		}
		observer.broadcast(state)
	})
}

function addTask(task) {
	state = {
		...state,
		tasks: [...state.tasks, task]
	}
	observer.broadcast(state)
}

function updateTask(editTask) {
	const otherTasks = state.tasks.filter(task => task.id !== editTask.id)

	state = {
		...state,
		tasks: [...otherTasks, editTask]
	}
	observer.broadcast(state)
}

function moveTask(id) {
	const otherTasks = state.tasks.filter(task => task.id !== id)
	const targetTask = state.tasks.find(task => task.id === id)
	targetTask.workflowStep = getNextWorkflowStep(targetTask.workflowStep)

	state = {
		...state,
		tasks: [...otherTasks, targetTask]
	}
	observer.broadcast(state)
}

function deleteTask(id) {
	state = {
		...state,
		tasks: state.tasks.filter(task => task.id !== id)
	}
	observer.broadcast(state)
}

function deleteAllCompleted() {
	state = {
		...state,
		tasks: state.tasks.filter(task => task.workflowStep !== 'done')
	}
	observer.broadcast(state)
}

const dispatch2 = action => {
	state = reducer(state, action)
}

const reducer = (state, action) => {
	switch (action.type) {
		case actionType.initStore:
			initStore()
			return
		case actionType.addTaskOnBoard:
			addTask(action.payload)
			break
		case actionType.moveTaskToNextBoard:
			moveTask(action.payload)
			break
		case actionType.deleteTask:
			deleteTask(action.payload)
			break
		case actionType.deleteAllCompletedTasks:
			deleteAllCompleted()
			break
		case actionType.getTaskById:
			const task = state.tasks.find(task => task.id === action.payload)
			return { ...task }
		case actionType.updateTask:
			updateTask(action.payload)
			break
		case actionType.getAllUsers:
			return [...state.users]
		default:
			return state
	}


	return {...state}
}

function dispatch(action) {
	switch (action.type) {
		case actionType.initStore:
			initStore()
			break
		case actionType.addTaskOnBoard:
			addTask(action.payload)
			break
		case actionType.moveTaskToNextBoard:
			moveTask(action.payload)
			break
		case actionType.deleteTask:
			deleteTask(action.payload)
			break
		case actionType.deleteAllCompletedTasks:
			deleteAllCompleted()
			break
		case actionType.getTaskById:
			const task = state.tasks.find(task => task.id === action.payload)
			return { ...task }
		case actionType.updateTask:
			updateTask(action.payload)
			break
		case actionType.getAllUsers:
			return [...state.users]
	}
}

export const store = {
	subscribe: fn => observer.subscribe(fn),
	unsubscribe: fn => observer.unsubscribe(fn),
	dispatch: dispatch
}

export {
	dispatch
}

