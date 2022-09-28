export const ImageGalleryItem = ({ webformatURL, largeImageURL, alt }) => {
	return (
		<li>
			<img src={webformatURL} alt={alt} />
		</li>
	);
};
