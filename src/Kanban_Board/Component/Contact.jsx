import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import "../Stylesheets/Contact.css";
import NavBar from './NavBar';

const Contact = () => {
  const [formData, setFormData] = useState({
    userEmail: '',
    subject: '',
    content: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.send(
      'service_hj99b58', // Replace with your EmailJS service ID
      'template_31y0u3f', // Replace with your EmailJS template ID
      formData,
      'sEAk2xVvk4Uj9OFEo' // Replace with your EmailJS user ID
    )
      .then((result) => {
        console.log(result.text);
        alert('Email successfully sent!');
      }, (error) => {
        console.log(error.text);
        alert('Failed to send the email, please try again later.');
      });
  };

  return (
    <div id="contact-page">
      <NavBar id="navbar" />
      <div id="contact-form-container" className="contact-container">
        <h2 id="contact-header">Contact Us</h2>
        <form id="contact-form" onSubmit={sendEmail}>
          <div id="email-group" className="form-group">
            <label id="email-label" className="form-label" htmlFor="email-input">Email:</label>
            <input
              id="email-input"
              className="form-input"
              type="email"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div id="subject-group" className="form-group">
            <label id="subject-label" className="form-label" htmlFor="subject-input">Subject:</label>
            <input
              id="subject-input"
              className="form-input"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div id="content-group" className="form-group">
            <label id="content-label" className="form-label" htmlFor="content-input">Content:</label>
            <textarea
              id="content-input"
              className="form-textarea"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>
          <button id="submit-button" className="form-button" type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
