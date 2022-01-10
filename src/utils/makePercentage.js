const calcPercentage = (todayList) => {
	const done = todayList.reduce((acc, { done }) => done ? acc + 1 : acc, 0) || 0
	const total = todayList.length
	
	return (done / total)
}

const sanitizePercentage = percentage => Math.round(percentage * 100)

const makePercentage = (todayList) => {
	const percentage = calcPercentage(todayList)
	return sanitizePercentage(percentage)
}

export {
	makePercentage,
}
