# Lezichram – Memorial Web App for Israel’s Fallen Soldiers

**Lezichram** is a web application dedicated to honoring the memory of Israeli fallen soldiers by making it easier to discover memorial posts shared on Instagram. It bridges the gap between public memory and technology by enabling fast, name-based search of thousands of Instagram tribute posts.

---

## 🌐 Live Site

👉 [https://lezichram.co.il](https://lezichram.co.il)

## Youtube Video
👉 [Youtube Video Link:](https://youtu.be/82b8UXn8CK4)


---

## 📖 Overview

The initiative was launched by a social entrepreneur managing a large Instagram memorial page. The problem: Instagram lacks an efficient search mechanism to locate specific fallen soldiers by name.

**Lezichram** addresses this by:
- Scraping and indexing Instagram memorial posts.
- Displaying them in a clean searchable interface.
- Connecting users directly to the original posts.
- Allowing submissions for missing names via a contact form.

---

## ⚙️ Architecture Summary

- 🖥 **Frontend**: React app served to users.
- 🧠 **Backend**: Microservices to handle search, ingestion, and contact requests.
- ☁️ **Database/Storage**: Supabase (PostgreSQL + Storage)
- 🐳 **Deployment**: Docker + Docker Compose
- 🔁 **Automation**: Cron job to fetch new posts daily

---

## 🧭 System Architecture Diagram

```text
                   +-------------------+
                   |   Instagram Page  |
                   +--------+----------+
                            |
                            v
                +-----------------------+
                |  ingestion-service    | <--- Cron Job
                |-----------------------|
                | Fetch IG posts        |
                | Upload to Supabase    |
                +-----------------------+
                            |
                            v
           +-------------------------------+
           |     Supabase (DB + Storage)   |
           |-------------------------------|
           | - posts table                 |
           | - images (bucket)             |
           +-------------------------------+
                   ^              ^
                   |              |
     +-------------+              +------------------+
     |                                                   |
     v                                                   v
+-------------------+                     +----------------------+
|  soldier-service  | <---- API ---->     |   contact-service    |
+-------------------+                     +----------------------+
| Search soldiers   |                     | Submit soldier info  |
+-------------------+                     +----------------------+

              |
              v
     +--------------------+
     |     Frontend       |
     | (React + Vite)     |
     +--------------------+
     | - Search UI        |
     | - Contact Form     |
     +--------------------+

## 🧱 Project Structure

lezichram/
│
├── backend/
│ ├── soldier-service/ # API for searching and managing soldiers
│ ├── ingestion-service/ # Scheduled job to fetch and sync Instagram posts
│ └── contact-service/ # API for handling contact form submissions
│
├── frontend/ # React app
│ ├── src/
│ └── public/
│
├── docker-compose.yml
└── README.md
---
```
## 📦 Services Overview

### 📌 1. `soldier-service`

> Exposes REST API for searching and managing fallen soldiers' data.

- Connects to Supabase PostgreSQL
- Returns soldier metadata, Instagram links, and image URLs
- Provides search endpoint by soldier name

**Example endpoint**: `GET /api/soldiers?name=ron`

---

### 📸 2. `ingestion-service`

> Fetches the latest Instagram posts, processes them, and stores them in Supabase.

- Uses a scraping API or Apify actor to gather posts
- Uploads post images to Supabase Storage
- Inserts or updates rows in the `posts` table
- Deployed as a Docker container on Fly.io with a daily cron job

---

### 💬 3. `contact-service`

> Handles submissions from users who want to add a missing soldier.

- Exposes a `POST /api/contact` endpoint
- Saves user-provided data (name, message, contact info) in Supabase
- Used by the frontend's contact form

---

### 🌐 Frontend (React + Vite)

- Users can search by soldier name
- Results display soldier image, name, and direct link to Instagram
- "How It Started" and "About" sections explain the mission
- Contact form allows the public to contribute

---

## 🔑 Environment Variables & Supabase Setup

To run the app and services locally, you need access to Supabase:

### 1. Get Supabase Project Credentials

Go to your [Supabase dashboard](https://app.supabase.com/), select your project, and copy the following:

- **URL** → `https://<your-project-id>.supabase.co`
- **Anon/public API key** → Found under `Project Settings > API > anon key`
- **Service role key** → Only needed for ingestion-service and contact-service (use with caution)

### 2. Set Up `.env` Files

Each backend service requires a `.env` file in its root. Here's a sample:

#### For `soldier-service/.env` and `frontend/.env`:

VITE_SUPABASE_URL=https://<your-project-id>.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

shell
Copy
Edit

#### For `ingestion-service/.env`:

SUPABASE_URL=https://<your-project-id>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
BUCKET_NAME=post-images
FOLDER_NAME=posts
IG_USERNAME=lezichram_ # Your Instagram handle
APIFY_TOKEN=your-apify-token

shell
Copy
Edit

#### For `contact-service/.env`:

SUPABASE_URL=https://<your-project-id>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

yaml
Copy
Edit

---

## 🚀 Running with Docker Compose

1. Create `.env` files as shown above for each service.
2. In the root directory, run:

```bash
docker-compose up --build
The frontend and backend services will be available at their respective ports (see docker-compose.yml for details).

📈 Impact
Lezichram launched on Israel's Memorial Day and was visited over 15,000 times in a single day. The emotional value was immediate — hundreds of families submitted new names through the app.

🤝 Collaboration
Built collaboratively using:

Zoom – daily syncs

Jira – task tracking

Figma – UI/UX design

GitHub – source control
