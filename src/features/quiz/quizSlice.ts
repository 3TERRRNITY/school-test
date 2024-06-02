// src/features/quiz/quizSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

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
	timeLeft: number
}

const initialState: QuizState = {
	questions: [
		{
			id: 1,
			type: 'single',
			question: '2+2?',
			options: ['3', '4', '5'],
			answer: '',
		},
		{
			id: 2,
			type: 'multiple',
			question: 'Кто круче?',
			options: ['2', '3', '4', '5'],
			answer: [],
		},
		{ id: 3, type: 'short', question: 'Столица Макаронии', answer: '' },
		{
			id: 4,
			type: 'long',
			question: 'Сколько от груди жмешь старый?',
			answer: '',
		},
	],
	currentQuestionIndex: 0,
	answers: [],
	timeLeft: 300,
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
		decrementTime: state => {
			state.timeLeft -= 1
		},
		resetQuiz: state => {
			state.currentQuestionIndex = 0
			state.answers = []
			state.timeLeft = 300
		},
	},
})

export const {
	setAnswer,
	nextQuestion,
	prevQuestion,
	decrementTime,
	resetQuiz,
} = quizSlice.actions

const persistConfig = {
	key: 'quiz',
	storage,
	whitelist: ['currentQuestionIndex', 'answers', 'timeLeft'],
}

export default persistReducer(persistConfig, quizSlice.reducer)
