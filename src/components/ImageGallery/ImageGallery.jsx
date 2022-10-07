import { useState, useEffect } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Modal } from '../Modal/Modal';
import { Button } from 'components/Button/Button';
import { Loader } from '../Loader/Loader';
import { ImageGalleryUl } from './ImageGallery.styled';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export function ImageGallery({ searchQuery, page, onChangePage }) {
	const [image, setImage] = useState([]);
	const [spinner, setSpinner] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [modalImage, setmModalImage] = useState(null);

	useEffect(() => {
		if (searchQuery) {
			setSpinner(true);
			fetch(
				`https://pixabay.com/api/?key=29624202-0ace9f1cfbb26d74e2bd1c2da&q=${searchQuery}&page=${page}&per_page=12`
			)
				.then(res => {
					if (res.ok) {
						return res.json();
					}
				})

				// !!!!!! Сохроняется результат нашего запроса
				.then(image => {
					page > 1
						? setImage(prevImage => [...prevImage, ...image.hits])
						: setImage(image.hits);
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
							`Sorry, there are no ${searchQuery} images matching your search query. Please try again.`,
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

				.finally(() => setSpinner(false));
		}
	}, [page, searchQuery]);

	const toggleModal = modalImage => {
		setShowModal(!showModal);
		setmModalImage(modalImage);
	};
	console.log(image);
	return (
		<>
			{spinner && <Loader />}
			<ImageGalleryUl>
				{image.map(images => {
					return (
						<ImageGalleryItem
							key={images.webformatURL}
							webformatURL={images.webformatURL}
							largeImageURL={images.largeImageURL}
							alt={images.tags}
							onClick={toggleModal}
						></ImageGalleryItem>
					);
				})}
			</ImageGalleryUl>
			{showModal && (
				<Modal onClick={toggleModal} modalImage={modalImage}></Modal>
			)}
			{image.length < 12 ? null : <Button onClick={onChangePage}></Button>}
		</>
	);
}

ImageGallery.propTypes = {
	searchQuery: PropTypes.string.isRequired,
	page: PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired,
};
