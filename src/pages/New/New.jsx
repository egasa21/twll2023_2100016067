import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './new.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const New = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [department, setDepartment] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartments = async () => {
            const token = Cookies.get('access_token')
            try {
                const response = await axios.get(`https://api.egasaputra.cloud/api/departments`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDepartment(response.data);

            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };

        fetchDepartments();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('fullname', fullname);
            formData.append('email', email);
            formData.append('image', image);
            formData.append('DOB', dob);
            formData.append('gender', gender);
            formData.append('address', address);
            formData.append('phone', phone);
            formData.append('department', selectedDepartment);

            const token = Cookies.get('access_token');
            const response = await axios.post('https://api.egasaputra.cloud/api/doctors/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Handle the response from the API
            console.log('Form submitted successfully:', response.data);

            // Reset the form fields
            setFullname('');
            setEmail('');
            setImage(null);
            setDob('');
            setGender('');
            setAddress('');
            setPhone('');
            setSelectedDepartment('');

            // Show a success message to the user
            setMessage('Form submitted successfully');
            setError('');

            navigate('/doctors');
        } catch (error) {
            console.error('Form submission failed:', error);

            // Show an error message to the user
            setMessage('');
            setError('Failed to submit the form');
        }
    };

    const handleBack = () => {
        navigate('/doctors')
    }

    return (
        <div className="form-container">
            <div className="back-button" onClick={handleBack}>
                &lt; Back
            </div>
            <h2>Add New Doctor</h2>
            {error && <p>Error: {error}</p>}
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <input
                        type="text"
                        id="fullname"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        id="image"
                        onChange={(e) => setImage(e.target.files[0])}
                        accept="image/*"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dob">Date of Birth</label>
                    <input
                        type="date"
                        id="dob"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <textarea
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="number"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="department">Department</label>
                    <select
                        id="department"
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        required
                    >
                        <option value="">Select Department</option>
                        {department.map((dept) => (
                            <option key={dept._id} value={dept._id}>
                                {dept.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default New;
