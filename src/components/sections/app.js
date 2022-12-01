import { cf } from '../shared'
import { footer } from './footer'
import { header } from './header'
import { main } from './main'

export const app = () => {
	const content = cf([
		header(),
		main(),
		footer()
	])

	return content
}