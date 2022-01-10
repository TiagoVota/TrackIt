import joi from 'joi'


const validateHabitCreation = joi.object({
	name: joi.string().min(2).max(22).required(),
	days: joi.array().required()
}).length(2)


export {
	validateHabitCreation,
}
