import React, { Component } from "react";

export default class Sortition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameList: [],
      assignedList: []
    }

    this.addName = this.addName.bind(this);
    this.changeName = this.changeName.bind(this);
    this.calculate = this.calculate.bind(this);
    this.reset = this.reset.bind(this);
  }

  addName() {
    const name = this.state.name;
    let nameList = this.state.nameList;
    nameList.push(name);

    this.setState({
      nameList: nameList,
      name: ''
    });
  }

  changeName(e) {
    this.setState({...this.state, name: e.target.value });
  }

  renderNameList() {
    const nameList = this.state.nameList || [];
    return nameList.map((name, index) => (
      <li key={index}>{name}</li>
    ));
  }

  calculate() {
    let newAssignedList = [];

    for (let i = 0; i < this.state.nameList.length; i++) {
      let randomIndex = -1;
      let attempts = 0;

      while (
        randomIndex == -1
        || randomIndex == i
        || newAssignedList.indexOf(this.state.nameList[randomIndex]) != -1
      ) {
        randomIndex = Math.floor(Math.random() * this.state.nameList.length);
        attempts++;

        if (attempts >= this.state.nameList.length) {
          this.calculate();
          return;
        }
      }

      newAssignedList.push(this.state.nameList[randomIndex]);
    }

    this.setState({
      assignedList: newAssignedList
    });
  }

  renderCalculated() {
    const nameList = this.state.nameList || [];
    const assignedList = this.state.assignedList || [];
    return assignedList.map((name, index) => (
      <li key={index}>{nameList[index]} - {name}</li>
    ));
  }

  reset() {
    this.setState({
      nameList: [],
      assignedList: []
    })
  }

  render() {
    return (
      <div>
        <div role='form' className='personForm'>
          <input
            type='text'
            id='nameInput'
            placeholder='Entre com um novo nome'
            onChange={this.changeName}
            value={this.state.name}
          />
          <button onClick={this.addName}>
            Add name
          </button>
        </div>

        <ul>
          {this.renderNameList()}
        </ul>

        <button onClick={this.calculate}>
          Calcular
        </button>

        <ul>
          {this.renderCalculated()}
        </ul>

        <button onClick={this.reset}>reset</button>
      </div>
    )
  }
 }
