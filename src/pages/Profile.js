import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('access') || localStorage.getItem('token');
      if (!token) {
        setError('No auth token found');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch user details');

        const body = await res.json();
        setUser(body?.data || {});
      } catch (err) {
        setError(err.message || 'Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async (event) => {
    event.preventDefault();
    setError('');
    setSuccessMsg('');

    const token = localStorage.getItem('access') || localStorage.getItem('token');
    if (!token) {
      setError('No auth token found');
      return;
    }

    const formData = new FormData(event.target);
    const updatedData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      mobileNo: formData.get('mobileNo'),
    };

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/users/update-profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || 'Update failed');
      }

      const body = await res.json();
      setUser(body.data);
      setSuccessMsg('Profile updated successfully!');
    } catch (err) {
      setError(err.message || 'Update failed');
    }
  };

  if (loading) return <div className="App p-6 text-center">Loading...</div>;
  if (error) return <div className="App p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="App p-6">
      {/* Top: Current Details */}
      <div className="profile-card mb-6">
        <div>
          <h2 className="card-title">Current Details</h2>
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile No:</strong> {user.mobileNo || '-'}</p>
          {user.isAdmin !== undefined && <p><strong>Admin:</strong> {user.isAdmin ? 'Yes' : 'No'}</p>}
          {user.createdAt && <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>}
          {user.updatedAt && <p><strong>Last Updated:</strong> {new Date(user.updatedAt).toLocaleString()}</p>}
          {user._id && <p><strong>User ID:</strong> {user._id}</p>}
        </div>
      </div>

      {/* Bottom: Update Form */}
      <div className="profile-card">
        <h2 className="card-title mb-4">Update Profile</h2>
        {successMsg && <p className="text-green-500 mb-2">{successMsg}</p>}
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">First Name:</label>
            <input
              type="text"
              name="firstName"
              defaultValue={user.firstName || ''}
              required
              className="profile-input"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Last Name:</label>
            <input
              type="text"
              name="lastName"
              defaultValue={user.lastName || ''}
              required
              className="profile-input"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Email:</label>
            <input
              type="email"
              name="email"
              defaultValue={user.email || ''}
              required
              className="profile-input"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Mobile No:</label>
            <input
              type="text"
              name="mobileNo"
              defaultValue={user.mobileNo || ''}
              className="profile-input"
            />
          </div>

          <button type="submit" className="update-button">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
