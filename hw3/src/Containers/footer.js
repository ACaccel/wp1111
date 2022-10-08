import React from 'react';

export default class extends React.Component {
  display = () => {
    if(this.props.mainCount === 0)
      return {'display': 'none'};
    return {};
  }
  render() {
    return(
      <footer className="todo-app__footer" id="todo-footer" style={this.display()}>
        <div className="todo-app__total">
          <span id="todo-count">{this.props.mainUndone + " "}</span>
           left
        </div>
        <ul className="todo-app__view-buttons">
          <li><button id="todo-all">All</button></li>
          <li><button id="todo-active">Active</button></li>
          <li><button id="todo-completed">Completed</button></li>
        </ul>
        <div className="todo-app__clean">
          <button id="todo-clear-complete">Clear completed</button>
        </div>
      </footer>
    );
  }
}