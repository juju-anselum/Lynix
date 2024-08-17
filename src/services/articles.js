import { createSlice } from "@reduxjs/toolkit";

export const articlesSlice = createSlice({
	name: "articles",
	initialState: {
		allArticles: [],
		currentArticle: {},
		isFetching: false,
		error: '',
	},
	reducers: {
		fetchArticles: (state) => {
			const allArticles = JSON.parse(localStorage.getItem("articles"));
			state.allArticles = allArticles || [];
		},
		setCurrentArticle: (state, action) => {
			state.currentArticle = action.payload;
		},
		addArticle: (state, action) => {
			state.allArticles.unshift(action.payload);
			state.currentArticle = action.payload;
			localStorage.setItem("articles", JSON.stringify(state.allArticles));
		},
		deleteArticle: (state, action) => {
			state.allArticles = state.allArticles.filter(
				(article) => article.url !== action.payload
			);
			state.currentArticle = {};
			localStorage.setItem("articles", JSON.stringify(state.allArticles));
		},
		createNewArticle: (state) => {
			state.currentArticle = {};
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
	fetchArticles,
	setCurrentArticle,
	addArticle,
	deleteArticle,
	createNewArticle,
	updateIsFetching,
	updateError
} = articlesSlice.actions;

export default articlesSlice.reducer;
