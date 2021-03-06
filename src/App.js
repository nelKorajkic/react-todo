import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ["Try adding some new tasks here!"]
    };
    this.completed = this.completed.bind(this);
  }
  componentDidMount() {
    fetch("/users")
      .then(res => res.json())
      .then(list => this.setState({ list }));
  }
  completed = function(event) {
    var spliceElement = event.target.getAttribute("data-key");
    var array = this.state.list;
    array.splice(spliceElement, 1);
    this.setState({ list: array });
  };
  render() {
    const completed = this.completed;
    function updateArray(event) {
      if (event.which === 13 || event.keyCode === 13) {
        if (event.target.value !== "") {
          var obj = { task: event.target.value };
          var update = this.state.list.concat(obj);

          this.setState({ list: update });
          event.target.value = "";
          return false;
        }
      }
      return true;
    }

    return (
      <div className="App">
        <div className="App-header">
          <h2 className="appText">To Do List</h2>
        </div>
        <div className="appInput">
          <input
            className="inputField"
            type="text"
            name="inputField"
            maxLength="41"
            onKeyPress={updateArray.bind(this)}
            placeholder="What do you have to do today..."
          />
        </div>
        <div className="container clearfix">
          <ul className="ulContainer clearfix">
            {this.state.list.map(function(user, index) {
              return (
                <li key={index} className="item">
                  <p className="taskName">
                    {user.task}
                  </p>
                  <a data-key={index} className="delete" onClick={completed}>
                    Delete
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
