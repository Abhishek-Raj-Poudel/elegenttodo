import { create } from 'zustand';
import axios from 'axios';
import { Todo, TodoEditForm, TodoForm } from '@/types/todo.type';


type TodoState = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  addTodo: (todo: TodoForm) => Promise<void>;
  updateTodo: (id: number, updated: TodoEditForm) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  toggleComplete: (id: number) => Promise<void>;
};

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],

  setTodos: (todos) => set({ todos }),

  addTodo: async (todo) => {
    const tempId = Date.now();
    const optimistic: Todo = { ...todo, id: tempId,completed:false };

    set((state) => ({ todos: [...state.todos, optimistic] }));

    try {
      const res = await axios.post('/api/todo', todo);

      const newTodo = res.data.data;
      set((state) => ({
        todos: state.todos.map((temp) => (temp.id === tempId ? {...temp, id:newTodo.id} : temp)),
      }));
      // alert('Todo added!');
    } catch (e) {
      set((state) => ({
        todos: state.todos.filter((t) => t.id !== tempId),
      }));
      alert(e);
    }
  },

  updateTodo: async (id, updated) => {
    const prev = get().todos;
    set((state) => ({
      todos: state.todos.map((t) => (t.id === id ? { ...t, ...updated } : t)),
    }));

    try {
      await axios.put(`/api/todo/${id}`, updated);
    } catch (e) {
      set({ todos: prev }); // rollback
    }
  },

  deleteTodo: async (id) => {
    const prev = get().todos;
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
    }));

    try {
      await axios.delete(`/api/todo/${id}`);
    } catch (e) {
      set({ todos: prev }); // rollback
    }
  },

  toggleComplete: async (id) => {
    const prev = get().todos;
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
    }));

    try {
      const todo = get().todos.find((t) => t.id === id);
      if (todo) {
        await axios.put(`/api/todo/toggle/${id}`, { completed: todo.completed });
      }
    } catch (e) {
      set({ todos: prev }); // rollback
    }
  },
}));
