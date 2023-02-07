import { app } from './components/sections/app'
import { initDnd } from './dnd'
import { initStore } from './store'

initStore()

root.append(app())

initDnd()