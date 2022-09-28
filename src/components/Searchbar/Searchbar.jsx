import React from 'react';
import {
	SearchHeader,
	SearchForm,
	SearchButton,
	SearchSpan,
	SearchInput,
} from './Searchbar.styled';

export class Searchbar extends React.Component {
	state = {
		name: '',
	};
	getInputValue = event => {
		const { value } = event.currentTarget;
		this.setState({ name: value });
	};

	handleSubmitForm = e => {
		e.preventDefault();
		if (this.state.name.trim() === '') {
			alert(`пустой`);
			return;
		}
		this.props.onSubmit(this.state.name);
		this.resetForm();
	};

	resetForm = () => {
		this.setState({ name: '' });
	};

	render() {
		return (
			<SearchHeader>
				<SearchForm onSubmit={this.handleSubmitForm}>
					<SearchButton type="submit">
						<SearchSpan>Search</SearchSpan>
					</SearchButton>

					<SearchInput
						onChange={this.getInputValue}
						type="text"
						autocomplete="off"
						autoFocus
						placeholder="Search images and photos"
					/>
				</SearchForm>
			</SearchHeader>
		);
	}
}
