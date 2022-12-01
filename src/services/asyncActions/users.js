import { loadUsersAction } from '../../store/actions'
import userService from '../userService'

export const fetchUsers = () => {
	return dispatch => {
		userService.getAll()
			.then(users => dispatch(loadUsersAction(users)))
	}
}