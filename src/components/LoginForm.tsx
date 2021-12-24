import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import fetcher from '../fetcher';
import useUser from '../hooks/useUser';
import setServerErrors from '../lib/setServerErrors';
import { FormResponse } from '../types/responses';
import Button from './Button';
import {InputControl} from './Controls';
import Paper from './Paper';

interface LoginFormData {
    login: string,
    password: string
}

export default function LoginForm() { 
    
    const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginFormData>();
    const { mutate } = useUser();
    const {t} = useTranslation('login')

    const onSubmit = async (data: LoginFormData) => {
        const json: FormResponse<LoginFormData> = await fetcher(process.env.NEXT_PUBLIC_API_HOST! + '/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
        });
        if (json.errors) {
            setServerErrors<LoginFormData>(json.errors, setError);
            return
        }
        mutate!();
    }
    
    return (
        <Paper className="w-96 flex-shrink flex flex-col">
            <h1 className="text-2xl font-bold mb-2">{t('header')}</h1>
            <form className="flex flex-col mb-2" onSubmit={handleSubmit(onSubmit)}>
                <InputControl
                    title={t('usernameOrEmail')}
                    placeholder={t('loginPlaceholder')}
                    label="login"
                    register={register}
                    className="mb-2"
                    error={errors.login?.message}
                />
                <InputControl
                    title={t('password')}
                    placeholder={t('passwordPlaceholder')}
                    label="password"
                    register={register}
                    className="mb-4"
                    error={errors.password?.message}

                />
                <Button title={t('button')}/>
            </form>
            <span className="text-xs text-gray-500">{t('haveAccount')} <Link href="/register" passHref>
                <a className="text-blue-500">
                    {t('signUp')}
                </a>
            </Link></span>
        </Paper>
    )
}
