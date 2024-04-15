// eslint-disable-next-line no-unused-vars
import React from 'react';
import Button from '../components/button';
import Input from '../components/input';
import Logo from '../assets/resumeBuilder.png';
import { MdAlternateEmail } from 'react-icons/md';
import { AiOutlineIdcard } from 'react-icons/ai';
import { FaPhone } from 'react-icons/fa6';
import { FiLock } from 'react-icons/fi';
import { postRequest } from '../utils/requests';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleChange } from '../utils/handleChange';

function SignUp() {
  let [inputs, setInputs] = useState({});
  let [error, setError] = useState({ isError: false, type: '', message: '' });
  const navigate = useNavigate();

  // localStorage.removeItem('user');
  // localStorage.removeItem('authToken');

  const handleInputChange = (e) => {
    handleChange(e, setInputs);
  };

  const resetError = () => {
    setTimeout(() => {
      setError({ isError: false, type: '', message: '' });
    }, 3000);
  };

  const handleRegisterError = (error) => {
    const errorMessage = error.response.data.error.message;
    if (errorMessage === 'User already exists! Login Instead') {
      setError({ isError: true, type: 'email', message: errorMessage });
      resetError();
    } else if (errorMessage === 'Invalid username!') {
      setError({ isError: true, type: 'username', message: errorMessage });
      resetError();
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, email, password, phone } = inputs;

    if (!name || !email || !password || !phone) {
      setError({
        isError: true,
        type: 'Missing fields',
        message: 'All fields are requried',
      });
      resetError();
      return;
    } else if (password.length < 8) {
      setError({
        isError: true,
        type: 'password',
        message: 'Password must be at least 8 characters',
      });
      resetError();
      return;
    }

    const response = await postRequest(
      '/register',
      inputs,
      handleRegisterError
    );
    response && navigate('/');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleRegister}
        className="text-center flex flex-col gap-8 px-4"
      >
        <div className="flex flex-col gap-4">
          <div className="m-auto w-[98px] h-[98px] bg-grayLight border-[2px] border-grayMedium rounded-full flex items-center justify-center">
            <img className="w-[50px]" src={Logo} alt="Logo" />
          </div>
          <div></div>
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-semibold">Get Started With Us!</h3>
            <p className="text-grayHard text-lg font-normal">
              Join us and create you own professional Resume.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Input
            handleChange={handleInputChange}
            type="email"
            name="email"
            placeholder="Email"
            icon={<MdAlternateEmail size={27} color="C1C5C5" />}
          />{' '}
          {error.isError && error.type === 'email' && (
            <p className="text-start text-danger">{error.message}</p>
          )}
          <Input
            handleChange={handleInputChange}
            type="text"
            name="name"
            placeholder="Full Name"
            icon={<AiOutlineIdcard size={27} color="C1C5C5" />}
          />
          <Input
            handleChange={handleInputChange}
            type="text"
            name="phone"
            placeholder="Phone Number"
            icon={<FaPhone size={27} color="C1C5C5" />}
          />{' '}
          {error.isError && error.type === 'username' && (
            <p className="text-start text-danger">{error.message}</p>
          )}
          <Input
            handleChange={handleInputChange}
            type="password"
            name="password"
            placeholder="Password"
            minLength="8"
            icon={<FiLock color="C1C5C5" size={27} />}
          />{' '}
          {error.isError && error.type === 'password' && (
            <p className="text-danger text-start">{error.message}</p>
          )}
          {error.isError && error.type === 'Missing fields' && (
            <p className="text-danger text-start">{error.message}</p>
          )}
          <p className="text-start text-[#737373]">
            Already have an account?{' '}
            <Link to="/" className="text-blue-900 font-medium">
              Login
            </Link>
          </p>
        </div>
        <Button text="Sign Up" />
      </form>
    </div>
  );
}

export default SignUp;
