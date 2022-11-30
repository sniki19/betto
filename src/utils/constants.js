export const actionType = {
	initStore: 'INIT_STORE',
	add: 'ADD_ITEM_ON_BOARD',
	move: 'MOVE_TO_NEXT_BOARD',
	delete: 'DELETE_TASK',
	deleteAllCompletedTasks: 'DELETE_ALL_COMPLETED_TASKS',
	getById: 'GET_TASK_BY_ID',
	update: 'UPDATE_TASK',
	getAllUsers: 'GET_ALL_USERS',
	openModal: 'OPEN_MODAL_WIN',
	closeModal: 'CLOSE_MODAL_WIN'
}

export const initStoreAction = () => ({
	type: actionType.initStore
})

export const moveTaskToNextBoardAction = (id) => ({
	type: actionType.move,
	payload: id
})

export const addTaskToBoardAction = (task) => ({
	type: actionType.add,
	payload: task
})

export const updateTaskAction = (task) => ({
	type: actionType.update,
	payload: task
})

export const deleteTaskAction = (id) => ({
	type: actionType.delete,
	payload: id
})

export const deleteAllCompletedTasksAction = () => ({
	type: actionType.deleteAllCompletedTasks
})

export const getTaskById = (id) => ({
	type: actionType.getById,
	payload: id
})

export const getAllUsersAction = () => ({
	type: actionType.getAllUsers
})

export const openModalAction = (modal) => ({
	type: actionType.openModal,
	payload: modal
})

export const closeModalAction = () => ({
	type: actionType.closeModal
})

export const boardIdList = {
	todo: 'todoBoard',
	inProgress: 'inProgressBoard',
	done: 'doneBoard'
}

export const workflow = [
	'todo',
	'inProgress',
	'done'
]

export const getNextWorkflowId = (currentBoardId) => {
	const currentIndex = workflow.indexOf(currentBoardId)
	const nextBoardId = workflow[currentIndex + 1]
	return nextBoardId
}