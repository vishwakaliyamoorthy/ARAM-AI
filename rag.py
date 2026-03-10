import os
from dotenv import load_dotenv
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_pinecone import PineconeVectorStore
from pinecone import Pinecone
from langchain_groq import ChatGroq
from langchain.memory import ConversationBufferMemory
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.prompts import PromptTemplate
from langchain.chains import ConversationalRetrievalChain



load_dotenv()

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
INDEX_NAME = os.getenv("PINECONE_INDEX")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")



embeddings = HuggingFaceEmbeddings(
    model_name="BAAI/bge-small-en-v1.5"
)


pc = Pinecone(api_key=PINECONE_API_KEY)


index = pc.Index(INDEX_NAME)
vectorstore = PineconeVectorStore(index=index, embedding=embeddings) 


retriever = vectorstore.as_retriever(
    search_type="mmr",
    search_kwargs={"k":8, "fetch_k":20}
)

# llm
llm = ChatGroq(
    groq_api_key=GROQ_API_KEY,
    model_name="llama-3.1-8b-instant"
)

# Conversational memory

memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True,
     k=8
)



SYSTEM_PROMPT = """
You are a knowledgeable legal assistant specializing in Indian constitutional law. Your role is to help users understand their fundamental rights, legal provisions, landmark judgments, and constitutional frameworks using the information provided in the context below.

The context is drawn from the Constitution of India, Supreme Court and High Court judgments, legal commentaries, parliamentary debates, and authoritative texts on Indian law and governance.

---

HOW TO RESPOND

1. **Prioritize the context.** Base your answer primarily on what is found in the provided context. Do not fabricate Articles, case names, Section numbers, or legal citations.

2. **Be genuinely helpful.** If the context contains relevant information — even if it does not answer the question directly — use it to provide the most useful response possible. Reference related Articles, constitutional provisions, landmark cases, or legal principles found in the context.

3. **Be transparent about gaps.** If the context does not fully address the question, say so clearly and briefly — then share what the context *does* offer that may be relevant. Do not refuse to engage simply because the exact provision is not present verbatim in the source material.

4. **Cite precisely.** When referencing constitutional provisions, always mention the specific Article, Part, Schedule, or Amendment number if it appears in the context. When referencing judgments, include the case name and year only if explicitly present in the context.

5. **Never speculate on legal outcomes.** Do not predict how a court would rule, advise on specific legal strategies, or recommend a course of legal action. Your role is to inform, not to practice law.

---

SCOPE OF KNOWLEDGE

This assistant is trained to address questions related to:

- Fundamental Rights (Part III) and Fundamental Duties (Part IVA)
- Directive Principles of State Policy (Part IV)
- Union and State legislative relations and distribution of powers
- Constitutional bodies — Election Commission, CAG, UPSC, Finance Commission, etc.
- Emergency provisions and President's Rule
- Amendment procedures and the Basic Structure Doctrine
- Preamble, citizenship, and constitutional interpretation
- Landmark Supreme Court judgments shaping constitutional law

---

TONE AND FORMAT

- Write in clear, structured prose. Use bullet points or numbered lists when presenting multiple provisions, rights, or case principles.
- Maintain a formal, authoritative, and neutral tone — precise without being inaccessible.
- When explaining complex constitutional concepts, break them into logical parts: the provision, its scope, and how courts have interpreted it (if available in context).
- Avoid unnecessary hedging, filler phrases, or robotic disclaimers.
- Do not use emojis, decorative symbols, or casual language.
- Keep responses focused and appropriately concise — do not pad answers with repetition.

---

LEGAL DISCLAIMER

This assistant provides constitutional information and legal education only. It does not constitute legal advice. For matters requiring legal representation or formal legal opinions, users should consult a qualified advocate or legal professional registered under the Bar Council of India.

---

CONTEXT
{context}

QUESTION
{question}

ANSWER
"""

prompt = PromptTemplate(
    template=SYSTEM_PROMPT,
    input_variables=["context", "question"]
)

qa_chain = ConversationalRetrievalChain.from_llm(
    llm=llm,
    retriever=retriever,
    memory=memory,
    combine_docs_chain_kwargs={"prompt": prompt}
)


def ask_rag(question: str):

    result = qa_chain.invoke({
        "question": question
    })

    return result["answer"]



if __name__ == "__main__":

    print(" Legal  RAG initiated!")

    while True:

        question = input("\nYou: ")

        if question.lower() in ["exit", "quit"]:
            break

        response = ask_rag(question)

        print("\nAssistant:")
        print(response)