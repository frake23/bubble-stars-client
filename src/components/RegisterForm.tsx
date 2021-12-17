import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import fetcher from '../fetcher';
import useUser from '../hooks/useUser';
import setServerErrors from '../lib/setServerErrors';
import Button from './Button';
import {Input} from './Controls';
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

    const onSubmit = async (data: RegisterFormData) => {
        const json = await fetcher(process.env.NEXT_PUBLIC_API_HOST! + '/auth/register', {
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
        <Paper className="w-80 flex-shrink flex flex-col">
            <h1 className="text-2xl font-bold mb-2">Регистрация</h1>
            <form className="flex flex-col mb-2" onSubmit={handleSubmit(onSubmit)}>
                <Input
                    title="Почта"
                    placeholder="Введите почту"
                    label="email"
                    register={register}
                    className="mb-2"
                    error={errors.email?.message}
                />
                <Input
                    title="Имя пользователя"
                    placeholder="Введите имя пользователя"
                    label="username"
                    register={register}
                    className="mb-2"
                    error={errors.username?.message}
                />
                <Input
                    title="Пароль"
                    placeholder="Введите пароль"
                    label="password"
                    register={register}
                    className="mb-4"
                    error={errors.password?.message}
                />
                <Button title="Зарегестрироваться"/>
            </form>
            <span className="text-xs text-gray-500">Есть аккаунт? <Link href="/login" passHref>
                <a className="text-pink-500">
                    Войдите!
                </a>
            </Link></span>
        </Paper>
    )
}
