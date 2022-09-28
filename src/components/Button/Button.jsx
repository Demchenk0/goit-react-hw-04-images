import { LoadMore } from './Button.styled';

export const Button = ({ onClick }) => {
	return (
		<LoadMore type="button" onClick={onClick}>
			Load more
		</LoadMore>
	);
};
