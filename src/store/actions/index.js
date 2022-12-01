import { closeModalAction, openModalAction } from './modal'
import {
	addTaskToBoardAction,
	deleteAllCompletedTasksAction,
	deleteTaskAction,
	moveTaskToNextBoardAction,
	updateTaskAction,
	loadTasksAction,
	moveTaskToBoardAction
} from './tasks'
import { loadUsersAction } from './users'

export {
	addTaskToBoardAction,
	updateTaskAction,
	deleteTaskAction,
	deleteAllCompletedTasksAction,
	moveTaskToNextBoardAction,
	moveTaskToBoardAction,
	loadUsersAction,
	openModalAction,
	closeModalAction,
	loadTasksAction
}