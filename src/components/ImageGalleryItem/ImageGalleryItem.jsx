import PropTypes from 'prop-types';
import {
	ImageGalleryItemLi,
	ImageGalleryItemImg,
} from './ImageGalleryItem.styled';
export const ImageGalleryItem = ({
	webformatURL,
	largeImageURL,
	alt,
	onClick,
}) => {
	return (
		<ImageGalleryItemLi onClick={() => onClick(largeImageURL)}>
			<ImageGalleryItemImg src={webformatURL} alt={alt} />
		</ImageGalleryItemLi>
	);
};
ImageGalleryItem.propTypes = {
	webformatURL: PropTypes.string.isRequired,
	largeImageURL: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	alt: PropTypes.string.isRequired,
};
