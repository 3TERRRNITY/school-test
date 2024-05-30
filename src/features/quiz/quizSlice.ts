import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Question {
	id: number
	type: string
	question: string
	options?: string[]
	answer?: string | string[]
}

interface QuizState {
	questions: Question[]
	currentQuestionIndex: number
	answers: (string | string[])[]
}

const initialState: QuizState = {
	questions: [
		// Mock questions
		{
			id: 1,
			type: 'single',
			question: 'Сколько будет 2+2?',
			options: ['3', '4', '5'],
			answer: '',
		},
		{
			id: 2,
			type: 'multiple',
			question: 'А 2 * 2?',
			options: ['2', '3', '4', '5'],
			answer: [],
		},
		{
			id: 3,
			type: 'short',
			question: 'Столица Макаронии',
			answer: '',
		},
		{
			id: 4,
			type: 'long',
			question: 'Сколько раз подтягиваешься?',
			answer: '',
		},
	],
	currentQuestionIndex: 0,
	answers: [],
}

const quizSlice = createSlice({
	name: 'quiz',
	initialState,
	reducers: {
		setAnswer: (
			state,
			action: PayloadAction<{ index: number; answer: string | string[] }>
		) => {
			state.answers[action.payload.index] = action.payload.answer
		},
		nextQuestion: state => {
			if (state.currentQuestionIndex < state.questions.length - 1) {
				state.currentQuestionIndex += 1
			}
		},
		prevQuestion: state => {
			if (state.currentQuestionIndex > 0) {
				state.currentQuestionIndex -= 1
			}
		},
	},
})

export const { setAnswer, nextQuestion, prevQuestion } = quizSlice.actions
export default quizSlice.reducer
