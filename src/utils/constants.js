export const actionType = {
	initStore: 'INIT_STORE',

	addTaskOnBoard: 'ADD_ITEM_ON_BOARD',
	updateTask: 'UPDATE_TASK',
	moveTaskToNextBoard: 'MOVE_TO_NEXT_BOARD',
	deleteTask: 'DELETE_TASK',
	deleteAllCompletedTasks: 'DELETE_ALL_COMPLETED_TASKS',
	getTaskById: 'GET_TASK_BY_ID',

	getAllUsers: 'GET_ALL_USERS',

	openModal: 'OPEN_MODAL_WIN',
	closeModal: 'CLOSE_MODAL_WIN'
}

export const boardIdList = {
	todo: 'todoBoard',
	inProgress: 'inProgressBoard',
	done: 'doneBoard'
}