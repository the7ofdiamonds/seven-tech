import { useState } from 'react';

import NavigationComponent from './Navigation';

import { forgot } from '../utils/forgot';
import { displayStatus } from '../utils/DisplayStatus';

function ForgotComponent() {
  const [Email, setEmail] = useState('');
  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState(
    'If you forgot your password, enter your username or email.'
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    forgot(Email).then(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const redirectTo = urlParams.get('redirectTo');

      setTimeout(() => {
        if (redirectTo === null) {
          window.location.href = '/login';
        } else {
          window.location.href = redirectTo;
        }
      }, 5000);

      setMessage(displayStatus(`Check your inbox and spam for ${Email}`));
    });
  };

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    }
  };

  return (
    <>
      <NavigationComponent />
      <div className="login card">
        <form>
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
            </tbody>
            <tfoot>
              <td>
                <button type="submit" onClick={handleSubmit}>
                  <h3>RESET</h3>
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

export default ForgotComponent;
