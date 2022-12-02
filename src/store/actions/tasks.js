import { actionType } from '../../utils/constants'

export const addTaskToBoardAction = task => ({
	type: actionType.createTask,
	payload: task
})

export const updateTaskAction = task => ({
	type: actionType.updateTask,
	payload: task
})

export const deleteTaskAction = id => ({
	type: actionType.deleteTask,
	payload: id
})

export const deleteAllCompletedTasksAction = () => ({
	type: actionType.deleteAllCompletedTasks
})

export const loadTasksAction = tasks => ({
	type: actionType.loadTasks,
	payload: tasks
})