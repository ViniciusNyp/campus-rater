import { Menu, UserCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from 'src/providers/auth';

export function Header() {
	const { setToken } = useAuth();
	const navigate = useNavigate();

	const logout = () => {
		setToken(null);
		navigate('/login');
	};

	return (
		<header className="sticky top-0 flex items-center h-16 gap-4 px-4 border-b bg-background md:px-6">
			<nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
				<Link to="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
					<img src="../../../public/favicon.ico" alt="Campus Rater Icon" className="max-h-8" />
				</Link>
				<Link to="#" className="transition-colors text-foreground hover:text-foreground">
					Reviews
				</Link>
			</nav>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline" size="icon" className="shrink-0 md:hidden">
						<Menu className="w-5 h-5" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left">
					<nav className="grid gap-6 text-lg font-medium">
						<Link to="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
							<img src="../../../public/favicon.ico" alt="Campus Rater Icon" className="max-h-8" />
						</Link>
						<Link to="/home" className="hover:text-foreground">
							Reviews
						</Link>
					</nav>
				</SheetContent>
			</Sheet>
			<div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
				<form className="flex-1 ml-auto sm:flex-initial">
					<div className="relative">
						{/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search reviews..."
							className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
						/> */}
					</div>
				</form>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="secondary" size="icon" className="rounded-full">
							<UserCircle className="w-5 h-5" />
							<span className="sr-only">Toggle user menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{/* <DropdownMenuItem>My Account</DropdownMenuItem>
						<DropdownMenuSeparator /> */}
						<DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}
