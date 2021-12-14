import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import fetcher from '../fetcher';
import setServerErrors from '../lib/setServerErrors';
import Button from './Button';
import Input from './Input';
import Paper from './Paper';

interface RegisterFormData {
    email: string,
    username: string,
    password: string,
    password_confirmation: string
}

// I know that it's not DRY code, but i hurry

export default function RegisterForm() {
    const router = useRouter();
    const { register, handleSubmit, setError } = useForm<RegisterFormData>()

    const onSubmit = async (data: RegisterFormData) => {
        const json = await fetcher(process.env.NEXT_PUBLIC_API_HOST! + '/auth/register', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        if (json.errors) {
            setServerErrors<RegisterFormData>(json.errors, setError);
            return
        }
        router.push('/')
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
                />
                <Input
                    title="Имя пользователя"
                    placeholder="Введите имя пользователя"
                    label="username"
                    register={register}
                    className="mb-2"
                />
                <Input
                    title="Пароль"
                    placeholder="Введите пароль"
                    label="password"
                    register={register}
                    className="mb-2"
                />
                <Input
                    title="Повторите пароль"
                    placeholder="Введите пароль"
                    label="password_confirmation"
                    register={register}
                    className="mb-4"
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
