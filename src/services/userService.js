const url = endpoint => {
	return `https://6377c5ab0992902a2510d2b5.mockapi.io/sniki/${endpoint}`
}

const fetchData = request => fetch(request)
	.then(response => response.json())

const getAll = () => {
	return fetchData(url('users'))
}

export default {
	getAll
}