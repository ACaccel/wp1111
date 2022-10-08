import React from 'react';
import Input from './input';
import List from './list';

class ListInfo {
  constructor(id, text, checked) {
    this.id = id;
    this.text = text;
    this.checked = checked;
  }
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      undone: 0,
      secList: []
    };
  }
  addList = (text) => {
    let updateList = this.state.secList;
    updateList.push(new ListInfo(this.state.count, text, 0));
    this.props.updateMainUndone(this.state.undone + 1);
    this.props.updateMainCount(this.state.count + 1);
    this.setState((state) => ({count: state.count + 1, 
                              undone: state.undone + 1, 
                              secList: updateList}));
  }
  handleCheck = (evt) => {
    let updateList = this.state.secList;
    let updateUndone = this.state.undone;
    for(let i = 0; i < this.state.count; i++){
      if(updateList[i].id == evt.currentTarget.id){
        if(evt.currentTarget.checked){
          updateList[i].checked = 1;
          updateUndone--;
        }
        else{
          updateList[i].checked = 0;
          updateUndone++;
        }
        break;
      }
    }
    this.props.updateMainUndone(updateUndone);
    this.setState((state) => ({count: state.count, 
                              undone: updateUndone,
                              secList: updateList}));
  }
  render() {
    return(
      <section className="todo-app__main">
        <Input addList={this.addList}/>
        <List secList={this.state.secList} handleCheck={this.handleCheck}/>
      </section>
    );
  }
}