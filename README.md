# 📚 Smart Book Recommendation System

An intelligent, full-stack book recommendation platform that delivers personalized suggestions, interactive games, and a dynamic reading experience.

---

## ✅ Features Implemented

- **User Authentication**
  - OAuth login/signup
  - Cookie-based session storage
  - Onboarding with favorite genres/authors before full authentication

- **Personalized Recommendations**
  - Based on user preferences, time-based sorting, and cross-genre logic

- **Articles Section**
  - One main article + 10 supporting ones
  - Real-time updates with external sources and hover animations

- **Trending Books**
  - Fetched from Google Books API
  - Live genre popularity chart

- **LitPlay – Daily Game Section**
  - **Book Bingo**: Fortnightly changing board with real book prompts
  - **Daily Quiz**: 5 randomized MCQs refreshed every 24 hours
  - **Crossword (Coming Soon)**

- **Community Engagement**
  - Redirect to Discord server for book discussions
  - In-app encrypted chat with user search, friend requests (Under Development)

- **Other UX Features**
  - Quote of the Day
  - Book facts carousel
  - Mini review wall using Socket.IO

---

## 🔧 Features To Be Implemented

- **📘 Top Books (General)**  
  Static/real-time listing of the most popular books overall

- **🌟 Top Picks (User-Based)**  
  Personalized top picks based on user preferences and behavior

- **🔑 Forgot Password**  
  Secure password reset via email or OTP

- **🧑‍💼 Display 10 Author Books**  
  Show 10 relevant books when an author is clicked/viewed

- **🔍 Search Functionality**  
  Search across titles, authors, and genres

- **🧠 Improved Recommendations Logic**  
  Fine-tuned model to include browsing habits and community trends

- **🎨 CSS Enhancements**  
  Style and animation polish for the game area (LitPlay)

---

## 📦 Tech Stack

- **Frontend**: React.js, Next.js, Tailwind CSS, Framer Motion  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Mongoose)  
- **Auth**: Cookie-based session + OAuth 2.0  
- **Real-Time**: Socket.IO  
- **External APIs**: Google Books API, Quote APIs, Trivia APIs  
- **Hosting**: GitHub (dev), to be deployed on Vercel/Netlify with HTTPS

---

## 📌 Status

The core system is functional and active, with games, onboarding, reviews, and Discord community support. Upcoming features will improve personalization, searchability, and overall polish.

---

