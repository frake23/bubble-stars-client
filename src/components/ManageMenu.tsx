import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';
import Paper from './Paper';

interface ManageMenuProps {
    section: 'all' | 'new' | 'update',
    className?: string
}

const ManageMenu: React.FC<ManageMenuProps> = ({section, className}) => {
    const {t} = useTranslation('manage');
    return (
        <Paper className={`flex flex-col text-center divide-y ${className ? className : ''}`}>
            <MenuItem 
                active={section === 'all'}
                name='all'
                text={t('your')}
            />
            <MenuItem 
                active={section !== 'all'}
                name='new'
                text={t('create')}
            />
        </Paper>
    )
}

const MenuItem: React.FC<{active: boolean, name: string, text: string}> = ({active, name, text}) => {
    return (
        <Link 
            href={`/bubbles/manage/${name}`} 
            passHref
        >
            <a className={`
                text-lg
                font-medium
                ${active ? 'text-blue-500' : 'text-gray-700'}
                py-2
            `}>
                {text}
            </a>
        </Link>
    )
}

export default ManageMenu
