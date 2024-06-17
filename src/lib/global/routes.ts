export class Routes {
	static root = '/';
	static authenticate = '/authenticate';

	static user = (id: string) => `/user/${id}`;
	static user_edit = (id: string) => `${Routes.user(id)}/edit`;

	static ideas = '/ideas';
	static idea = (id: string) => `${Routes.ideas}/${id}`;

	static categories = '/categories';
	static assign = `${Routes.categories}/assign`;

	static admin = '/admin';
}
