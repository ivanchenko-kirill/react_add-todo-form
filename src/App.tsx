import React from 'react';
import './App.scss';

import users from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo';

const preparedTodos: Todo[] = todosFromServer.map(todo => {
  const user = users.find(person => person.id === todo.userId) || null;

  return { user, ...todo };
});

interface State {
  todos: Todo[];
}

class App extends React.Component<{}, State> {
  state = {
    todos: preparedTodos,
  };

  addNewTodo = (todo: Todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  };

  render() {
    const { todos } = this.state;

    return (
      <div className="App">
        <div className="todos text-center">
          <h1 className="mb-4">Add todo form</h1>
          <NewTodo
            todos={todos}
            users={users}
            onAdd={this.addNewTodo}
          />
          <TodoList todos={todos} />
        </div>
      </div>
    );
  }
}

export default App;