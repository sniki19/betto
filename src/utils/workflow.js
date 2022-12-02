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

const boardIdToWorkflowStep = {
	[boardIdList.todo]: workflowSteps[0],
	[boardIdList.inProgress]: workflowSteps[1],
	[boardIdList.done]: workflowSteps[2],
}

const workflowStepToBoardId = {
	[workflowSteps[0]]: boardIdList.todo,
	[workflowSteps[1]]: boardIdList.inProgress,
	[workflowSteps[2]]: boardIdList.done
}

export const getNextWorkflowStep = currentStep => {
	const currentIndex = workflowSteps.indexOf(currentStep)
	return workflowSteps[currentIndex + 1]
}

export const hasNextWorkflowStep = currentStep => {
	const nextStep = getNextWorkflowStep(currentStep)
	return !!nextStep
}

export const getWorkflowStepByBoardId = boardId => {
	return boardIdToWorkflowStep[boardId]
}

export const getBoardByWorkflowStep = step => {
	return workflowStepToBoardId[step]
}