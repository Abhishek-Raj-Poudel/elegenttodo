import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pen, PlusCircle } from "lucide-react"
import { Textarea } from "../ui/textarea"
import { ChangeEvent, FormEvent, useState } from "react"
import { useTodoStore } from "@/store/useTodoStore"
import type { Todo, TodoEditForm } from "@/types/todo.type"
type Props = {
    existingData :Todo
}
export const EditTodo = ({existingData}:Props) => {

    const [isOpen,setIsOpen] = useState<boolean>(false);
    const {updateTodo} = useTodoStore();


    const [form, setForm] = useState<TodoEditForm>({
        title: existingData.title ,
        description:existingData?.description ?? "",
        completed:existingData.completed ?? false,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
            setIsOpen(false);
        try {
            await updateTodo(existingData.id,form);
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} >
            <DialogTrigger asChild>
                <button className="bg-primary text-background hover:bg-secondary duration-200 w-full "><Pen className="size-3.5"/></button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-screen-sm">
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="title">Task</Label>
                            <Input id="title" name="title" value={form.title} onChange={handleChange} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" value={form.description} onChange={handleChange} />
                        </div>
                    </div>
                    <DialogFooter className="mt-5">
                        {/* <button className="border" onClick={() => setIsOpen(false)}>Cancel</button> */}
                        <Button variant="outline" >Cancel</Button>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
