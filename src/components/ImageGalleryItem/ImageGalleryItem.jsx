export const ImageGalleryItem = ({
	webformatURL,
	largeImageURL,
	alt,
	onClick,
}) => {
	return (
		<li>
			<img
				src={webformatURL}
				alt={alt}
				onClick={() => onClick(largeImageURL)}
			/>
		</li>
	);
};
