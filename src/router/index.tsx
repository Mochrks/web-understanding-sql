import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '@/pages/homes/Home';
import NotFound from '@/components/demo/NotFound';



const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {/* dev understanding be */}
            <Route path="/" element={<Home />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
