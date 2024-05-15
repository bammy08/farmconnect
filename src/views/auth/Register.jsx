import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = 'Please enter a username';
    }
    if (!formData.email) {
      newErrors.email = 'Please enter an email';
    }
    if (!formData.password) {
      newErrors.password = 'Please enter a password';
    }

    // If there are errors, set the error state and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If no errors, proceed with form submission
    // Your form submission logic here
  };

  return (
    <div className="min-w-screen min-h-screen bg-[#afe1af] flex justify-center items-center">
      <div className="w-[350px] text-white p-2">
        <div className="bg-[#50c878] p-4 rounded-md">
          <h2 className="text-xl mb-3 font-bold text-center">
            Welcome to FarmConnect
          </h2>
          <p className="text-sm mb-3 font-medium">New here? please register</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                placeholder="Enter your username"
                onChange={handleChange}
                className="outline-green-400 rounded-md  text-gray-500 px-4 py-2 w-full"
              />
              {errors.username && (
                <p className="text-red-500">{errors.username}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className=" outline-green-400 rounded-md   text-gray-500 px-4 py-2 w-full"
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className=" outline-green-400 text-gray-500 rounded-md  px-4 py-2 w-full pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-2 text-green-700"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
            </div>
            <div className="flex items-center w-full gap-3 mb-3">
              <input
                className="w-4 h-4 text-green-600 overflow-hidden rounded border-green-700 focus:ring-green-50"
                type="checkbox"
                name="checkbox"
                id="checkbox"
              />
              <p>I agree to privacy policy and terms</p>
            </div>
            <div className="flex justify-center gap-2 mb-3">
              <p>Already registered?</p>
              <Link className="text-orange-300 font-bold" to={'/login'}>
                Login
              </Link>
            </div>
            <button
              type="submit"
              className="bg-green-200 text-black px-4 py-2 w-full rounded-md hover:shadow-lg"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
