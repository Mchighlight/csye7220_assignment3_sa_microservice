import React, {Component} from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Polarity from "./components/Polarity";

const style = {
  marginLeft: 12,
};

var qs = (function(a) {
  if (a === "") return {};
  var b = {};
  for (var i = 0; i < a.length; ++i) {
    var p=a[i].split('=', 2);
    if (p.length === 1)
      b[p[0]] = "";
    else
      b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
  }
  return b;
  })(window.location.search.substr(1).split('&'));


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sentence: '',
      polarity: undefined
    };
  };

  testCommsSpringboot() {
    console.log(qs["webapp"]);
    fetch(qs["webapp"] + '/testHealth', {mode: 'cors'})
      .then(function(response) {
        return response.text();
      })
      .then(function(text) {
        console.log('Request successful', text);
        alert(text);
      })
      .catch(function(error) {
        console.log('Request failed', error)
      });
  }
  
  analyzeSentenceLocal() {
    fetch('http://localhost:8080/sentiment', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({sentence: this.textField.getValue()})
    })
    .then(response => response.json())
    .then(data => this.setState(data));
  }

  analyzeSentence() {
    console.log(qs["webapp"]);
    fetch(qs["webapp"] + '/sentiment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
  
      body: JSON.stringify({sentence: this.textField.getValue()})
    })
      .then(response => response.json())
      .then(data => this.setState(data));
  }

  

  onEnterPress = e => {
    if (e.key === 'Enter') {
      this.analyzeSentence();
    }
  };

    render() {
      const polarityComponent = this.state.polarity !== undefined ?
        <Polarity sentence={this.state.sentence} polarity={this.state.polarity}/> :
        null;
      
      return (
        <MuiThemeProvider>
          <div className="centerize">
            <Paper zDepth={1} className="content">
              <h2>Sentiment Analyser</h2>
              <TextField ref={ref => this.textField = ref} onKeyUp={this.onEnterPress.bind(this)}
        hintText="Type your sentence."/>
                <RaisedButton label="Send" style={style} onClick={this.analyzeSentence.bind(this)}/>
                <RaisedButton label="SendLocalTest" style={style} onClick={this.analyzeSentenceLocal.bind(this)}/>
               {polarityComponent}
            </Paper>
          </div>
        </MuiThemeProvider>
      );
    }
  }

  export default App;