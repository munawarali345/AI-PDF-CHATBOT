import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { Queue } from 'bullmq'; //queue bana ne k liye 1st ek queue banega then worker
import { QdrantVectorStore } from "@langchain/qdrant";
import { CohereEmbeddings } from "@langchain/cohere";
import Groq from 'groq-sdk/index.mjs';

// ESM __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// groq clint
const groqClient = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

// yaha ek queue banege name denge usko ek or sath connection
const queue = new Queue('file-upload-queue', {
  connection: {
    host: 'localhost',
    port: '6379'
 }
})

const app = express();
app.use(cors({
      origin: 'http://localhost:3000',
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));

// middlewere ye frontend se data aega json me us ko k liye 
app.use(express.json());

// ye middlewere form me jo data ara huga frontend se us k liye 
app.use(express.urlencoded({extended: true}));

// Static file serving for uploads folder
// Yeh uploads folder ko publically serve karega
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// for multer storage
// pehle kha upload kerna he wo denge 
// then file ka name bange uniquesuffux k sath
// ud kia huga upload folder me uploage hugi file ka name unique bun k aeha waha
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // uploads me 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${uniqueSuffix}-${file.originalname}`)//jo b file name huga us per uniquesuffix laga
                                                  // denge take files mis match na ho
  }
})
// upload ka ek instence create kerna he des multer storage wala storage denge
const upload = multer({storage: storage});


// ye route bana rah he chat ka is per vector store dlenge or us per as a retriver use kr ke user ki query per invoke ker denge 
app.get('/chat', async(req, res) =>{
  // user query abi hardcoded he 
  const userQuery = req.query.message;

  // embedding abi ase rakh ra hu bad me optimize kernge 
  const embeddings = new CohereEmbeddings({
    apiKey: process.env.COHERE_API_KEY,
    model: "embed-english-v3.0",
  });

    //  vectorstore
    const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
          url: "http://localhost:6333",
           collectionName: "pdf-docs",
    });

    // retrive karwenge
    const ret = vectorStore.asRetriever({
      k: 2,
    });

    // ab invoke ker denge user ki Query k uper 
    const result = await ret.invoke(userQuery)
    // ab yaha systemprompt denge or context denge result me jo hame pageContent mila usko string bna denge, yaha basically RAG k bases per context feed ker dia
    const SYSTEM_PROMPT = `
     ypu are an helpfull AI Assistant who answeres the user query based on the avalible context from PDF files.

     Rule:
         if user ask for greeting so first greed okay.
         when user ask questions about pdf then answer.
         when user ask anything else tell user that ask question about only pdf
         if user dont ask about related about pdf tehn dont show references ok only show when user ask about pdf.

     Context: 
      ${JSON.stringify(result)}
    `;
    // ab Groq Ai call krenge
    const chatResult = await groqClient.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {role: 'system', content: SYSTEM_PROMPT},
        {role: 'user', "content": userQuery}
      ]

    });
      //  ab hum res me frontend ko kia kia bej re he Ai ne kia message diya or reference docs b
    return res.json({
      message: chatResult.choices[0].message.content, //Ai ne kia message di wo de re he
      docs: result, // kia kia references use kiye wo b de dia
    });

});
// ends here


// for multer file upload
// ek single pdf file aega yaha
// isko queue me b dal denge
app.post('/upload/pdf', upload.single('pdf'), async (req, res) =>{

  //queue add krenge name denge or data denge isko json me denge
  await queue.add('file-ready', JSON.stringify({ 
    filename: req.file.originalname, //file ka name diya
    destination: req.file.destination, //uski destination denge
    path: req.file.path, // sath path b 

  }));
  // queue me ye sab add kar dia ab ye inqueue hute jainge

    return res.json({message: 'uploaded'})

});

app.listen(8000, () => 
    console.log(`Server Started On Port: ${8000}`)
)

