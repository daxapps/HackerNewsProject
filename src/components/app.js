import moment from "moment";
import React, { Component } from "react";
import { getStoryIDs, getStories, getAuthorInfo } from "../hackerNewsAPI";
import Story from "./story";

export default class App extends Component {
	constructor() {
		super();

		this.state = {
			number: "101",
			firstTen: [],
			tenStories: [],
			authorIDs: [],
			authorObjects: [],
			storyBlob: [],
			storyNum: 0,
			karmas: [],
			keyID: 0
		};

		this.retrieveStories = this.retrieveStories.bind(this);
		this.retrieveAuthors = this.retrieveAuthors.bind(this);
		this.addKarmaDateCommentProps = this.addKarmaDateCommentProps.bind(this);
		this.renderStory = this.renderStory.bind(this);
		this.addStoryNumberProp = this.addStoryNumberProp.bind(this);
	}

	async componentWillMount() {
		const json = await getStoryIDs();
		const data = json.data;
		const firstTen = data.filter(id => {
			return data.indexOf(id) <= 9;
		});
		this.setState({ firstTen });
		this.retrieveStories();
	}

	async retrieveStories() {
		const tenIDs = this.state.firstTen;
		const tenStories = await Promise.all(
			tenIDs.map(async id => {
				return getStories(id).then(story => {
					return story;
				});
			})
		);
		this.setState({ tenStories });
		const authors = this.state.tenStories.map(story => {
			return story.data.by;
		});
		this.setState({ authorIDs: authors });
		this.retrieveAuthors();
	}

	async retrieveAuthors() {
		const authorObjects = await Promise.all(
			this.state.authorIDs.map(async id => {
				return getAuthorInfo(id).then(authorObject => {
					return authorObject;
				});
			})
		);
		this.setState({ authorObjects });
		this.addKarmaDateCommentProps();
	}

	addKarmaDateCommentProps() {
		const karmas = this.state.authorObjects.map(author => {
			return author.data.karma;
		});
		const storyBlob = this.state.tenStories.map(story => {
			const storyIndex = this.state.tenStories.indexOf(story);
			const match = karmas.filter(score => {
				const karmasIndex = karmas.indexOf(score);
				return karmasIndex === storyIndex;
			});
			story.data.karmaScore = match;
			const newTime = moment(story.data.time * 1000)
				.startOf("hour")
				.fromNow();
			let kidNum = "";
			if (story.data.hasOwnProperty("kids")) {
				kidNum = story.data.kids.length;
			} else kidNum = 0;
			story.data.time = newTime;
			story.data.comments = kidNum;
			return story;
		});
		storyBlob.sort((storyOne, storyTwo) => {
			return storyOne.data.score - storyTwo.data.score;
		});
		this.setState({ tenStories: storyBlob });
		this.addStoryNumberProp();
	}

	addStoryNumberProp() {
		const storyIDs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		const storyGroup = this.state.tenStories.map(story => {
			const storyIndex = this.state.tenStories.indexOf(story);
			const match = storyIDs.filter(id => {
				const idIndex = storyIDs.indexOf(id);
				return idIndex === storyIndex;
			});
			story.data.storyNum = match;
			return story;
		});
		this.setState({ tenStories: storyGroup });
	}

	renderStory(story) {
		// Assign unique key for each story
		const getRandom = Math.random();
		return (
			<div key={`${getRandom}`}>
				<Story storyData={story} />
			</div>
		);
	}

	render() {
		return (
			<div>
				<h1>Hacker News</h1>
				<div>
					{this.state.tenStories.map(story => this.renderStory(story))}
				</div>
			</div>
		);
	}
}
