import React from 'react';
import { Searchbar } from './Searchbar/Searchbar';
// import { getServer } from '../apiComponent/Api';

import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends React.Component {
	state = {
		name: '',
	};

	submitForm = submitValue => {
		this.setState({ name: submitValue });
		//! Вдруг будет завтык!!!!!!
	};

	render() {
		return (
			<div>
				<Searchbar onSubmit={this.submitForm}></Searchbar>
				<ImageGallery searchQuery={this.state.name}></ImageGallery>
			</div>
		);
	}
}
