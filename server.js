const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password'
  }
});

// Contact Form Handler
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Check if email is properly configured
    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_PASSWORD;

    if (!emailUser || !emailPassword || emailUser === 'your-email@gmail.com' || emailPassword === 'your-16-character-app-password') {
      // Demo mode - simulate successful submission
      console.log('DEMO MODE: Pharmacy enquiry received:', { name, email, subject, message });

      return res.json({
        success: true,
        message: 'Thank you! Your pharmacy enquiry has been received. In a production environment, you would receive a confirmation email. We will respond within 24 hours.'
      });
    }

    // Email to admin
    const adminMailOptions = {
      from: emailUser,
      to: process.env.ADMIN_EMAIL || 'info@mcnutraceutical.co.uk',
      subject: `New Pharmacy Enquiry: ${subject}`,
      html: `
        <h2>New Pharmacy Enquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>This enquiry was submitted via the pharmacy contact form.</em></p>
      `
    };

    // Confirmation email to user
    const userMailOptions = {
      from: emailUser,
      to: email,
      subject: 'We received your pharmacy enquiry - Integrated Therapy',
      html: `
        <h2>Thank You, ${name}!</h2>
        <p>We have received your pharmacy enquiry and will get back to you within 24 hours.</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Your Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p>Best regards,<br>Integrated Therapy UK Pharmacy Team</p>
      `
    };

    // Send emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    res.json({
      success: true,
      message: 'Thank you! Your pharmacy enquiry has been received. We will respond within 24 hours.'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending enquiry. Please try again later or call us directly at +(44)799-334-9777'
    });
  }
});

// Newsletter Subscription Handler
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    // Confirmation email to subscriber
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Integrated Therapy Newsletter',
      html: `
        <h2>Welcome to Our Health & Wellness Community</h2>
        <p>Thank you for subscribing to Integrated Therapy's newsletter!</p>
        <p>You'll now receive:</p>
        <ul>
          <li>Exclusive health tips and wellness guides</li>
          <li>Special offers on our premium supplements</li>
          <li>Expert advice from our practitioners</li>
          <li>Updates on new products and services</li>
        </ul>
        <p>We look forward to supporting your wellness journey.</p>
        <hr>
        <p>Best regards,<br>Integrated Therapy UK Team</p>
        <p><small>If you wish to unsubscribe, you can reply to this email with 'Unsubscribe'</small></p>
      `
    };

    // Admin notification
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || 'info@mcnutraceutical.co.uk',
      subject: 'New Newsletter Subscriber',
      html: `
        <p>A new user has subscribed to the newsletter:</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    await transporter.sendMail(adminMailOptions);

    res.json({
      success: true,
      message: 'Successfully subscribed! Check your email for confirmation.'
    });
  } catch (error) {
    console.error('Newsletter error:', error);
    res.status(500).json({
      success: false,
      message: 'Error subscribing. Please try again later.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
