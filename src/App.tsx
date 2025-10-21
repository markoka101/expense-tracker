import React, { useState } from 'react';
import { Home } from './pages/Home';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	ArcElement,
	Title,
	Tooltip,
	Legend,
	Filler
} from 'chart.js';
import { Navbar } from './components/navbar';
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	ArcElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

function App() {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	return (
		<main className="flex min-h-[100vh] overflow-x-hidden overflow-y-auto">
			<Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
			<Home />
		</main>
	);
}

export default App;
