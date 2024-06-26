import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store'
import { decrementTime, resetQuiz } from './features/quiz/quizSlice'
import QuizStep from './components/QuizStep'
import './styles/app.css'
import { Button, DialogTitle } from '@mui/material'

const App: React.FC = () => {
	const dispatch = useDispatch()
	const quiz = useSelector((state: RootState) => state.quiz)

	useEffect(() => {
		const timer = setInterval(() => {
			if (quiz.timeLeft > 0) {
				dispatch(decrementTime())
			} else {
				clearInterval(timer)
				alert('Time is up!')
			}
		}, 1000)

		return () => clearInterval(timer)
	}, [dispatch, quiz.timeLeft])

	const handleRestart = () => {
		dispatch(resetQuiz())
	}

	return (
		<div className='app-container'>
			<h1>Тестирование</h1>
			<QuizStep />
			<Button variant='outlined' size='large' onClick={handleRestart}>
				Restart Quiz
			</Button>
		</div>
	)
}

export default App
