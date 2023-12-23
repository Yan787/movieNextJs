import { getAdminHomeUrl, getAdminUrl } from "@/config/urlConfig";
import { INavItem } from "./AdminNavigationInterface";

export const navItems: INavItem[] = [
    {
		title: 'Statistics',
		link: getAdminHomeUrl(),
	},
	{
		title: 'Users',
		link: getAdminUrl('users'),
	},
	{
		title: 'Movies',
		link: getAdminUrl('movies'),
	},
	{
		title: 'Actors',
		link: getAdminUrl('actors'),
	},
	{
		title: 'Genres',
		link: getAdminUrl('genres'),
	},
]