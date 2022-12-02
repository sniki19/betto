import taskService from '../services/taskService'
import userService from '../services/userService'
import { Store } from '../utils/Store'
import { loadTasksAction, loadUsersAction } from './actions'
import { reducer } from './reducer'

const store = new Store({}, reducer)

const initStore = () => {
	Promise.all([
		userService.getAll(),
		taskService.getAll()
	]).then(([users, tasks]) => {
		store.dispatch(loadUsersAction(users))
		store.dispatch(loadTasksAction(tasks))
	})
}

export {
	store,
	initStore
}
