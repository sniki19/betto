import { app } from './src/components/app'
import { dispatch } from './src/services/dataService'
import { initStoreAction } from './src/utils/constants'

dispatch(initStoreAction())

root.append(app())