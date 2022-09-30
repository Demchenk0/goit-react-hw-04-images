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
