import { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './ImageGallery/ImageGallery';

export function App() {
	const [name, setName] = useState('');
	const [page, setPage] = useState(1);

	const submitForm = submitValue => {
		setName(submitValue);
		setPage(1);

		//! Вдруг будет завтык!!!!!!
	};
	const onChangePage = () => {
		setPage(prevState => prevState + 1);
	};
	{
		return (
			<div>
				<Searchbar onSubmit={submitForm}></Searchbar>
				<ImageGallery
					searchQuery={name}
					page={page}
					onChangePage={onChangePage}
				></ImageGallery>
				<ToastContainer
					position="top-left"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
			</div>
		);
	}
}
