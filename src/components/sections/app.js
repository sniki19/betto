import { ce, cf } from '../shared'
import { main } from './main'

export const app = () => {
	const content = cf([
		ce('header'),
		main(),
		ce('footer')
	])

	return content
}