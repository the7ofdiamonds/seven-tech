import { NavLink } from 'react-router-dom';

function NavigationComponent() {
  return (
    <>
      <div className="options">
        <NavLink to={`/login`}>
          <button>
            <h3>LOGIN</h3>
          </button>
        </NavLink>

        <NavLink to={'/signup'}>
          <button>
            <h3>SIGNUP</h3>
          </button>
        </NavLink>

        <NavLink to={'/forgot'}>
          <button>
            <h3>FORGOT</h3>
          </button>
        </NavLink>
      </div>
    </>
  );
}

export default NavigationComponent;