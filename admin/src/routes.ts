const API_PREFIX = `/${process.env.NEXT_PUBLIC_API_PREFIX}`;
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupIcon from '@mui/icons-material/Group';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChatIcon from '@mui/icons-material/Chat';
import FeedIcon from '@mui/icons-material/Feed';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
export const routesPublic = [
  {
    name: "login",
    path: "/login",
  },
  {
    name: "signup",
    path: "/signup",
  },
  {
    name: "forgotPassword",
    path: "/forgot-password",
  },
];

export const routesTopList = [
  { name: "Dashboards", path: `${API_PREFIX}/dashboards`, icon: DashboardIcon },
  {
    name: "Users",
    path: null,
    icon: GroupIcon,
    children: [
      { name: "Admins", path: `${API_PREFIX}/users/admins`, icon: AdminPanelSettingsIcon },
      { name: "User Normal", path: `${API_PREFIX}/users/user-nomal`, icon: PersonIcon },
      { name: "Seller", path: `${API_PREFIX}/users/sellers`, icon: AssignmentIndIcon },
    ],
  },
  { name: "Categories", path: `${API_PREFIX}/categories`, icon: CategoryIcon },
  { name: "Products", path: `${API_PREFIX}/products`, icon: InventoryIcon },
  { name: "Orders", path: `${API_PREFIX}/orders`, icon: ShoppingCartIcon },
  { name: "Inquiries", path: `${API_PREFIX}/inquiries`, icon: ChatIcon },
  { name: "Posts", path: `${API_PREFIX}/posts`, icon: FeedIcon },
  { name: "Comments", path: `${API_PREFIX}/comments`, icon: QuestionAnswerIcon },
];

export const routesBotList = [
	{ name: "Setting", path: `${API_PREFIX}/settings`, icon: SettingsIcon },
	{ name: "Logout", path: null, icon: LogoutIcon },
]

export const routesConstain = {
  dashboards: {
    path: `${API_PREFIX}/dashboards`,
  },
  users: {
		path: `${API_PREFIX}/admins`
  },
  categories: {
    path: `${API_PREFIX}/categories`,
  },
  products: {
    path: `${API_PREFIX}/products`,
  },
  oders: {
    path: `${API_PREFIX}/posts`,
  },
  inquiries: {
    path: `${API_PREFIX}/inquiries`,
  },
  posts: {
    path: `${API_PREFIX}/posts`,
  },
  comments: {
    path: `${API_PREFIX}/comments`,
  },
};