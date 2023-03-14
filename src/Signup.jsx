import config from './config';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Signup(props) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post(`${config.api}/users.json`, params)
      .then((response) => {
        //console.log(response.data);
        event.target.reset();
        navigate(props.redirect ?? window.location.href);
      })
      .catch((error) => {
        //console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div id="signup">
      <h1>Signup</h1>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input name="name" type="text" />
        </div>
        <div>
          Email: <input name="email" type="email" />
        </div>
        <div>
          Password: <input name="password" type="password" />
        </div>
        <div>
          Password confirmation: <input name="password_confirmation" type="password" />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}