# QUICK START GUIDE

## ⚡ Get Running in 3 Minutes

### 1. Install Dependencies
```bash
cd d:\OTB\Integrated Therapy
npm install
```

### 2. Setup Email
- Copy `.env.example` → `.env`
- Add your Gmail credentials
- Get app password from: https://myaccount.google.com/apppasswords

### 3. Start Server
```bash
npm run dev
```

### 4. Test
- Open http://localhost:3000/index-pro.html
- Fill contact form or newsletter → should work!
- Test checkout at http://localhost:3000/checkout.html

---

## 🔧 All Fixes Applied

✅ **Currency:** USD/UGX → GBP everywhere  
✅ **Contact Form:** Now sends emails (admin + user confirmation)  
✅ **Newsletter:** Works with email validation & confirmation  
✅ **Checkout:** New HTML page with Flutterwave integration  
✅ **Cart:** Fixed currency formatting (GBP)  
✅ **Backend:** Express.js server for form handling  
✅ **Images:** You handle testimonial images  

---

## 📧 Email Variables (.env)

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password (16 chars from Gmail)
ADMIN_EMAIL=info@mcnutraceutical.co.uk
PORT=3000
```

---

## 💳 Flutterwave Test Card
- Number: 4239 6010 0000 0086
- Expiry: 09/32
- CVV: 812
- OTP: 123456

---

## 🎯 API Endpoints

**POST /api/contact**
- Form: name, email, subject, message
- Returns: success message or error

**POST /api/newsletter**
- Form: email
- Returns: subscription confirmation or error

**GET /api/health**
- Returns: server status

---

## 📚 Full Documentation
See `README.md` for complete setup and troubleshooting
