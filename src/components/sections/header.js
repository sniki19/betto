import logo from '../../assets/images/logo.png'
import { ce } from '../shared'

const createLogo = () => {
	return ce('img', {
		className: 'app-logo',
		src: logo
	})
}

const createClock = () => {
	const clock = ce('div', {
		className: 'clock',
		textContent: new Date().toLocaleTimeString()
	})

	setInterval(() => {
		clock.textContent = new Date().toLocaleTimeString()
	}, 1000);

	return clock
}

export const header = () => {
	const logoColumn = ce('div', {
		className: 'column',
		children: [
			createLogo(),
			ce('h1', {
				className: 'app-name',
				textContent: 'Betto'
			})
		]
	})

	const timeColumn = ce('div', {
		className: 'column',
		children: [createClock()]
	})

	return ce('header', {
		className: 'header',
		children: [logoColumn, timeColumn]
	})
}