
Backend extensions added:
- File storage via /api/files/upload (multer), files stored in backend/uploads
- Video streaming via /api/files/:filename (supports HTTP Range to allow video playback)
- Notifications: stored in MongoDB collection 'notifications', endpoints in /api/notifications
- Socket.io emits: 'notification', 'fileUploaded' when uploads or notifications are created
- Demo frontend at /demo/chat.html to test chat, upload, and playback quickly

How to use:
1. npm install
2. configure .env with MONGO_URI
3. npm run seed (optional)
4. npm run dev
5. Open http://localhost:5000/demo/chat.html
