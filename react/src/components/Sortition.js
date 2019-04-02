import React, { Component } from "react";

export default class Sortition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameList: [],
      assignedList: []
    }
  }

  addName = () => {
    const name = this.state.name;
    let nameList = this.state.nameList;
    nameList.push(name);

    this.setState({
      nameList: nameList,
      name: ''
    });
  }

  changeName = (e) => {
    this.setState({...this.state, name: e.target.value });
  }

  calculate = () => {
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

  reset = () => {
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
          {this.state.nameList.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>

        <button onClick={this.calculate}>
          Calcular
        </button>

        <ul>
          {this.state.assignedList.map((name, index) => (
            <li key={index}>{this.state.nameList[index]} - {name}</li>
          ))}
        </ul>

        <button onClick={this.reset}>reset</button>
      </div>
    )
  }
 }
