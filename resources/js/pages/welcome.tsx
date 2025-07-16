import { TodoForm } from '@/components/todoComponents/add-todo';
import { TodoList } from '@/components/todoComponents/todo-list';
import { useTodoStore } from '@/store/useTodoStore';
// import { type SharedData } from '@/types';
import { Todo } from '@/types/todo.type';
//NOTE: will need auth later for sure
import { Head,
    // usePage
} from '@inertiajs/react';
import { useEffect } from 'react';


type Props={
    todos:Todo[]
}

export default function Welcome({todos}:Props) {
    console.log(todos)
    //NOTE: will need auth later for sure
    // const { auth } = usePage<SharedData>().props;
    const {setTodos} = useTodoStore()

    useEffect(()=>{
        setTodos(todos)
    },[])

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"/>
            </Head>
            <main className='font-["Montserrat"] max-w-screen-sm mx-auto h-screen py-20 px-5 flex flex-col gap-10'>

                <h1 className='text-center text-4xl'> Welcome Back</h1>
                <div className='grid gap-5'>
                    <TodoList/>
                    <TodoForm/>
                </div>



            </main>
        </>
    );
}
