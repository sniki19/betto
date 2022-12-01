import { loadTasksAction } from '../../store/actions'
import taskService from '../taskService'

export const fetchTasks = () => {
	return dispatch => {
		taskService.getAll()
			.then(tasks => dispatch(loadTasksAction(tasks)))
	}
}