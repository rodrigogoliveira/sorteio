import { h, app } from 'hyperapp';
/** @jsx h */

const state = {
  nameList: [],
  assignedList: []
};

const actions = {
  addName: value => state => {
    state.nameList.push(nameInput.value);
    nameInput.value = '';
    return { nameList: state.nameList };
  },
  calculate: value => (state, actions) => {
    state.assignedList = [];

    for (let i = 0; i < state.nameList.length; i++) {
      let randomIndex = -1;
      let attempts = 0;

      while (
        randomIndex == -1
        || randomIndex == i
        || state.assignedList.indexOf(state.nameList[randomIndex]) != -1
      ) {
        randomIndex = Math.floor(Math.random() * state.nameList.length);
        attempts++;

        if (attempts >= state.nameList.length) {
          actions.calculate();
          return;
        }
      }

      state.assignedList.push(state.nameList[randomIndex]);
    }

    return { assignedList: state.assignedList };
  },
  reset: value => state => {
    return {
      nameList: [],
      assignedList: []
    }
  }
};

const view = (state, actions) => (
  <div class="wrap">
    <input type="text" id="nameInput" />
    <button onclick={() => actions.addName()}>Add Value</button>

    <div id="nameListDisplay">
      <ul>
        {state.nameList.map(singleName => (
          <li>{singleName}</li>
        ))}
      </ul>
    </div>

    <button onclick={() => actions.calculate()}>calculate</button>

    <div id="calculatedDisplay">
      <ul>
        {state.assignedList.map((assignedName, index) => (
          <li>{state.nameList[index]} => {assignedName}</li>
        ))}
      </ul>
    </div>

    <button onclick={() => actions.reset()}>reset</button>
  </div>
);

const main = app(state, actions, view, document.body);
