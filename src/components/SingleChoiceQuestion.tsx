// src/components/SingleChoiceQuestion.tsx
import React from 'react'
import { useDispatch } from 'react-redux'
import { setAnswer } from '../features/quiz/quizSlice'
import { Radio } from '@mui/material'

interface SingleChoiceQuestionProps {
	question: string
	options: string[]
	index: number
}

const SingleChoiceQuestion: React.FC<SingleChoiceQuestionProps> = ({
	question,
	options,
	index,
}) => {
	const dispatch = useDispatch()

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setAnswer({ index, answer: event.target.value }))
	}

	return (
		<div>
			<h3>{question}</h3>
			{options.map((option, idx) => (
				<div key={idx}>
					<input
						type='radio'
						name={`question-${index}`}
						value={option}
						onChange={handleChange}
					/>
					{option}
				</div>
			))}
		</div>
	)
}

export default SingleChoiceQuestion
