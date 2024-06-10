export class Routes {
	static root = '/';
	static home = '/';
	static authenticate = '/authenticate';
	static user = (id: string) => `/user/${id}`;
	static user_edit = (id: string) => `${Routes.user(id)}/edit`;
}
