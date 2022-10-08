import React from 'react';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  pressKey = (evt) => {
    if(evt.key === 'Enter') {
      let newtext = this.state.text;
      if(newtext !== '')
        this.props.addList(newtext);
      this.setState(() => ({text: ''}));
    }
  }
  changeText = (evt) => {
    this.setState(() => ({text: evt.target.value}));
  }
  render() {
    return(
      <input 
        className='todo-app__input' 
        type="text" 
        placeholder='What needs to be done?' 
        value={this.state.text}
        onChange={this.changeText} 
        onKeyDown={this.pressKey}
      />
    );
  }
}