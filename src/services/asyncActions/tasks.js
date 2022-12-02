import { store } from '../../store'
import { addTaskToBoardAction, deleteAllCompletedTasksAction, deleteTaskAction, loadTasksAction, updateTaskAction } from '../../store/actions'
import { getNextWorkflowStep, hasNextWorkflowStep } from '../../utils/workflow'
import taskService from '../taskService'

export const fetchTasks = () => dispatch => {
	taskService.getAll()
		.then(tasks => dispatch(loadTasksAction(tasks)))
}

export const fetchCreateTask = task => dispatch => {
	taskService.create(task)
		.then(task => dispatch(addTaskToBoardAction(task)))
}

export const fetchUpdateTask = task => dispatch => {
	taskService.update(task)
		.then(task => dispatch(updateTaskAction(task)))
}

export const fetchMoveTaskToNextStep = id => {
	const task = store.getState().tasks.find(task => task.id === id)
	const nextStep = getNextWorkflowStep(task.workflowStep)
	if (nextStep) {
		task.workflowStep = nextStep
	}

	return dispatch => {
		taskService.update(task)
			.then(task => dispatch(updateTaskAction(task)))
	}
}

export const fetchMoveTaskToStep = (id, nextStep) => {
	const task = store.getState().tasks.find(task => task.id === id)
	task.workflowStep = nextStep

	return dispatch => {
		taskService.update(task)
			.then(task => dispatch(updateTaskAction(task)))
	}
}

export const fetchDeleteTask = id => dispatch => {
	taskService.remove(id)
		.then(task => dispatch(deleteTaskAction(task.id)))
}

export const fetchDeleteAllCompletedTasks = () => {
	const taskIds = store.getState().tasks
		.filter(task => !hasNextWorkflowStep(task.workflowStep))
		.map(task => task.id)

	return dispatch => {
		Promise.all([
			...taskIds.map(id => taskService.remove(id))
		]).then(() => {
			dispatch(deleteAllCompletedTasksAction())
		})
	}
}