import { describe, it } from 'mocha';
import assert from 'assert';
import undoReducer from '../src/undo_reducer';

function mockReducer(state = 1, action) {
  switch (action.type) {
    case 'ADD': {
      return state + 1;
    }
    default:
      return state;
  }
}

describe('undo_reducer', () => {
  it('should return unmodified present state', () => {
    const undo = undoReducer(mockReducer);

    let state = undo(undefined, {});
    assert.equal(state.present, 1);

    state = undo(state, {});
    assert.equal(state.present, 1);

    state = undo(state, { type: 'ADD' });
    assert.equal(state.present, 2);
  });

  it('should return unmodified state if undo without save first', () => {
    const undo = undoReducer(mockReducer);

    let state = undo(undefined, { type: 'ADD' });
    state = undo(state, { type: 'ADD' });
    assert.equal(state.present, 3);

    state = undo(state, { type: 'UNDO' });
    assert.equal(state.present, 3);
  });

  it('should return previous state if undo after save', () => {
    const undo = undoReducer(mockReducer);

    let state = undo(undefined, { type: 'ADD' });
    assert.equal(state.present, 2);

    // Save current state
    state = undo(state, { type: 'SAVE' });

    // Modify state
    state = undo(state, { type: 'ADD' });
    state = undo(state, { type: 'ADD' });
    assert.equal(state.present, 4);

    // Confirm state has been undone and past is empty:
    state = undo(state, { type: 'UNDO' });
    assert.equal(state.present, 2);
    assert(!state.past);
  });
});
