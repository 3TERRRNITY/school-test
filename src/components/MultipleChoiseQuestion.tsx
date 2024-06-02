// src/components/MultipleChoiceQuestion.tsx
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { setAnswer } from '../features/quiz/quizSlice'
import { Checkbox } from '@mui/material'

interface MultipleChoiceQuestionProps {
	question: string
	options: string[]
	index: number
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
	question,
	options,
	index,
}) => {
	const dispatch = useDispatch()
	const answer =
		(useSelector(
			(state: RootState) => state.quiz.answers[index]
		) as string[]) || []

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value, checked } = event.target
		let newAnswer = [...answer]
		if (checked) {
			newAnswer.push(value)
		} else {
			newAnswer = newAnswer.filter(a => a !== value)
		}
		dispatch(setAnswer({ index, answer: newAnswer }))
	}

	return (
		<div>
			<h3>{question}</h3>
			{options.map((option, idx) => (
				<div key={idx}>
					<Checkbox
						value={option}
						checked={answer.includes(option)}
						onChange={handleChange}
					/>
					{option}
				</div>
			))}
		</div>
	)
}

export default MultipleChoiceQuestion
