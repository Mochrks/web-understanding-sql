import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import Dashboard from '@/pages/Dashboard';
import TopicDetail from '@/pages/TopicDetail';
import SQLEditorPage from '@/pages/SQLEditorPage';
import NotFound from '@/components/demo/NotFound';

const AppRoutes: React.FC = () => {
    return (
        <MainLayout>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/topic/:slug" element={<TopicDetail />} />
                <Route path="/sql-editor" element={<SQLEditorPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </MainLayout>
    );
};

export default AppRoutes;
