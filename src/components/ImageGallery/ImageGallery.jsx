import React from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Modal } from '../Modal/Modal';
import { Button } from 'components/Button/Button';
import { Loader } from '../Loader/Loader';
import { ImageGalleryUl } from './ImageGallery.styled';

export class ImageGallery extends React.Component {
	state = {
		images: [],
		page: 1,
		spinner: false,
		showModal: false,
		modalImage: null,
	};

	async componentDidUpdate(prevProps, prevState) {
		// if (this.state.images !== []) {
		// 	alert('нет такого значения');
		// 	return;
		// }
		if (
			prevProps.searchQuery !== this.props.searchQuery ||
			prevState.page !== this.state.page
		) {
			this.setState({ spinner: true });
			this.fechPikchers();
		}
	}
	fechPikchers = () => {
		fetch(
			`https://pixabay.com/api/?key=29624202-0ace9f1cfbb26d74e2bd1c2da&q=${this.props.searchQuery}&page=${this.state.page}&per_page=12`
		)
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				// return Promise.reject(alert(`nety takoi `));
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

			.finally(() => this.setState({ spinner: false }));

		// .finally(
		// 		() =>
		// 			setTimeout(() => {
		// 				this.setState({ spinner: false });
		// 			}),
		// 		1000
		// 	);
	};
	onChangePage = () => {
		this.setState(prevState => ({ page: prevState.page + 1 }));
	};

	toggleModal = image => {
		this.setState(({ showModal }) => ({
			showModal: !showModal,
			modalImage: image,
		}));
	};

	render() {
		return (
			<>
				{this.state.spinner && <Loader />}
				<ImageGalleryUl>
					{this.state.images.map(image => {
						return (
							<ImageGalleryItem
								key={image.webformatURL}
								webformatURL={image.webformatURL}
								largeImageURL={image.largeImageURL}
								alt={image.tags}
								onClick={this.toggleModal}
							></ImageGalleryItem>
						);
					})}
				</ImageGalleryUl>

				{this.state.showModal && (
					<Modal
						onClick={this.toggleModal}
						modalImage={this.state.modalImage}
					></Modal>
				)}
				<Button onClick={this.onChangePage}></Button>
			</>
		);
	}
}
