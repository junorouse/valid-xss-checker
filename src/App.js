import React from 'react';
import axios from 'axios';

class App extends React.Component {

  render() {
    return (
      <SiteList/>
    )
  }
}

class SiteInfo extends React.Component {
    render() {
        return(
            <li>{this.props.rId} - {this.props.url}, {this.props.referer}, {this.props.count}, {this.props.creation}, {this.props.latest}</li>
        );
    }
}

class SiteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "default",
      responseData: [],
    };
    this.getList = this.getList.bind(this);
    this.handleUrl = this.handleUrl.bind(this);
    this.keyDownCheck = this.keyDownCheck.bind(this);
  }
  handleUrl(event) {
    this.setState({
      url: event.target.value
    });
  }

  render() {
    return (
      <div>
        <input placeholder="press enter" type="text" onChange={this.handleUrl} onKeyDown={this.keyDownCheck}></input>
        <button onClick={this.getList}>GET LIST !</button>
        <h3>{this.state.url}</h3>
        {this.state.responseData.map((r, i) => {
          return (
            <SiteInfo rId={r.rId}
              url={r.url}
              referer={r.referer}
              count={r.count}
              creation={r.creation}
              latest={r.latest}
              key={i}
            />
          );
        })}
      </div>
    )
  }
  keyDownCheck(event) {
    if (event.keyCode == 13) {
      this.getList();
    }
  }
  getList() {
    axios.get('/api/get/'+this.state.url)
      .then( response => {
        this.setState({
            responseData: response.data
      })})
      .catch( response => { console.dir(response); } );
  }
}

export default App;
