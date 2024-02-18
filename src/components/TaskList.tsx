// TaskList.tsx
import React from 'react';
import { Task } from '../types';

interface Props {
  tasks: Task[];
  onDelete: (id: number) => void;
}

const TaskList: React.FC<Props> = ({ tasks, onDelete }) => {
  return (
    console.log('Dhunkiii',tasks),
    
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          {task.name} - {task.status}
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
