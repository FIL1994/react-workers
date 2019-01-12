import React, { Component } from "react";
import worker from "./worker.js";
import "./App.css";

class WebWorker {
  constructor(worker) {
    const code = worker.toString();
    const blob = new Blob(["(" + code + ")()"]);
    return new Worker(URL.createObjectURL(blob));
  }
}

class App extends Component {
  componentDidMount = () => {
    this.worker = new WebWorker(worker);
  };

  fetchWebWorker = () => {
    this.worker.postMessage("Fetch Users");

    this.worker.addEventListener("message", event => {
      this.setState({
        count: event.data.length
      });
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.fetchWebWorker}>Fetch</button>
        </header>
      </div>
    );
  }
}

export default App;
