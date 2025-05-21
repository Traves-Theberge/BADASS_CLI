import { Text, Box } from 'ink';

interface TaskListProps {
  tasks: string[];
}

const TaskListView: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <Box borderStyle="single" padding={1} flexDirection="column" width="100%"> {/* Ensure width is 100% of its parent */}
      <Text bold>Tasks:</Text>
      {tasks.length === 0 ? (
        <Text>No tasks running.</Text>
      ) : (
        <Box flexDirection="column">
          {tasks.map((task, index) => (
            <Text key={index}>- {task}</Text>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default TaskListView;
