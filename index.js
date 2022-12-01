import { app } from './src/components/sections/app'
import { fetchTasks, fetchUsers } from './src/services/asyncActions'
import { store } from './src/store'

store.dispatch(fetchUsers())
store.dispatch(fetchTasks())

root.append(app())