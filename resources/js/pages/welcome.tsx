import { type SharedData } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

import { LoaderCircle, SeparatorVertical, Trash, Trash2 } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

type TaskFrom = {
title:string;
    description:string;

}

type Todo={
    title:string;
    description:string;
}

type Props = {
    todos: Todo[]
}

export default function Welcome({todos}:Props) {
    console.log('todos',todos)
    const { auth } = usePage<SharedData>().props;
    const{data,setData,post,processing,errors,reset} = useForm<Required<TaskFrom>>({
        title:"",
        description:"",
    })

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data)
        post(route('todo'), {
            //TODO: add some on finish shit
        });
    };

    const handleDelete = () => {

    }

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
               <main className='max-w-screen-md mx-auto w-full'>
<form className="flex flex-col gap-6 w-full" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            disabled={processing}
                            placeholder="Full title"
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>
<div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            disabled={processing}
                            placeholder="Full description"
                        />
                        <InputError message={errors.description} className="mt-2" />
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                       Add Task
                    </Button>
                </div>

            </form>
                    <div className='flex flex-col gap-4 mt-10'>
                        {todos.map((todo,index)=>(
                            <div className='text-xl flex gap-2 h-full' key={index}>
                                <span>{todo.title}</span>
                                <Separator orientation='vertical'/>
                                <span>{todo.description}</span>
                                <Separator orientation='vertical'/>
                                <Button onClick={()=>handleDelete()} variant={'destructive'}><Trash/></Button>
                            </div>
                        ))}
                    </div>
                </main>

            </div>
        </>
    );
}
