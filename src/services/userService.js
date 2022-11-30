const url = endpoint => {
	return `https://6377c5ab0992902a2510d2b5.mockapi.io/sniki/${endpoint}`
}

function fetchData(request) {
	return fetch(request)
		.then(response => {
			const result = response.json()
			console.log(request, result)
			return result
		})
		.then(data => {
			console.log('users >> ', data)
			return data
		})
}

function getAll() {
	return fetchData(url('users'))
}

export const userService = () => {
	return {
		getAll
	}
}