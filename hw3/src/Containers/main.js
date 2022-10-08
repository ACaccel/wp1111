import React from 'react';
import Header from '../Components/header';
import Section from './section';
import Footer from './footer';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainCount: 0,
      mainUndone: 0
    };
  }
  updateMainCount = (count) => {
    this.setState(() => ({mainCount: count}));
  }
  updateMainUndone = (undone) => {
    this.setState(() => ({mainUndone: undone}));
  }
  render(){
    return(
      <div className="todo-app__root">
        <Header />
        <Section updateMainCount={this.updateMainCount}
                updateMainUndone={this.updateMainUndone} />
        <Footer mainCount={this.state.mainCount} 
                mainUndone={this.state.mainUndone} />
      </div>
    );
  }
}