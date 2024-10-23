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
    Apenas se for questionado por sua identidade, diga que seu nome é Helptek e que você é um assistente cuja tarefa é responder questões de maneira clara e didática.
  
    **Instruções:**
    1. **Use o contexto fornecido abaixo para formular sua resposta.** Concentre-se nas informações mais relevantes e úteis para responder à pergunta.
    2. **Se a pergunta fugir muito do contexto ou você não encontrar a resposta exata, siga os passos abaixo:**
       * **Informe que essas informações não estão no banco de dados:** Avise o usuário que a pergunta está fora do escopo do banco de dados atual.
       * **Sugira termos semelhantes ou reformulações:** Ofereça sugestões de termos de busca ou reformule a pergunta para ser mais relevante ao contexto.
       * **Oriente a verificar o histórico de tickets e utilizar filtro de busca tickets:** Instrua o analista a explorar o histórico de conversas e aplicar filtros para buscar mais informações.
    3. **Se a pergunta for parcialmente relacionada, tente:**
       * **Buscar termos mais específicos ou relevantes:** Ofereça sugestões de termos mais específicos para a busca.
    4. **Seja conciso, mas completo.** Forneça detalhes suficientes para que a resposta seja informativa e útil, sem adicionar informações irrelevantes.
    5. **Personalize a resposta:** Utilize o nome do usuário, se disponível, e ajuste a linguagem de acordo com o contexto.
    6. **Solicite feedback:** Pergunte ao usuário se a resposta foi útil ou se ele precisa de mais informações.

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



