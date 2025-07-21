# Farming Backend

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   - Create a `.env` file in the `farming-backend` directory with the following content:
     ```env
     MONGO_URI=YOUR_MONGODB_ATLAS_URI_HERE
     PORT=5000
     ```
   - Replace `YOUR_MONGODB_ATLAS_URI_HERE` with your actual MongoDB Atlas connection string.

3. **Start the server:**
   ```bash
   node index.js
   ```

The backend will run on `http://localhost:5000` by default. 