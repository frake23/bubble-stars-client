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

interface RegisterFormData {
    email: string,
    username: string,
    password: string,
}

// I know that it's not DRY code, but i hurry

export default function RegisterForm() {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<RegisterFormData>();
    const { mutate } = useUser();

    const {t} = useTranslation('register')

    const onSubmit = async (data: RegisterFormData) => {
        const json: FormResponse<RegisterFormData> = await fetcher(process.env.NEXT_PUBLIC_API_HOST! + '/auth/register', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        if (json.errors) {
            setServerErrors<RegisterFormData>(json.errors, setError);
            return
        }
        mutate!();
    }

    return (
        <Paper className="w-96 flex-shrink flex flex-col">
            <h1 className="text-2xl font-bold mb-2">{t('header')}</h1>
            <form className="flex flex-col mb-2" onSubmit={handleSubmit(onSubmit)}>
                <InputControl
                    title={t('email')}
                    placeholder={t('emailPlaceholder')}
                    label="email"
                    register={register}
                    className="mb-2"
                    error={errors.email?.message}
                />
                <InputControl
                    title={t('username')}
                    placeholder={t('usernamePlaceholder')}
                    label="username"
                    register={register}
                    className="mb-2"
                    error={errors.username?.message}
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
            <span className="text-xs text-gray-500">{t('haveAccount')} <Link href="/login" passHref>
                <a className="text-blue-500">
                    {t('signIn')}
                </a>
            </Link></span>
        </Paper>
    )
}
