import {
	openModalAction,
	closeModalAction
} from './modal'
import { initStoreAction } from './store'
import {
	addTaskToBoardAction,
	updateTaskAction,
	deleteTaskAction,
	deleteAllCompletedTasksAction,
	moveTaskToNextBoardAction,
	getTaskByIdAction
} from './task'
import { getAllUsersAction } from './user'

export {
	initStoreAction,
	addTaskToBoardAction,
	updateTaskAction,
	deleteTaskAction,
	deleteAllCompletedTasksAction,
	moveTaskToNextBoardAction,
	getTaskByIdAction,
	getAllUsersAction,
	openModalAction,
	closeModalAction
}