import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import logo from '../../images/farmer.png';
import { admin_login } from '../../store/Reducers/authReducer';

const AdminLogin = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
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
    dispatch(admin_login(formData));
  };

  return (
    <div className="min-w-screen min-h-screen bg-[#afe1af] flex justify-center items-center">
      <div className="w-[350px] text-white p-2">
        <div className="bg-[#50c878] p-4 rounded-md">
          <div>
            <div>
              <img className="w-[200px] mx-auto mb-5" src={logo} alt="logo" />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
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

            <button
              type="submit"
              className="bg-green-200 text-black px-4 py-2 w-full rounded-md hover:shadow-lg"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
