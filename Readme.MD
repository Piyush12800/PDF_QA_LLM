# PDF Q/A with LLM

A web application that allows users to upload PDF documents and get AI-powered answers to their questions about the document content. The project consists of a React.js frontend and a FastAPI backend integrated with Google's Gemini AI.

## Live Demo

🚀 [Try the application](https://pdf-qa-llm.vercel.app/)

## Screenshots

### Desktop View

![Desktop View](image/Readme/1730787082298.png)
*Desktop interface showing PDF upload and chat interaction*

### Mobile View

![Mobile View](image/Readme/1730787103838.png)
*Mobile-responsive interface for on-the-go document Q&A*

## Project Structure

```
PDF_QA_LLM/
├── client/         # React frontend application
├── server/         # FastAPI backend application
└── README.md       # This file
```

## Features

- 📱 Fully responsive design for mobile and desktop
- 📄 Upload and analyze any PDF document
- 💬 Interactive chat interface for document Q&A
- 🤖 Powered by Google's Gemini AI
- ☁️ Cloud storage for documents
- ⚡ Real-time responses

## Tech Stack

### Frontend

- React.js
- Tailwind CSS
- Axios
- React Dropzone
- React Markdown

### Backend

- FastAPI
- PostgreSQL
- Google Gemini AI
- Cloudinary
- SQLAlchemy

## Quick Start

### Frontend Setup

```bash
cd client
npm install
npm start
```

Visit `http://localhost:3000` to access the application.

### Backend Setup

```bash
cd server
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend API will be available at `http://localhost:8000`

## Environment Variables

### Frontend (.env)

```bash
REACT_APP_API_URL=http://localhost:8000
```

### Backend (.env)

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
GOOGLE_API_KEY=your_google_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Detailed Documentation

- [Frontend Documentation](./client/README.md)
- [Backend Documentation](./server/README.md)

## Deployment

- Frontend is deployed on [Vercel](https://vercel.com)
- Backend is hosted on [Render](https://render.com)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Google Gemini AI for powerful language processing
- Cloudinary for reliable document storage
- Vercel and Railway for hosting services

---

Built with ❤️ by [Piyush12800](https://github.com/Piyush12800)
