import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import fetcher from '../fetcher';
import setServerErrors from '../lib/setServerErrors';
import Button from './Button';
import Input from './Input';
import Paper from './Paper';

interface LoginFormData {
    login: string,
    password: string
}

export default function LoginForm() {
    const router = useRouter();
    const { register, handleSubmit, setError } = useForm<LoginFormData>()

    const onSubmit = async (data: LoginFormData) => {
        const json = await fetcher(process.env.NEXT_PUBLIC_API_HOST! + '/login', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        if (json.errors) {
            setServerErrors<LoginFormData>(json.errors, setError);
            return
        }
        router.push('/')
    }

    return (
        <Paper className="w-80 flex-shrink flex flex-col">
            <h1 className="text-2xl font-bold mb-2">Вход</h1>
            <form className="flex flex-col mb-2" onSubmit={handleSubmit(onSubmit)}>
                <Input
                    title="Имя пользователя или почта"
                    placeholder="Введите имя пользователя или почту"
                    label="login"
                    register={register}
                    className="mb-2"
                />
                <Input
                    title="Пароль"
                    placeholder="Введите пароль"
                    label="password"
                    register={register}
                    className="mb-4"
                />
                <Button title="Войти"/>
            </form>
            <span className="text-xs text-gray-500">Нет аккаунта? <Link href="/register" passHref>
                <a className="text-pink-500">
                    Зарегистрируйтесь!
                </a>
            </Link></span>
        </Paper>
    )
}
