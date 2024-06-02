import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { nextQuestion, prevQuestion } from '../features/quiz/quizSlice'
import SingleChoiceQuestion from './SingleChoiceQuestion'
import ShortAnswerQuestion from './ShortAnswerQuestion'
import LongAnswerQuestion from './LongAnswerQuestion'
import '../styles/quizStep.css'
import MultipleChoiceQuestion from './MultipleChoiseQuestion'
import { Button } from '@mui/material'

const QuizStep: React.FC = () => {
	const dispatch = useDispatch()
	const quiz = useSelector((state: RootState) => state.quiz)
	const currentQuestion = quiz.questions[quiz.currentQuestionIndex]

	const renderQuestion = () => {
		switch (currentQuestion.type) {
			case 'single':
				return (
					<SingleChoiceQuestion
						question={currentQuestion.question}
						options={currentQuestion.options!}
						index={quiz.currentQuestionIndex}
					/>
				)
			case 'multiple':
				return (
					<MultipleChoiceQuestion
						question={currentQuestion.question}
						options={currentQuestion.options!}
						index={quiz.currentQuestionIndex}
					/>
				)
			case 'short':
				return (
					<ShortAnswerQuestion
						question={currentQuestion.question}
						index={quiz.currentQuestionIndex}
					/>
				)
			case 'long':
				return (
					<LongAnswerQuestion
						question={currentQuestion.question}
						index={quiz.currentQuestionIndex}
					/>
				)
			default:
				return <div>Unknown question type</div>
		}
	}

	const handleNext = () => {
		dispatch(nextQuestion())
	}

	const handlePrevious = () => {
		dispatch(prevQuestion())
	}

	return (
		<div>
			<div className='progress-bar'>
				{quiz.questions.map((question, index) => {
					const isAnswered =
						quiz.answers[index] !== undefined && quiz.answers[index] !== ''
					return (
						<div
							key={index}
							className={`progress-step ${
								index === quiz.currentQuestionIndex ? 'completed' : 'current'
							} ${isAnswered ? 'answered' : ''}`}
						></div>
					)
				})}
			</div>
			<div className='timer'>
				<strong>Time left:</strong> <em>{quiz.timeLeft} секунд</em>
			</div>
			{renderQuestion()}
			<div className='navigation-buttons'>
				<Button
					size='medium'
					variant='contained'
					onClick={handlePrevious}
					disabled={quiz.currentQuestionIndex === 0}
				>
					Previous
				</Button>
				<Button
					size='medium'
					variant='contained'
					onClick={handleNext}
					disabled={quiz.currentQuestionIndex === quiz.questions.length - 1}
				>
					Next
				</Button>
			</div>
		</div>
	)
}

export default QuizStep
