import { addTaskToBoardAction, deleteTaskAction, loadTasksAction, updateTaskAction } from '../../store/actions'
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

export const fetchDeleteTask = id => dispatch => {
	taskService.remove(id)	
		.then(task => dispatch(deleteTaskAction(task.id)))
}