import type { NextPage } from 'next';
import React from 'react';
import MainLayout from '../../components/MainLayout';
import useAuthRedirect from '../../hooks/useAuthRedirect';

const CreatePage: NextPage = () => {
    useAuthRedirect({ to: '/login' });

    return (
        <MainLayout>

        </MainLayout>
    )
}

export default CreatePage;
