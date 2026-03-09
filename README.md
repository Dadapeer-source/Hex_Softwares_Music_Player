# 🎵 Web Music Player (Cloud-Based)

A **modern Web Music Player** that streams songs dynamically from the cloud using **Supabase Database and Storage**.
This project demonstrates how to build a **dynamic music streaming interface** using HTML, CSS, JavaScript, and cloud APIs.

🔗 **Live Demo:**
https://dadapeer-source.github.io/Hex_Softwares_Music_Player/

---

# 🚀 Features

🎧 Play, Pause, Next and Previous song controls
🔀 Shuffle functionality
🔁 Repeat / Loop mode
📃 Dynamic playlist loaded from cloud database
🔍 Real-time search for songs
🎨 Light / Dark theme toggle
📊 Song progress bar with time tracking
🔊 Volume control with visual indicators
🎵 Highlight currently playing song
📱 Responsive design for desktop and mobile devices

---

# 🛠️ Technologies Used

* **HTML5** – Structure of the application
* **CSS3** – Styling and responsive design
* **JavaScript** – Music player logic and interaction
* **Supabase** – Cloud database and storage
* **REST API** – Fetch songs dynamically from database
* **GitHub Pages** – Hosting the project online

---

# 🏗️ Project Architecture

Frontend Music Player
⬇
Supabase REST API
⬇
Supabase Database (song metadata)
⬇
Supabase Storage (MP3 files)

The music player fetches songs dynamically from Supabase instead of storing them locally.

---

# 📂 Project Structure

```
Hex_Softwares_Music_Player
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

# ⚙️ How It Works

1. Songs are uploaded to **Supabase Storage**
2. Song metadata is stored in **Supabase Database**
3. JavaScript fetches songs using **Supabase REST API**
4. The playlist is dynamically generated
5. Users can play songs directly from cloud storage

---

# 📦 Setup Instructions

### 1️⃣ Clone the repository

```
git clone https://github.com/Dadapeer-source/Hex_Softwares_Music_Player.git
```

### 2️⃣ Open the project

Open `index.html` in your browser.

---

# ☁️ Supabase Configuration

In `script.js` update the following:

```
const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL";
const SUPABASE_KEY = "YOUR_SUPABASE_PUBLIC_KEY";
```

---

# 🎵 Database Table Structure

Table name: **songs**

| Column | Type    |
| ------ | ------- |
| id     | integer |
| title  | text    |
| artist | text    |
| cover  | text    |
| url    | text    |

Example row:

```
title: Fear Song
artist: Anirudh
cover: https://image-link.jpg
url: https://storage-link.mp3
```

---

# 📱 Responsive Design

The application is optimized for:

* Desktop
* Tablet
* Mobile devices

Responsive CSS ensures the player adapts to different screen sizes.

---

# 📌 Future Improvements

* User authentication
* Custom playlists
* Recently played songs
* Favorites system
* Better UI animations
* Spotify-style album cards

---

# 👨‍💻 Author

**Dadapeer**

GitHub:
https://github.com/Dadapeer-source

LinkedIn:
https://www.linkedin.com/

---

# ⭐ Support

If you like this project, consider giving it a **star ⭐ on GitHub**.
