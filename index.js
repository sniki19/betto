import { app } from './src/components/sections/app'
import { initDnd } from './src/dnd'
import { initStore } from './src/store'

initStore()

root.append(app())

initDnd()