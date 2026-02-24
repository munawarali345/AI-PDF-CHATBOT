# PDF Chat Application 🤖📄

An AI-powered PDF chat application that allows users to upload PDF documents and ask questions about them. Built with modern technologies including Next.js, LangChain, Qdrant, and Clerk authentication.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-61DAFB)
![Tailwind](https://img.shields.io/badge/Tailwind CSS-4-06B6D4)
![LangChain](https://img.shields.io/badge/LangChain-0.3-326CE5)
![Qdrant](https://img.shields.io/badge/Qdrant-Vector DB-00AFFF)
![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF)

## 🌟 Features

- **PDF Upload**: Drag and drop or select PDF files for upload
- **AI-Powered Chat**: Ask questions about your PDF and get instant answers
- **Vector Search**: Semantic search using Qdrant vector database
- **RAG Pipeline**: Retrieval-Augmented Generation for accurate responses
- **User Authentication**: Secure signup/login with Clerk
- **Modern UI**: Beautiful, responsive interface built with Tailwind CSS and Shadcn
- **Background Processing**: PDF processing handled via BullMQ job queue

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| Next.js 16 | React framework with App Router |
| React 19 | UI library |
| Tailwind CSS 4 | Styling |
| Clerk | Authentication |
| Shadcn/UI | UI components |
| Radix UI | Accessible components |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript runtime |
| Express | Web framework |
| LangChain | AI/LLM framework |
| Groq | LLM inference (Llama 3.3) |
| Cohere | Text embeddings |
| BullMQ | Job queue |
| Valkey | Message broker (Redis replacement) |
| Qdrant | Vector database |
| Multer | File upload handling |

### DevOps
| Technology | Purpose |
|------------|---------|
| Docker | Containerization |
| Valkey | In-memory data store for queue |
| Qdrant | Vector similarity search |

## 📁 Project Structure

```
pdf-chat-app/
├── client/                         # Next.js Frontend
│   ├── app/
│   │   ├── layout.tsx            # Root layout with Clerk auth
│   │   ├── page.tsx              # Main chat interface
│   │   └── globals.css            # Global Tailwind styles
│   ├── components/
│   │   ├── ChatComponent.tsx     # Chat interface
│   │   ├── FileUploads.tsx       # PDF upload component
│   │   ├── MessageBubble.tsx      # Chat message display
│   │   ├── Avatar.tsx            # User avatar
│   │   ├── LoadingIndicator.tsx  # Loading spinner
│   │   ├── PDFIcon.tsx           # PDF file icon
│   │   ├── ChevronIcon.tsx       # Arrow icon
│   │   ├── DownloadIcon.tsx      # Download icon
│   │   ├── ReferenceItem.tsx     # Reference document item
│   │   └── ReferencesAccordion.tsx # References collapsible
│   ├── components/ui/
│   │   ├── button.tsx             # Button component
│   │   └── input.tsx              # Input component
│   ├── lib/utils.ts              # Utility functions
│   ├── public/                    # Static assets (SVGs)
│   └── package.json
│
├── server/                         # Node.js Backend
│   ├── index.js                  # Express server with API routes
│   ├── worker.js                 # BullMQ worker for PDF processing
│   ├── uploads/                  # Uploaded PDF files
│   └── package.json
│
├── qdrant_storage/               # Qdrant data storage (not committed)
├── docker-compose.yml             # Docker services (Qdrant + Valkey)
└── README.md
```

## 🔄 How It Works

### Architecture Diagram

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│   Server    │────▶│   Qdrant    │
│  (Next.js)  │     │  (Express)  │     │  (Vectors)  │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       │                   ▼                   │
       │            ┌─────────────┐            │
       │            │   BullMQ    │            │
       │            │  (Valkey)   │            │
       │            └─────────────┘            │
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    Clerk    │     │  PDF Processing  │     │   Groq     │
│  (Auth)     │     │  (LangChain)    │     │   (AI)     │
└─────────────┘     └─────────────────┘     └─────────────┘
```

### Data Flow

1. **User uploads PDF** → Server receives file via Multer
2. **PDF added to queue** → BullMQ job created in Valkey
3. **Worker processes PDF** → LangChain loads, splits into chunks
4. **Embeddings created** → Cohere creates vector embeddings
5. **Vectors stored** → Qdrant stores embeddings for similarity search
6. **User asks question** → Query embedded → Relevant chunks retrieved
7. **AI generates response** → Groq Llama processes context + query
8. **Response returned** → Frontend displays answer with references

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)
- Docker Desktop

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pdf-chat-app.git
   cd pdf-chat-app
   ```

2. **Install frontend dependencies**
   ```bash
   cd client
   pnpm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   pnpm install
   ```

4. **Set up environment variables**

   Create `client/.env`:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx
   CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxx
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   ```

   Create `server/.env`:
   ```env
   # AI APIs
   COHERE_API_KEY=your_cohere_api_key
   GROQ_API_KEY=your_groq_api_key
   ```

5. **Start Docker services**
   ```bash
   docker-compose up -d
   ```

   This starts:
   - **Qdrant** (port 6333) - Vector database
   - **Valkey** (port 6379) - Message queue

6. **Run the application**

   Terminal 1 - Backend:
   ```bash
   cd server
   pnpm dev
   ```

   Terminal 2 - Worker:
   ```bash
   cd server
   pnpm dev:worker
   ```

   Terminal 3 - Frontend:
   ```bash
   cd client
   pnpm dev
   ```

7. **Open browser**
   - Frontend: http://localhost:3000
   - Qdrant Dashboard: http://localhost:6333/dashboard

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/upload/pdf` | POST | Upload PDF file |
| `/chat` | GET | Ask question about PDF |

## 🔧 Available Scripts

### Client
```bash
cd client
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

### Server
```bash
cd server
pnpm dev        # Start Express server
pnpm dev:worker # Start BullMQ worker
```

## 📝 Environment Variables

### Client (.env)
| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key |
| `CLERK_SECRET_KEY` | Clerk secret key |

### Server (.env)
| Variable | Description |
|----------|-------------|
| `COHERE_API_KEY` | Cohere API for embeddings |
| `GROQ_API_KEY` | Groq API for LLM inference |

## ⚠️ Important Notes

- **NEVER commit** `.env` files - they contain sensitive API keys
- **DO NOT push** `qdrant_storage/` - it's your local vector database
- **DO NOT push** `node_modules/` - install with `pnpm install`
- Run `docker-compose up -d` before starting the server
- Both server and worker must be running for full functionality

## 🐳 Docker Services

```yaml
# docker-compose.yml
services:
  valkey:
    image: valkey/valkey:latest
    ports:
      - "6379:6379"

  qdrant:
    image: qdrant/qdrant:latest
    ports:
      - "6333:6333"
      - "6334:6334"
    volumes:
      - ./qdrant_storage:/qdrant/storage
```

## 📦 Key Dependencies

### Client
- `@clerk/nextjs` - Authentication
- `next` 16.1.6 - React framework
- `react` 19.2.3 - UI library
- `tailwindcss` v4 - Styling

### Server
- `langchain` - AI framework
- `@langchain/qdrant` - Qdrant integration
- `@langchain/cohere` - Cohere embeddings
- `@langchain/groq` - Groq LLM
- `bullmq` - Job queue
- `express` - Web framework
- `qdrant` - Vector database

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License

## 👤 Author

**Your Name**
- GitHub: [Munawarali345](https://github.com/munawarali345)
- 

---

<p align="center">
  Made with ❤️ using Next.js, node.js, express.js LangChain & Qdrant
</p>
