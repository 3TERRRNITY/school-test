// src/components/LongAnswerQuestion.tsx
import React from 'react'
import { useDispatch } from 'react-redux'
import { setAnswer } from '../features/quiz/quizSlice'

interface LongAnswerQuestionProps {
	question: string
	index: number
}

const LongAnswerQuestion: React.FC<LongAnswerQuestionProps> = ({
	question,
	index,
}) => {
	const dispatch = useDispatch()

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		dispatch(setAnswer({ index, answer: event.target.value }))
	}

	return (
		<div>
			<h3>{question}</h3>
			<textarea onChange={handleChange} />
		</div>
	)
}

export default LongAnswerQuestion
