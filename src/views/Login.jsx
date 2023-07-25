import { useState, useEffect } from 'react';
import NavigationComponent from './Navigation';
import { login } from '../utils/login';
import { displayStatus, displayStatusType } from '../utils/DisplayStatus';

function LoginComponent() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(Email, Password);

    setMessage(displayStatus(response));
    setMessageType(displayStatusType(response));
  };

  return (
    <>
      <NavigationComponent />
      <div className="login card">
        <form onSubmit={handleSubmit}>
          <table>
            <thead></thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
            </tbody>
            <tfoot>
              <td>
                <button type="submit">
                  <h3>LOGIN</h3>
                </button>
              </td>
            </tfoot>
          </table>
        </form>
      </div>

      {message !== '' && (
        <div className="status-bar card">
          <span className={`${messageType}`}>{message}</span>
        </div>
      )}
    </>
  );
}

export default LoginComponent;
