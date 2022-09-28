import React from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
// import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import { Loader } from '../Loader/Loader';
export class ImageGallery extends React.Component {
	state = {
		images: [],
		page: 1,
		spinner: false,
	};

	componentDidUpdate(prevProps, prevState) {
		// const { name, page } = this.state;
		if (
			prevProps.searchQuery !== this.props.searchQuery ||
			prevState.page !== this.state.page
		) {
			this.setState({ spinner: true });
			fetch(
				`https://pixabay.com/api/?key=29624202-0ace9f1cfbb26d74e2bd1c2da&q=${this.props.searchQuery}&page=${this.state.page}&per_page=12`
			)
				.then(res => {
					if (res.ok) {
						return res.json();
					}
				})
				// todo Сохроняется результат нашего запроса

				.then(image => {
					this.setState({
						images:
							this.state.page > 1
								? [...this.state.images, ...image.hits]
								: image.hits,
					});
				})
				.catch()
				.finally(this.setState({ spinner: false }));
		}
	}

	onChangePage = () => {
		this.setState(prevState => ({ page: prevState.page + 1 }));
	};

	render() {
		return (
			<>
				{this.state.spinner && <Loader />}
				<ul>
					{this.state.images.map(image => {
						return (
							<ImageGalleryItem
								key={image.webformatURL}
								webformatURL={image.webformatURL}
								largeImageURL={image.largeImageURL}
								alt={image.tags}
							></ImageGalleryItem>
						);
					})}
				</ul>
				{/* <Modal></Modal> */}
				<Button onClick={this.onChangePage}></Button>
			</>
		);
	}
}
