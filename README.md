# 🌾 Farm Management System

A full-stack web application for managing farm crops with user authentication and CRUD operations.

## 🚀 Features

- **User Authentication**: Register and login functionality
- **Crop Management**: Add, view, and delete crops
- **Responsive Design**: Modern UI that works on all devices
- **Real-time Updates**: Dynamic crop list updates
- **Secure Backend**: Password hashing and validation

## 🛠️ Technology Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests
- **dotenv** for environment variables

### Frontend
- **React.js** with Hooks
- **Axios** for API calls
- **Modern CSS** with gradients and animations
- **Responsive Grid Layout**

## 📋 Prerequisites

Before running this application, make sure you have:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) running locally or MongoDB Atlas connection
- npm (comes with Node.js)

## 🔧 Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd farming-management-system
```

### 2. Backend Setup
```bash
cd farming-backend
npm install
```

Create a `.env` file in the `farming-backend` directory:
```env
MONGO_URI=mongodb://localhost:27017/farming_db
PORT=5000
```

### 3. Frontend Setup
```bash
cd ../farming-app
npm install
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# For local MongoDB installation
mongod
```

### 5. Run the Application

**Start the Backend** (in farming-backend directory):
```bash
npm start
# or for development with auto-restart
npm run dev
```

**Start the Frontend** (in farming-app directory):
```bash
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📱 Usage

1. **Register**: Create a new account with your details
2. **Login**: Sign in with your username and password
3. **Add Crops**: Use the form to add new crops with name, type, and area
4. **View Crops**: See all your crops in a responsive grid layout
5. **Delete Crops**: Remove crops you no longer need

## 🔗 API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user

### Crops
- `GET /api/crops` - Get all crops
- `POST /api/crops` - Add a new crop
- `DELETE /api/crops/:id` - Delete a crop

## 🎨 Screenshots

The application features a modern, gradient-based design with:
- Clean authentication forms
- Responsive crop management interface
- Hover effects and smooth animations
- Mobile-friendly layout

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the MONGO_URI in your .env file
   - Verify database permissions

2. **CORS Issues**
   - Backend includes CORS middleware
   - Frontend should run on port 3000, backend on port 5000

3. **Dependencies Issues**
   - Delete `node_modules` and run `npm install` again
   - Ensure you're using compatible Node.js version

### Security Vulnerabilities
If you see npm audit warnings, you can run:
```bash
npm audit fix
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔮 Future Enhancements

- [ ] Map integration with Leaflet for field visualization
- [ ] Crop rotation planning
- [ ] Weather data integration
- [ ] Harvest tracking
- [ ] Export data functionality
- [ ] Multi-language support

---

**Happy Farming! 🚜**