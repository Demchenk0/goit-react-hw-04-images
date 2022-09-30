import React from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Modal } from '../Modal/Modal';
import { Button } from 'components/Button/Button';
import { Loader } from '../Loader/Loader';
import { ImageGalleryUl } from './ImageGallery.styled';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export class ImageGallery extends React.Component {
	state = {
		images: [],
		page: 1,
		spinner: false,
		showModal: false,
		modalImage: null,
	};

	async componentDidUpdate(prevProps) {
		if (
			prevProps.searchQuery !== this.props.searchQuery ||
			prevProps.page !== this.props.page
		) {
			this.setState({ spinner: true });
			this.fechPikchers();
		}
	}
	fechPikchers = () => {
		fetch(
			`https://pixabay.com/api/?key=29624202-0ace9f1cfbb26d74e2bd1c2da&q=${this.props.searchQuery}&page=${this.props.page}&per_page=12`
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
						this.props.page > 1
							? [...this.state.images, ...image.hits]
							: image.hits,
				});
				if (image.hits.length) {
					toast.success(`Hooray! We found ${image.total} images.`, {
						position: 'top-right',
						autoClose: 1000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				} else {
					toast.info(
						`Sorry, there are no ${this.props.searchQuery} images matching your search query. Please try again.`,
						{
							position: 'top-right',
							autoClose: 3000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
						}
					);
				}
			})
			.catch()

			.finally(() => this.setState({ spinner: false }));
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
				{this.state.images.length ? (
					<Button onClick={this.props.onChangePage}></Button>
				) : null}
			</>
		);
	}
}

ImageGallery.propTypes = {
	searchQuery: PropTypes.string.isRequired,
	page: PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired,
};
