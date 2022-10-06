import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay, ModalWindow } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ onClick, modalImage, alt }) {
	useEffect(() => {
		const handleKeyDown = e => {
			if (e.code === 'Escape') {
				onClick();
			}
		};
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [onClick]);

	return createPortal(
		<ModalOverlay onClick={onClick}>
			<ModalWindow>
				<img src={modalImage} alt={alt} />
			</ModalWindow>
		</ModalOverlay>,
		modalRoot
	);
}

Modal.propTypes = {
	modalImage: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	alt: PropTypes.string,
};
