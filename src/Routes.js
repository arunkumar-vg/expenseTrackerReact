import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';

const Routs = () => {
	return (
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="home" element={<LandingPage />} />
		</Routes>
	);
};

export default Routs;
