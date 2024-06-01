// src/components/ShortAnswerQuestion.tsx
import React from 'react'
import { useDispatch } from 'react-redux'
import { setAnswer } from '../features/quiz/quizSlice'

interface ShortAnswerQuestionProps {
	question: string
	index: number
}

const ShortAnswerQuestion: React.FC<ShortAnswerQuestionProps> = ({
	question,
	index,
}) => {
	const dispatch = useDispatch()

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setAnswer({ index, answer: event.target.value }))
	}

	return (
		<div>
			<h3>{question}</h3>
			<input type='text' onChange={handleChange} />
		</div>
	)
}

export default ShortAnswerQuestion
