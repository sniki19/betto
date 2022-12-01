import { Store } from '../utils/Store'
import { reducer } from './reducer'

export const store = new Store({}, reducer)