import React from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay, ModalWindow } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends React.Component {
	componentDidMount = () => {
		window.addEventListener('keydown', this.handleKeyDown);
	};
	componentWillUnmount = () => {
		window.removeEventListener('keydown', this.handleKeyDown);
	};

	handleKeyDown = e => {
		if (e.code === 'Escape') {
			this.props.onClick();
		}
	};

	render() {
		const { modalImage, alt, onClick } = this.props;
		return createPortal(
			<ModalOverlay onClick={onClick}>
				<ModalWindow>
					<img src={modalImage} alt={alt} />
				</ModalWindow>
			</ModalOverlay>,
			modalRoot
		);
	}
}
Modal.propTypes = {
	modalImage: PropTypes.string.isRequired,
	alt: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired,
};
