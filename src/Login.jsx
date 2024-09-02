import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Logo from './img/HaFlix.webp';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            showErrorPopup: false,
            popupMessage: '',
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === '' || password === '') {
            this.setState({ error: 'Email dan Password tidak boleh kosong!', showErrorPopup: true }, () => {
                setTimeout(() => {
                    this.setState({ showErrorPopup: false });
                }, 5000);
            });
        } else if (!emailRegex.test(email)) {
            // this.setState({ error: 'Email yang Anda Masukkan Salah!' });
            this.setState({ error: 'Email yang Anda Masukkan Salah!', showErrorPopup: true }, () => {
                setTimeout(() => {
                    this.setState({ showErrorPopup: false });
                }, 5000);
            });
        } else {
            // this.setState({ error: '' });
            // this.props.onLogin(email, password);
            this.setState({ error: '', showErrorPopup: false });
            this.props.onLogin(email, password);
        }
    }

    render() {
        return (
            <div className="login-container">
                {this.state.showErrorPopup && (
                    <div className="error-popup">
                        {this.state.error}
                    </div>
                )}
                <img src={Logo} alt="Logo" className="logo" />
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit} className="login-form">
                    <label>
                        Email:
                        <input
                            type="text"
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                        />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input
                            type="password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                        />
                    </label>
                    <br />
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}

Login.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default Login;
