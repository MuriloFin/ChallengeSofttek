import dotenv from 'dotenv';

import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI } from "@langchain/google-genai"; 
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";


dotenv.config();

export async function llmGemini(ask){

    const loader = new DocxLoader('documents/contextRAG.docx'); 
    const docs = await loader.load();


    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });

    const splits = await textSplitter.splitDocuments(docs);


    const vectorStore = await MemoryVectorStore.fromDocuments(
        splits,
        new GoogleGenerativeAIEmbeddings({ model: "models/embedding-001" }) 
    );


    const retriever = vectorStore.asRetriever();


    const template = `
                    Ao ser questionado sobre sua identidade, diga que seu nome é Helptek.
                    Você é um assistente cuja tarefa é responder questões de maneira clara e didática.

                    **Instruções:**
                    1. **Use o contexto fornecido abaixo para formular sua resposta.** Concentre-se nas informações mais relevantes e úteis para responder à pergunta.
                    2. **Se você não sabe a resposta com certeza com base no contexto, informe que você não sabe informando que não informações sobre isso na sua base de dados.**
                    3. **Seja conciso, mas completo.** Forneça detalhes suficientes para que a resposta seja informativa e útil, sem adicionar informações irrelevantes.
                    4. **Formato de Resposta:** Use parágrafos curtos ou listas, conforme apropriado, para garantir clareza e facilidade de leitura. Inclua exemplos ou detalhes adicionais quando necessário para melhorar a compreensão.

                    **CONTEXTO:**
                    {context}
                    **CONTEXTO FIM**

                    **Pergunta:** {question}

                    **Resposta Útil:**
                    `;


    const customRagPrompt = PromptTemplate.fromTemplate(template);



    const llm = new ChatGoogleGenerativeAI({
    
        model: "gemini-1.5-flash", 
        temperature: 0.7,
    
    });

    const ragChain = await createStuffDocumentsChain({
        llm,
        prompt: customRagPrompt,
        outputParser: new StringOutputParser(),
    });
    
    
    const question =  ask;
    const context = await retriever.invoke(question);
    
    
    const response = await ragChain.invoke({
      question: question,
      context: context,
    });
  
    return response ;
    

};



