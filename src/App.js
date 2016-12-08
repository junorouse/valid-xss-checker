import React from 'react';
import axios from 'axios';
import styles from './App.css';

class App extends React.Component {

  render() {
    return (
      <div>
        <SiteList/>
        <AddSite/>
      </div>
    )
  }
}

class SiteInfo extends React.Component {
    render() {
        return(
            <li className={styles[this.props.className]}>{this.props.rId} - {this.props.url}, {this.props.referer}, {this.props.count}, {this.props.creation}, {this.props.latest}</li>
        );
    }
}

class AddSite extends React.Component {

  constructor(props) {
    super(props);
    this.handleAddUrl = this.handleAddUrl.bind(this);
    this.state = {
      "addUrl": "default"
    }
  }

  render() {
    return (
      <div>
        <h3>Add Site</h3>
        <input type="text" placeholder="url" onChange={this.handleAddUrl}/><br />
        <input type="text" placeholder="form_data" /><br />
        <span>{this.state.addUrl}</span>
      </div>
    )
  }

  handleAddUrl(event) {
    this.setState({
      addUrl: event.target.value
    });
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
          let isSuccess = false;
          let className = "";

          if (r.referer != "nothing" && r.count > 0) {
            isSuccess = true;
          }

          if (isSuccess) {
            className="xssSuccess"
          }
          return (
            <SiteInfo
              className={className}
              rId={r.rId}
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
