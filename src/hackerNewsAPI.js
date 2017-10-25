import axios from "axios";
const baseURL = "https://hacker-news.firebaseio.com/v0/";

export function getStories(storyID) {
	const storyPath = `${baseURL}item/${storyID}.json`;
	return axios.get(storyPath);
}

export function getAuthorInfo(AuthorID) {
	const authorPath = `${baseURL}user/${AuthorID}.json`;
	return axios.get(authorPath);
}

export function getStoryIDs() {
	const IDsLocale = `${baseURL}topstories.json`;
	return axios.get(IDsLocale);
}
