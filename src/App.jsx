import React from 'react';
import ListMovie from './ListMovie.jsx';
import Login from './Login.jsx';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      search: '',
      isLoggedIn: false,
      showWelcomeMessage: false,
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
    this.onKeyPressSearch = this.onKeyPressSearch.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  onChangeText(e) {
    this.setState({ text: e.target.value });
  }

  onClickSearch() {
    this.setState({ search: this.state.text });
  }

  onKeyPressSearch(e) {
    if (e.key === 'Enter') {
      this.onClickSearch();
    }
  }

  handleLogin(email, password) {
    this.setState({ isLoggedIn: true, showWelcomeMessage: true }, () => {
      setTimeout(() => {
          this.setState({ showWelcomeMessage: false }); 
      }, 5000);
  });  }

  handleLogout() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    if (!this.state.isLoggedIn) {
      return <Login onLogin={this.handleLogin} />;
    }

    return (
      <>
        {this.state.showWelcomeMessage && (
          <div className="welcome-popup">
            Selamat Datang!
          </div>
        )}
        <div className="header">
          <h1>HaFlix Movies</h1>
          <button className="logout-button" onClick={this.handleLogout}>Logout</button>
        </div>
        <div className="search">
          <label>
            Search movie
            <input
              onChange={this.onChangeText}
              onKeyPress={this.onKeyPressSearch}
              type="text"
            />
          </label>
          <button onClick={this.onClickSearch}>Search</button>
        </div>
        <ListMovie search={this.state.search} />
      </>
    );
  }
}

export default App;
