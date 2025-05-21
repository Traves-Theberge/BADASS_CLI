import { Text, Box } from 'ink';

interface ToolListProps {
  tools: string[];
}

const ToolListView: React.FC<ToolListProps> = ({ tools }) => {
  return (
    <Box borderStyle="single" padding={1} flexDirection="column" width="100%"> {/* Ensure width is 100% of its parent */}
      <Text bold>Available Tools:</Text>
      {tools.length === 0 ? (
        <Text>No tools available.</Text>
      ) : (
        <Box flexDirection="column">
          {tools.map((tool, index) => (
            <Text key={index}>- {tool}</Text>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ToolListView;
