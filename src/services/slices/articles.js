import { createSlice } from "@reduxjs/toolkit";

export const articlesSlice = createSlice({
	name: "articles",
	initialState: {
		allArticles: [],
		currentArticle: {},
		isFetching: false,
		isSummarizing: false,
		isUpdating: false,
		error: '',
	},
	reducers: {
		setCurrentArticle: (state, action) => {
			if (action.payload === null)
				state.currentArticle = {};
			else
				state.currentArticle = action.payload;
		},
		setAllArticles: (state, action) => {
			state.allArticles = action.payload;
		},
		addArticle: (state, action) => {
			state.allArticles.unshift(action.payload);
			state.currentArticle = action.payload;
		},
		deleteArticle: (state, action) => {
			state.allArticles = state.allArticles.filter(
				(article) => article.url !== action.payload
			);
			state.currentArticle = {};
		},
		createNewArticle: (state) => {
			state.currentArticle = {};
		},
		updateIsSummarizing: (state, action) => {
			state.isSummarizing = action.payload;
		},
		updateIsFetching: (state, action) => {
			state.isFetching = action.payload;
		},
		updateError: (state, action) => {
			state.error = action.payload;
		}
	}
});

export const {
	setCurrentArticle,
	setAllArticles,
	addArticle,
	deleteArticle,
	createNewArticle,
	updateIsSummarizing,
	updateIsFetching,
	updateError
} = articlesSlice.actions;

export default articlesSlice.reducer;
