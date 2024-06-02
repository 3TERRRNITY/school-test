// src/components/QuizStep.tsx
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { nextQuestion, prevQuestion } from '../features/quiz/quizSlice'
import SingleChoiceQuestion from './SingleChoiceQuestion'
import ShortAnswerQuestion from './ShortAnswerQuestion'
import LongAnswerQuestion from './LongAnswerQuestion'
import MultipleChoiceQuestion from './MultipleChoiseQuestion'
import '../styles/quizStep.css'

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
				{quiz.questions.map((_, index) => (
					<div
						key={index}
						className={`progress-step ${
							index <= quiz.currentQuestionIndex ? 'completed' : ''
						}`}
					></div>
				))}
			</div>
			<div className='timer'>Time left: {quiz.timeLeft} seconds</div>
			{renderQuestion()}
			<div className='navigation-buttons'>
				<button
					onClick={handlePrevious}
					disabled={quiz.currentQuestionIndex === 0}
				>
					Previous
				</button>
				<button
					onClick={handleNext}
					disabled={quiz.currentQuestionIndex === quiz.questions.length - 1}
				>
					Next
				</button>
			</div>
		</div>
	)
}

export default QuizStep
