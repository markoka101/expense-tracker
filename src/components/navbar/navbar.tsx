import type React from 'react';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';

export type NavbarProps = Readonly<{
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>;

export default function Navbar({ isOpen, setIsOpen }: NavbarProps) {
	return (
		<nav>
			<DesktopNavbar />
			<MobileNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
		</nav>
	);
}
