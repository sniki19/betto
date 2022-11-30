import { app } from './src/components/sections/app'
import { initStoreAction } from './src/utils/actions'
import { dispatch } from './src/utils/dataService'

dispatch(initStoreAction())

root.append(app())