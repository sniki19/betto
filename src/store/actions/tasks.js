import { actionType } from '../../utils/constants'

export const addTaskToBoardAction = task => ({
	type: actionType.addTaskOnBoard,
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

export const moveTaskToNextBoardAction = id => ({
	type: actionType.moveTaskToNextBoard,
	payload: id
})

export const loadTasksAction = tasks => ({
	type: actionType.loadTasks,
	payload: tasks
})