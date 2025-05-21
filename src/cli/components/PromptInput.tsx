import { useState } from 'react';
import { Text, Box } from 'ink'; // Temporarily removed TextInput

const PromptInput = () => {
  const [value, _setValue] = useState(''); // _setValue to mark as intentionally unused for now

  // onSubmit can be added later if needed
  // const handleSubmit = () => {
  //   console.log(`Submitted: ${value}`);
  //   setValue(''); // Optionally clear input after submit
  // };

  return (
    <Box borderStyle="single" paddingX={1}> {/* paddingX for horizontal padding */}
      <Box marginRight={1}>
        <Text>&gt;</Text>
      </Box>
      {/* TextInput usage temporarily commented out due to import issues with moduleResolution: nodenext */}
      <Text color="gray">{value || "Enter your prompt..."}</Text>
    </Box>
  );
};

export default PromptInput;
