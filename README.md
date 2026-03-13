# Integrated Therapy - Website Setup & Deployment Guide

## Overview
This is a complete, production-ready wellness and pharmacy website with integrated payment processing, form handling, and admin notifications.

## 🎯 What's Been Fixed & Implemented

### 1. **Currency Standardization (GBP)**
- All prices converted from USD/UGX to GBP (British Pounds)
- Consistent pricing across all pages
- Updated cart.js with proper GBP formatting

### 2. **Contact Form Backend**
- Email validation and sanitization
- Sends confirmation email to users
- Admin notification emails
- Real-time feedback with loading states
- File: `server.js` → `/api/contact` endpoint

### 3. **Newsletter Subscription**
- Email validation
- Confirmation emails to subscribers
- Admin tracking of new subscribers
- Implemented across all pages (index-pro.html, contact.html)
- Reusable script for all footer newsletter forms

### 4. **Payment Integration - Flutterwave**
- Demo production-ready setup (test keys included)
- GBP currency support
- Secure checkout page matching site architecture
- Cart management from localStorage
- Success/failure handling
- Transaction reference tracking
- No price display on button (amount shown in order summary)

### 5. **Checkout System**
- Replaced React/Next.js checkout with HTML version
- Matches main site architecture and styling
- Loads cart items from localStorage
- Integrated shipping info, order summary
- Responsive design
- Professional payment flow

### 6. **Node.js/Express Backend Server**
- Email handling via Nodemailer
- CORS-enabled for frontend communication
- Environment-based configuration
- Health check endpoint

---

## 📁 Project Structure

```
Integrated Therapy/
├── index-pro.html              # Main homepage (GBP prices, newsletter)
├── contact.html                # Contact page (form + newsletter)
├── checkout.html               # Checkout page (Flutterwave integration)
├── Cart.html                   # Shopping cart
├── pharmacy2.html              # Products/pharmacy
├── package.json                # Node.js dependencies
├── server.js                   # Express backend server
├── .env.example                # Environment variables template
├── assets/
│   ├── css/
│   │   ├── bootstrap.min.css
│   │   ├── custom.css
│   │   └── templatemo.css
│   ├── js/
│   │   ├── cart.js             # Fixed (removed <script> tags, GBP currency)
│   │   ├── bootstrap.bundle.min.js
│   │   └── other JS files
│   └── img/
├── app/
│   └── checkout/
│       └── page.tsx            # Old React checkout (use checkout.html instead)
└── [Other pages...]
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js v14+ installed
- Gmail account (for email sending) or other SMTP provider

### Step 1: Install Dependencies

```bash
cd "d:\OTB\Integrated Therapy"
npm install
```

This installs:
- express (web server)
- nodemailer (email handling)
- cors (cross-origin requests)
- body-parser (request parsing)
- dotenv (environment variables)

### Step 2: Configure Environment Variables

1. Copy `.env.example` to `.env`:
```bash
copy .env.example .env
```

2. Edit `.env` with your credentials:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
ADMIN_EMAIL=info@mcnutraceutical.co.uk
PORT=3000
NODE_ENV=development
```

**📌 Important: Gmail App Password Setup**
- Enable 2-Factor Authentication on your Gmail account
- Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
- Generate an app-specific password for "Mail"
- Use this 16-character password in `.env`

### Step 3: Start the Server

**Development Mode:**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

Server runs on: `http://localhost:3000`

### Step 4: Test Forms

- **Contact Form:** http://localhost:3000/contact.html → Fill form → Submit
- **Newsletter:** Any page footer → Enter email → Subscribe
- **Checkout:** http://localhost:3000/checkout.html → Complete with Flutterwave

---

## 💳 Flutterwave Integration

### Current Setup
- **Test Mode:** All payments are simulated (no real charges)
- **Currency:** GBP (British Pounds)
- **Public Key:** `FLWPUBK_TEST-b38a39b5b5abb4e9e9f7f6f7f6f7f6f7-X`
- **Location:** `checkout.html` lines 230-235

### Testing Payment
1. Go to `/checkout.html`
2. Add items to cart from pharmacy
3. Fill in customer details
4. Click "Pay with Flutterwave"
5. Use Flutterwave test cards:
   - Card: `4239 6010 0000 0086`
   - Expiry: `09/32`
   - CVV: `812`
   - OTP: `123456`

### Switch to Production
1. Get live keys from Flutterwave dashboard
2. Update in `checkout.html`:
```javascript
public_key: 'FLWPUBK_LIVE-xxxxxxxxxxxxx-X'
```
3. Remove test mode restrictions

---

## 📧 Email Configuration

### Contact Form Emails
**What happens:**
1. User submits contact form
2. Admin receives notification with all details
3. User receives confirmation email

**Endpoints:**
- POST `/api/contact`
- Expects: `{ name, email, subject, message }`

### Newsletter Emails
**What happens:**
1. User enters email in footer
2. Subscriber receives welcome email
3. Admin gets notification

**Endpoints:**
- POST `/api/newsletter`
- Expects: `{ email }`

---

## 🔒 Security Notes

1. **Never commit `.env` file** - it contains sensitive credentials
2. **Use strong email passwords** - consider using app-specific passwords
3. **Validate all inputs** - server-side validation is implemented
4. **HTTPS Required** - use at minimum on production
5. **CORS Configured** - adjust if needed in `server.js`

---

## 📊 Key Changes Made

### Files Modified
| File | Changes |
|------|---------|
| `index-pro.html` | USD→GBP prices, newsletter form with ID & handler |
| `contact.html` | Contact form action, newsletter form handler |
| `checkout.html` | Complete rewrite: HTML-based, Flutterwave integration |
| `assets/js/cart.js` | Removed `<script>` tags, GBP formatting |
| `package.json` | Created with dependencies |
| `.env.example` | Created with required variables |

### Files Created
- `server.js` - Express backend for forms
- `package.json` - Node.js dependencies
- `.env.example` - Environment template
- This README

---

## 🐛 Troubleshooting

### Forms Not Submitting
- **Check:** Is server running? (`npm run dev`)
- **Check:** Are you accessing via `http://localhost:3000`?
- **Check:** Browser console for error messages

### Emails Not Sending
- **Check:** Gmail 2FA enabled?
- **Check:** App password generated correctly?
- **Check:** `.env` values match exactly
- **Try:** Test with simpler email (e.g., test@gmail.com)

### Flutterwave Payment Not Working
- **Check:** Public key is correct and accessible
- **Check:** Amount is valid (not negative, not zero)
- **Check:** `checkout.html` is served via HTTP server

### 404 Errors
- Make sure files are in correct paths
- Check file names for typos (Linux is case-sensitive on some environments)

---

## 📱 Testing Checklist

- [ ] Homepage loads with GBP prices
- [ ] Contact form submits and sends email
- [ ] Newsletter form in footer submits
- [ ] Checkout page loads cart items
- [ ] Flutterwave payment modal opens
- [ ] Payment success message shows
- [ ] Confirmation email received
- [ ] Admin gets notifications

---

## 🚢 Deployment Recommendations

### For Production
1. Use a hosting provider that supports Node.js (Heroku, AWS, DigitalOcean, etc.)
2. Use environment-specific `.env` files
3. Enable HTTPS/SSL certificates
4. Use a reverse proxy (Nginx/Apache)
5. Set up automated backups
6. Monitor server logs
7. Use a process manager like PM2

### Example PM2 Setup
```bash
npm install -g pm2
pm2 start server.js --name "integrated-therapy"
pm2 save
pm2 startup
```

---

## 📞 Support Contacts

- **Email:** info@mcnutraceutical.co.uk
- **Phone:** +44 799 334 9777
- **Location:** United Kingdom

---

## 📝 License

© 2026 Integrated Therapy UK Ltd. All rights reserved.
Designed & Developed by OTB PRO

---

## 🎯 Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Configure `.env` file
3. ✅ Start server: `npm run dev`
4. ✅ Test all forms and payments
5. ✅ Deploy to production hosting

---

**Created:** March 6, 2026  
**Last Updated:** March 6, 2026
