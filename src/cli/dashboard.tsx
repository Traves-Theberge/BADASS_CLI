import { render, Box, Text } from 'ink';
import Gradient from 'ink-gradient';

// Import the updated components
import PromptInput from './components/PromptInput';
import StreamDisplay from './components/StreamDisplay';
// import HistoryView from './components/HistoryView'; // Will be used later
import TaskListView from './components/TaskListView';
import ToolListView from './components/ToolListView';

// Define static arrays for sample tasks and tools
const sampleTasks = ['Initializing build...', 'Compiling modules (1/3)'];
const sampleTools = ['lint-typescript', 'format-markdown', 'pr-summarise', 'test-autogen', 'vuln-scan'];

/**
 * Main component for the Axon CLI Dashboard.
 * Renders the overall layout and integrates various sub-components.
 */
const AxonDash = () => (
  <Box flexDirection="column" width="100%" height="100%"> {/* Assuming terminal height or fixed height for demo */}
    <Gradient name="pastel">
      <Text bold>Axon Dashboard</Text>
    </Gradient>

    <Box flexGrow={1} marginTop={1}> {/* Main content area */}
      {/* StreamDisplay or HistoryView will be shown here based on state later */}
      {/* For now, just showing StreamDisplay */}
      <StreamDisplay />

      {/* Side panel area for Task/Tool lists */}
      <Box flexDirection="column" marginLeft={2} width="30%">
        <TaskListView tasks={sampleTasks} />
        <Box marginTop={1}>
          <ToolListView tools={sampleTools} />
        </Box>
      </Box>
    </Box>

    <Box marginTop={1}>
      <PromptInput />
    </Box>
  </Box>
);

render(<AxonDash />);
