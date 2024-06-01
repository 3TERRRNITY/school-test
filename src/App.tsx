import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './store'
import { nextQuestion, prevQuestion } from './features/quiz/quizSlice'
import SingleChoiceQuestion from './components/SingleChoiceQuestion'
import ShortAnswerQuestion from './components/ShortAnswerQuestion'
import LongAnswerQuestion from './components/LongAnswerQuestion'
import MultipleChoiceQuestion from './components/MultipleChoiseQuestion'

const App: React.FC = () => {
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

	return (
		<div>
			{renderQuestion()}
			<div>
				<button
					onClick={() => dispatch(prevQuestion())}
					disabled={quiz.currentQuestionIndex === 0}
				>
					Previous
				</button>
				<button
					onClick={() => dispatch(nextQuestion())}
					disabled={quiz.currentQuestionIndex === quiz.questions.length - 1}
				>
					Next
				</button>
			</div>
		</div>
	)
}

export default App
