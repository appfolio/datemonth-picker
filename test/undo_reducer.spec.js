import assert from 'assert';
import undo_reducer from '../src/undo_reducer.js';

function mock_reducer(state = 1, action) {
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
    let undo = undo_reducer(mock_reducer);

    var state = undo(undefined, {});
    assert.equal(state.present, 1);

    state = undo(state, {});
    assert.equal(state.present, 1);

    state = undo(state, { type: 'ADD' });
    assert.equal(state.present, 2);
  });

  it('should return unmodified state if undo without save first', () => {
    let undo = undo_reducer(mock_reducer);

    var state = undo(state, { type: 'ADD' });
    state = undo(state, { type: 'ADD' });
    assert.equal(state.present, 3);

    state = undo(state, { type: 'UNDO' });
    assert.equal(state.present, 3);
  });

  it('should return previous state if undo after save', () => {
    let undo = undo_reducer(mock_reducer);

    var state = undo(state, { type: 'ADD' });
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
