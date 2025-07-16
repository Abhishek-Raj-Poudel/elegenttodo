export type Todo = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
};

export type TodoForm = {
  title: string;
  description?: string;
}

export type TodoEditForm = {
  title: string;
  description?: string;
  completed: boolean;
}
