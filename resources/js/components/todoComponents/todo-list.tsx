import { useTodoStore } from "@/store/useTodoStore"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { TrashIcon } from "lucide-react";
import { EditTodo } from "./edit-todo";

import { useAutoAnimate } from '@formkit/auto-animate/react'

export const TodoList = () => {
    const {todos,deleteTodo, toggleComplete} = useTodoStore();

  const [animationParent] = useAutoAnimate()

    const handleTodoDelete = ( id:number )=>{
         deleteTodo(id)
    }

    const handleTodoCheck = ( id:number )=>{
        toggleComplete(id)
    }
    return (
        <div className="flex flex-col gap-5" ref={animationParent}>
            {todos.map(todo => (
                <Card className='rounded' key={todo.id}>
                    <CardHeader>
                        <CardTitle className='flex gap-4 items-center'>
                            <Checkbox onClick={()=>handleTodoCheck(todo.id)} checked={todo.completed} value={"false"} />
                            <span>{todo.title}</span>
                        </CardTitle>
                        <CardAction className="flex gap-1">
                            <EditTodo existingData={todo}/>
                            <button onClick={()=>handleTodoDelete(todo.id)} className="bg-destructive ">
                                <TrashIcon className="text-background" width={14} height={14}/>
                            </button>

                        </CardAction>
                    </CardHeader>
                    <CardContent>{todo.description}</CardContent>
                </Card>
            ))}
        </div>
    )
}
