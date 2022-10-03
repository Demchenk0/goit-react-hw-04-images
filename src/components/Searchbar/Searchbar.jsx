import { useState } from 'react';
import {
	SearchHeader,
	SearchForm,
	SearchButton,
	SearchSpan,
	SearchInput,
} from './Searchbar.styled';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export function Searchbar({ onSubmit }) {
	const [name, setName] = useState('');

	const getInputValue = event => {
		const { value } = event.currentTarget;
		setName(value);
	};

	const handleSubmitForm = e => {
		e.preventDefault();
		if (name.trim() === '') {
			toast('🦄 Wow so easy!', {
				position: 'top-left',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			return;
		}
		onSubmit(name);
		resetForm();
	};

	const resetForm = () => {
		setName('');
	};

	return (
		<SearchHeader>
			<SearchForm onSubmit={handleSubmitForm}>
				<SearchButton type="submit">
					<SearchSpan>Search</SearchSpan>
				</SearchButton>

				<SearchInput
					onChange={getInputValue}
					type="text"
					autocomplete="off"
					autoFocus
					placeholder="Search images and photos"
				/>
			</SearchForm>
		</SearchHeader>
	);
}

Searchbar.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};
