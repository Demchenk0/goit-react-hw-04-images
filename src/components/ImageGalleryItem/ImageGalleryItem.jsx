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
		<ImageGalleryItemLi>
			<ImageGalleryItemImg
				src={webformatURL}
				alt={alt}
				onClick={() => onClick(largeImageURL)}
			/>
		</ImageGalleryItemLi>
	);
};
