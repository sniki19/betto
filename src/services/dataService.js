import { actionType, getNextWorkflowId } from '../utils/constants'
import { EventObserver } from '../utils/eventObserver'
import { taskService } from './taskService'
import { userService } from './userService'

const observer = new EventObserver()
let state = {
	tasks: []
}

const store = {
	subscribe: fn => observer.subscribe(fn),
	unsubscribe: fn => observer.unsubscribe(fn)
}

function initStore() {
	Promise.all([
		taskService().getAll(),
		userService().getAll()
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
	targetTask.workflowStateId = getNextWorkflowId(targetTask.workflowStateId)

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
		tasks: state.tasks.filter(task => task.workflowStateId !== 'done')
	}
	observer.broadcast(state)
}

function dispatch(action) {
	switch (action.type) {
		case actionType.initStore:
			initStore()
			break
		case actionType.add:
			addTask(action.payload)
			break
		case actionType.move:
			moveTask(action.payload)
			break
		case actionType.delete:
			deleteTask(action.payload)
			break
		case actionType.deleteAllCompletedTasks:
			deleteAllCompleted()
			break
		case actionType.getById:
			const task = state.tasks.find(task => task.id === action.payload)
			return { ...task }
		case actionType.update:
			updateTask(action.payload)
			break
		case actionType.getAllUsers:
			return [...state.users]
	}
}

export {
	store,
	dispatch
}

