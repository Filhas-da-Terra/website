'use client';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { IconBrandFacebook, IconBrandInstagram } from '@tabler/icons-react';

type FormData = {
    nome: string;
    email: string;
    mensagem: string;
};

export default function Contato() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data);
        alert('Mensagem enviada com sucesso!');
    };

    return (
        <div className="h-screen flex flex-col justify-center items-center space-y-8">
            <div className="w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Fale Conosco</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Nome"
                        {...register('nome', { required: true })}
                        className="w-full p-2 border rounded"
                    />
                    {errors.nome && <span className="text-red-500 text-sm">Nome é obrigatório.</span>}

                    <input
                        type="email"
                        placeholder="Email"
                        {...register('email', { required: true })}
                        className="w-full p-2 border rounded"
                    />
                    {errors.email && <span className="text-red-500 text-sm">Email é obrigatório.</span>}

                    <textarea
                        placeholder="Mensagem"
                        {...register('mensagem', { required: true })}
                        className="w-full p-2 border rounded h-32"
                    />
                    {errors.mensagem && <span className="text-red-500 text-sm">Mensagem é obrigatória.</span>}

                    <button type="submit" className="bg-purple-800 text-white py-2 px-4 rounded w-full">
                        Enviar
                    </button>
                </form>
            </div>

            <div className="flex flex-col items-center space-y-4">
                <h2 className="text-xl font-bold">Siga-nos</h2>
                <Link href="https://facebook.com/coletivafilhasdaterra" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-2xl">
                    <IconBrandFacebook />
                </Link>
                <Link href="https://www.instagram.com/institutofilhasdaterra/" target="_blank" rel="noopener noreferrer" className="text-pink-600 text-2xl">
                    <IconBrandInstagram />
                </Link>
            </div>
        </div>
    );
}
