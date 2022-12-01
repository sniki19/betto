import { ce } from '../shared'

export const footer = () => {
	const copyText = `&#169; Betto Technologies,${new Date().getFullYear()} `
	const copyright = ce('div', {
		className: 'copyright',
		innerHTML: copyText
	})

	return ce('footer', {
		className: 'footer',
		children: [copyright]
	})
}