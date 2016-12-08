import React from 'react';
import axios from 'axios';

class App extends React.Component {

  render() {
    return (
      <Abc/>
    )
  }
}

class Abc extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.getList}>get List</button>
      </div>
    )
  }
  getList() {
    axios.get('/api/get/xss.com')
      .then( response => { console.dir(response); alert(response); } ) // SUCCESS
      .catch( response => { console.dir(response); } ); // ERROR
  }
}

export default App;
