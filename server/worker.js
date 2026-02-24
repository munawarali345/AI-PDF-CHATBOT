import { Worker } from 'bullmq';
import { QdrantVectorStore } from "@langchain/qdrant";
import { QdrantClient } from "@qdrant/js-client-rest";
import { CohereEmbeddings } from "@langchain/cohere";
import { Document } from "@langchain/core/documents"
// PDF load karne ke liye - fixed for langchain v1
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf" 
// for text spliter
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import 'dotenv/config';


// ye ek worker ba gya
const worker = new Worker(
    'file-upload-queue', // is nam k queue ka ek worker banao
          async job => { // is k under jub koi job ati he wo console.log ker do

              console.log(`Job:`, job.data) // isko parse ker denge
                const data = JSON.parse(job.data) //data parsed

// load the pdf hum pdf ko sab se pehle load krenge
// so yaha path denge k konci pdf ko load kerna he
// then kia karenge iske documents bana denge 
const loader = new PDFLoader(data.path)
const docs = await loader.load()

// Add source metadata to each document
// Yeh important hai taake hum reference mein file ka path use kar sakein
for (const doc of docs) {
    doc.metadata = {
        ...doc.metadata,
        source: data.path, // Full path of uploaded file
        originalFilename: data.filename // Original filename
    };
}
// pdf load done doc ban gye
// docs ek array hai Document objects ka

// docs k chunks bana diye
// ab hamare documents ban gye so ab hum kia karenge k inko chunk karenge
// text-spliter ka use karenge
// splitText() string leta hai, lekin docs array hai
// Isliye splitDocuments() use kia he
const textSplitter = new RecursiveCharacterTextSplitter({ 
    chunkSize: 300, 
    chunkOverlap: 0 
})
const texts = await textSplitter.splitDocuments(docs)
console.log("test step",texts)
// doc chunks works ends here

// ab inko vector db me save kerenge Qdrant me 
// uska clint banga pehle
const Client = new QdrantClient({ url: 'http://localhost:6333'});
// qdrant client ends here

// ab ham embeddings model use krenge hum is k liye openAi ni ye use ker re he cohere-ai
const embeddings = new CohereEmbeddings({
  apiKey: process.env.COHERE_API_KEY,
  model: "embed-english-v3.0",
});
// ends here


// ab vector store banenge 
try {
   
  let  vectorStore // abi declear kia he if blocks me use krenge 
  // pehle check kro existing collection exist karta e k ni 
  const exists = await Client.collectionExists("pdf-docs");
 
  // agar ni bana hua to pehle banao 
  if(!exists) {

       vectorStore = await QdrantVectorStore.fromDocuments( texts, embeddings, {
       url: "http://localhost:6333",
      collectionName: "pdf-docs",
  });
  
   // ni to wai rahe ga jo start me bana tha
  } else {

        console.log(" Existing collection → adding docs");
         vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
          url: "http://localhost:6333",
           collectionName: "pdf-docs",
    });
  }
   await vectorStore.addDocuments(texts);
    console.log(`All ${texts.length} chunks added to Vector store`);

} catch(err) {
  console.error("Worker error:", err);
}

// Docs add kerna - YEH CHANGES: texts use kia hai, docs nahi
// await vectorStore.addDocuments(texts);
// console.log(`All ${texts.length} docs are added to Vector store`) 

}, 
  
 { 
    concurrency: 100, connection: {
    host: 'localhost',
    port: 6379,

 } }
);
// ends here

// ab jub b file upload krenge to worker me console log ana chaiye
// us me hame filename, uski destination or main jo uska path he wo milega
//tp basically hame pora path he chaiye 

// ab pehle path utha lo kese milega path: data.path
// read the pdf from path -> pdf hame path se read kerna he
// then usko chunk krenge chunk the pdf
// then embedding model ko call krenge for every chunk
// then unko qdurat vector db me store krenge
// so ye sare kam to karne he hame ab yahi process he pora

// iske liye hum use krenge Qdurant vector db 
// or abi k liye langchain use krenge then bad me me isko bager langchange k b banunga

// ab hame na subse pehle pdf se document bana he sai he to 
//  hame is pdf ko chunk karna he


