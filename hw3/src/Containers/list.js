import React from 'react';
import ximage from '../img/x.png';

export default class extends React.Component {
  handleClass = (checked) => {
    return checked ? "todo-app__item-detail detail-decoration" : "todo-app__item-detail";
  }
  renderList = () => {
    return(
      this.props.secList.map(list => 
        <li className="todo-app__item">
          <div className="todo-app__checkbox">
            <input id={list.id} type="checkbox" onChange={this.props.handleCheck} />
            <label for={list.id} />
          </div>
          <h1 className={this.handleClass(list.checked)}>{list.text}</h1>
          <img className="todo-app__item-x" src={ximage} />
        </li>
      )
    );
  }
  render() {
    return(
      <ul className="todo-app__list" id="todo-list">
        {this.renderList()}
      </ul>
    );
  }
}