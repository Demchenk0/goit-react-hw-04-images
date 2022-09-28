const BASE_URL = 'https://pixabay.com/api/';
const KEY = '?key=29624202-0ace9f1cfbb26d74e2bd1c2da';
const perPage = 12;

export const getServer = (name, page) => {
	fetch(
		`${BASE_URL}${KEY}&q=${name}&page=${page}&image_type=photo&orientation=horizontal&per_page=${perPage}`
	).then(res => {
		if (res.ok) {
			return res.json();
		}
	});
};
