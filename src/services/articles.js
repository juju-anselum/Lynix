import { createSlice } from "@reduxjs/toolkit";

export const articlesSlice = createSlice({
	name: "articles",
	initialState: {
		allArticles: [],
		currentArticle: {},
	},
	reducers: {
		fetchArticles: (state) => {
			const allArticles = JSON.parse(localStorage.getItem("articles"));
			state.allArticles = allArticles || [];
		},
		setCurrentArticle: (state, action) => {
			state.currentArticle = state.allArticles.filter(
				(article) => article.url === action.payload
			)
		},
		addArticle: (state, action) => {
			state.allArticles.push(action.payload);
			localStorage.setItem("articles", JSON.stringify(state.allArticles));
		},
		deleteArticle: (state, action) => {
			state.allArticles = state.allArticles.filter(
				(article) => article.url !== action.payload
			);
			localStorage.setItem("articles", JSON.stringify(state.allArticles));
		},
		createNewArticle: (state) => {
			state.currentArticle = {}
		}
	},
});

export const {
	fetchArticles,
	setCurrentArticle,
	addArticle,
	deleteArticle,
	createNewArticle
} = articlesSlice.actions;

export default articlesSlice.reducer;