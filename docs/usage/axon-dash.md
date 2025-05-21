# Axon Dashboard (`axon dash`)

The Axon Dashboard is your terminal-native AI control-plane. This document provides basic instructions for launching and understanding the current state of the dashboard.

## Launching the Dashboard

To launch the Axon Dashboard, run the following command from the root of the project:

```bash
pnpm run axon:dash
```

## Current Features (Static Preview)

As of the current version, the `axon dash` provides a static preview of its intended layout and components. Interaction is limited.

You will see the following sections:

*   **Axon Dashboard Title**: Displayed at the top with a gradient.
*   **Live Stream/Output Area**: A central panel intended to display output from tools and flows. Currently shows placeholder text.
*   **Task List Area**: A side panel meant to list active and queued tasks. Currently displays a static list of sample tasks. (Hotkey 'l' is planned).
*   **Tool List Area**: A side panel meant to list available Axon tools. Currently displays a static list of sample tools. (Hotkey 't' is planned).
*   **Prompt Input Area**: An input field at the bottom for typing commands.
    *   *Note: The actual text input component (`TextInput` from Ink) is temporarily commented out due to a technical issue with TypeScript's module resolution. This will be fixed in a future update. You will see a placeholder instead of a functional input field.*

## Planned Hotkeys

The following hotkeys are planned for dashboard interaction (currently not functional):

*   **t**: Toggle the Tool List view.
*   **l**: Toggle the Task List view.
*   **Esc**: Cancel the current operation or close a view.
*   **:inject**: (Functionality to be defined)

## Next Steps

Future development will focus on:
*   Implementing full interactivity for the prompt and hotkeys.
*   Connecting the dashboard to the Axon interpreter engine.
*   Displaying real-time data in the stream, task, and tool lists.
*   Resolving the `TextInput` component issue.
