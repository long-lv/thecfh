const API_PREFIX = `/${process.env.NEXT_PUBLIC_API_PREFIX}`
export const routesPublic= [
	{
		name: 'login',
		path: '/login'
	},
	{
	name: 'signup',
		path: '/signup'
	},
	{
		name: 'forgotPassword',
		path: '/forgot-password'
	}
]

export const routesConstain = {
	dashboards: {
		name: 'dashboard',
		path: `${API_PREFIX}/dashboards`,
		icon: ''
	},
	categories: {
		name: 'categories',
		path: `${API_PREFIX}/categories`,
		icon: ''
	},
	products: {
		name: 'products',
		path: `${API_PREFIX}/products`
	}
}