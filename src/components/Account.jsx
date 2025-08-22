// components/Account.jsx (updated with sign-up feature)
import React, { useState, useRef } from 'react';

export default function Account({ user, setUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assuming user is logged in initially
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and signup
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    agreeToTerms: false
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [formData, setFormData] = useState(user);
  const fileInputRef = useRef(null);

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupForm({
      ...signupForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, you would validate credentials against your backend
    setIsLoggedIn(true);
    alert('Login successful!');
  };

  const handleSignup = (e) => {
    e.preventDefault();
    
    // Validation
    if (signupForm.password !== signupForm.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (!signupForm.agreeToTerms) {
      alert('You must agree to the terms and conditions');
      return;
    }
    
    // In a real app, you would send this data to your backend
    const newUser = {
      name: `${signupForm.firstName} ${signupForm.lastName}`,
      email: signupForm.email,
      address: `${signupForm.address}, ${signupForm.city}, ${signupForm.state} ${signupForm.zipCode}, ${signupForm.country}`,
      orders: 0,
      profileImage: null,
      phone: signupForm.phone,
      dateOfBirth: signupForm.dateOfBirth,
      gender: signupForm.gender
    };
    
    setUser(newUser);
    setFormData(newUser);
    setIsLoggedIn(true);
    setIsSignUp(false);
    
    alert('Account created successfully! Welcome to Ncart!');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginForm({ email: '', password: '' });
    alert('Logged out successfully!');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      alert('New password must be at least 6 characters long!');
      return;
    }
    
    // In a real app, you would send this to your backend
    alert('Password changed successfully!');
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setIsChangingPassword(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({ ...formData, profileImage: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const removeProfileImage = () => {
    setFormData({ ...formData, profileImage: null });
  };

  // Login/Signup Section (shown when not logged in)
  if (!isLoggedIn) {
    return (
      <div className="container-center my-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-center">
            {isSignUp ? 'Create an Account' : 'Login to Your Account'}
          </h1>
          
          {!isSignUp ? (
            // Login Form
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  required
                  className="w-full rounded-xl border dark:border-gray-800 px-3 py-2 bg-white dark:bg-gray-800"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  required
                  className="w-full rounded-xl border dark:border-gray-800 px-3 py-2 bg-white dark:bg-gray-800"
                  placeholder="Enter your password"
                />
              </div>
              
              <button
                type="submit"
                className="w-full px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold"
              >
                Login
              </button>
              
              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
              </div>
              
              <div className="text-center text-sm">
                <p className="text-gray-600 dark:text-gray-400">
                  Don't have an account?{' '}
                  <button 
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    className="text-blue-600 hover:underline"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </form>
          ) : (
            // Signup Form
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={signupForm.firstName}
                    onChange={handleSignupChange}
                    required
                    className="w-full rounded-xl border dark:border-gray-800 px-3 py-2 bg-white dark:bg-gray-800"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={signupForm.lastName}
                    onChange={handleSignupChange}
                    required
                    className="w-full rounded-xl border dark:border-gray-800 px-3 py-2 bg-white dark:bg-gray-800"
                    placeholder="Last name"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={signupForm.email}
                  onChange={handleSignupChange}
                  required
                  className="w-full rounded-xl border dark:border-gray-800 px-3 py-2 bg-white dark:bg-gray-800"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={signupForm.phone}
                  onChange={handleSignupChange}
                  required
                  className="w-full rounded-xl border dark:border-gray-800 px-3 py-2 bg-white dark:bg-gray-800"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={signupForm.dateOfBirth}
                    onChange={handleSignupChange}
                    required
                    className="w-full rounded-xl border dark:border-gray-800 px-3 py-2 bg-white dark:bg-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Gender</label>
                  <select
                    name="gender"
                    value={signupForm.gender}
                    onChange={handleSignupChange}
                    required
                    className="w-full rounded-xl border dark:border-gray-800 px-3 py-2 bg-white dark:bg-gray-800"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={signupForm.password}
                    onChange={handleSignupChange}
                    required
                    className="w-full rounded-xl border dark:border-gray-800 px-3 py-2 bg-white dark:bg-gray-800"
                    placeholder="Create password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={signupForm.confirmPassword}
                    onChange={handleSignupChange}
                    required
                    className="w-full rounded-xl border dark:border-gray-800 px-3 py-2 bg-white dark:bg-gray-800"
                    placeholder="Confirm password"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={signupForm.address}
                  onChange={handleSignupChange}
                  required
                  className="w-full rounded-xl border dark:border-gray-800 px-3 py-2 bg-white dark:bg-gray-800"
                  placeholder="Street address"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={signupForm.city}
                    onChange={handleSignupChange}
                    required
                    className="w-full rounded-xl border dark:border-gray-800 px-3 py-2 bg-white dark:bg-gray-800"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">State</label>
                  <input
                    type="text"
                    name="state"
                    value={signupForm.state}
                    onChange={handleSignupChange}
                    required
                    className="w-full rounded-xl border dark:border-gray-800 px-3 py-2 bg-white dark:bg-gray-800"
                    placeholder="State"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={signupForm.zipCode}
                    onChange={handleSignupChange}
                    required
                    className="w-full rounded-xl border dark:border-gray-800 px-3 py-2 bg-white dark:bg-gray-800"
                    placeholder="ZIP code"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={signupForm.country}
                    onChange={handleSignupChange}
                    required
                    className="w-full rounded-xl border dark:border-gray-800 px-3 py-2 bg-white dark:bg-gray-800"
                    placeholder="Country"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={signupForm.agreeToTerms}
                  onChange={handleSignupChange}
                  required
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  I agree to the <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                </label>
              </div>
              
              <button
                type="submit"
                className="w-full px-4 py-2 rounded-xl bg-green-600 text-white font-semibold"
              >
                Create Account
              </button>
              
              <div className="text-center text-sm">
                <p className="text-gray-600 dark:text-gray-400">
                  Already have an account?{' '}
                  <button 
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className="text-blue-600 hover:underline"
                  >
                    Login
                  </button>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  // Account Section (shown when logged in)
  return (
    <div className="container-center my-6">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>
      
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center">
            <div className="relative">
              {formData.profileImage ? (
                <img 
                  src={formData.profileImage} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold border-4 border-gray-200 dark:border-gray-700">
                  {formData.name ? formData.name.charAt(0).toUpperCase() : "U"}
                </div>
              )}
              
              {isEditing && (
                <div className="absolute bottom-0 right-0 flex gap-2">
                  <button 
                    onClick={triggerFileInput}
                    className="p-1 bg-blue-600 text-white rounded-full"
                    title="Change photo"
                  >
                    📷
                  </button>
                  {formData.profileImage && (
                    <button 
                      onClick={removeProfileImage}
                      className="p-1 bg-red-600 text-white rounded-full"
                      title="Remove photo"
                    >
                      ❌
                    </button>
                  )}
                </div>
              )}
            </div>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            
            {isEditing && (
              <p className="text-xs text-gray-500 mt-2 text-center">
                Click camera icon to change photo
              </p>
            )}
          </div>

          {/* Profile Info and Actions */}
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Profile Information</h2>
              {!isEditing ? (
                <div className="flex gap-2">
                  <button 
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-xl border dark:border-gray-800 text-sm"
                  >
                    Logout
                  </button>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm"
                  >
                    Edit Profile
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      setIsEditing(false);
                      setFormData(user);
                    }}
                    className="px-4 py-2 rounded-xl border dark:border-gray-800 text-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    className="px-4 py-2 rounded-xl bg-green-600 text-white text-sm"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border dark:border-gray-800 px-3 py-2 bg-white dark:bg-gray-800"
                  />
                ) : (
                  <p className="px-3 py-2">{user.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border dark:border-gray-800 px-3 py-2 bg-white dark:bg-gray-800"
                  />
                ) : (
                  <p className="px-3 py-2">{user.email}</p>
                )}
              </div>

              {user.phone && (
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone || ''}
                      onChange={handleChange}
                      className="w-full rounded-xl border dark:border-gray-800 px-3 py-2 bg-white dark:bg-gray-800"
                    />
                  ) : (
                    <p className="px-3 py-2">{user.phone}</p>
                  )}
                </div>
              )}

              {user.dateOfBirth && (
                <div>
                  <label className="block text-sm font-medium mb-2">Date of Birth</label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth || ''}
                      onChange={handleChange}
                      className="w-full rounded-xl border dark:border-gray-800 px-3 py-2 bg-white dark:bg-gray-800"
                    />
                  ) : (
                    <p className="px-3 py-2">{user.dateOfBirth}</p>
                  )}
                </div>
              )}

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Shipping Address</label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    className="w-full rounded-xl border dark:border-gray-800 px-3 py-2 bg-white dark:bg-gray-800"
                  />
                ) : (
                  <p className="px-3 py-2">{user.address}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Total Orders</label>
                <p className="px-3 py-2">{user.orders}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Member Since</label>
                <p className="px-3 py-2">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Change Section */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Change Password</h2>
          <button 
            onClick={() => setIsChangingPassword(!isChangingPassword)}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm"
          >
            {isChangingPassword ? 'Cancel' : 'Change Password'}
          </button>
        </div>

        {isChangingPassword && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-2">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                required
                className="w-full rounded-xl border dark:border-gray-800 px-3 py-2 bg-white dark:bg-gray-800"
                placeholder="Enter current password"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                required
                className="w-full rounded-xl border dark:border-gray-800 px-3 py-2 bg-white dark:bg-gray-800"
                placeholder="Enter new password"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                required
                className="w-full rounded-xl border dark:border-gray-800 px-3 py-2 bg-white dark:bg-gray-800"
                placeholder="Confirm new password"
              />
            </div>
            
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-green-600 text-white"
            >
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}