import { main } from './main'
import { createElement as ce, createFragment as ct } from './shared/create'

export const app = () => {
	const content = ct([
		ce('header'),
		main(),
		ce('footer')
	])

	return content
}