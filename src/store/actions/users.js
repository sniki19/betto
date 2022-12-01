import { actionType } from '../../utils/constants'

export const loadUsersAction = users => ({
	type: actionType.loadUsers,
	payload: users
})