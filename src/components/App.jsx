import React from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends React.Component {
	state = {
		name: '',
		page: 1,
	};

	submitForm = submitValue => {
		this.setState({ name: submitValue, page: 1 });
		//! Вдруг будет завтык!!!!!!
	};
	onChangePage = () => {
		this.setState(prevState => ({ page: prevState.page + 1 }));
	};
	render() {
		return (
			<div>
				<Searchbar onSubmit={this.submitForm}></Searchbar>
				<ImageGallery
					searchQuery={this.state.name}
					page={this.state.page}
					onChangePage={this.onChangePage}
				></ImageGallery>
				<ToastContainer
					position="top-left"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
			</div>
		);
	}
}
