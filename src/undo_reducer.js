// Reducer that wraps another Reducer to add save/undo functionality.
// TODO extract and share

export default function (reducer) {
  // Call the reducer with empty action to populate the initial state
  const initialState = {
    past: undefined,
    present: reducer(undefined, {})
  };

  // Return a reducer that handles undo
  return (state = initialState, action) => {
    const { past, present } = state;

    switch (action.type) {
      case 'SAVE':
        return {
          past: present,
          present
        };
      case 'UNDO':
        // If UNDO called without a previous SAVE, return present:
        return {
          past: undefined,
          present: past || present
        };
      default: {
        // Delegate handling the action to the passed reducer
        const newPresent = reducer(present, action);
        if (present === newPresent) {
          return state;
        }
        return {
          past,
          present: newPresent
        };
      }
    }
  };
}
