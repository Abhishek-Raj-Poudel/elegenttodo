import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ChangeEvent, FormEvent, useState } from "react"
import { useTodoStore } from "@/store/useTodoStore"
import type { TodoForm } from "@/types/todo.type"


export function TodoForm() {


    const {addTodo} = useTodoStore();
    const [form, setForm] = useState<TodoForm>({
        title: '',
    });


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await addTodo(form);
            setForm({ title: '', description: '' });
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input id="title" name="title" className="w-full p-2 border" value={form.title} onChange={handleChange} />
            <button className="bg-primary text-background text-nowrap" type="submit">Create Task</button>
        </form>
    )
}
