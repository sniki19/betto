const workflowSteps = [
	'todo',
	'inProgress',
	'done'
]

export const boardIdList = {
	todo: 'todoBoard',
	inProgress: 'inProgressBoard',
	done: 'doneBoard'
}

const boardToWorkflowStep = {
	[boardIdList.todo]: workflowSteps[0],
	[boardIdList.inProgress]: workflowSteps[1],
	[boardIdList.done]: workflowSteps[2],
}

export const getNextWorkflowStep = currentStep => {
	const currentIndex = workflowSteps.indexOf(currentStep)
	return workflowSteps[currentIndex + 1]
}

export const nextWorkflowStepExists = currentStep => {
	const nextStep = getNextWorkflowStep(currentStep)
	return !!nextStep
}

export const getWorkflowStep = boardId => {
	return boardToWorkflowStep[boardId]
}