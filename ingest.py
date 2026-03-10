import os
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from dotenv import load_dotenv
from langchain_pinecone import PineconeVectorStore
from pinecone import Pinecone, ServerlessSpec
from langchain_huggingface import HuggingFaceEmbeddings


load_dotenv()


PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_ENV=os.getenv("PINECONE_ENV")
PINECONE_INDEX=os.getenv("PINECONE_INDEX")


document = PyPDFLoader("").load()

print(f"This is the length of the document : {len(document)}")

for doc in document :
     doc.metadata["source"] = "  "


# spliting

splitter = RecursiveCharacterTextSplitter(
      chunk_size=1200,
    chunk_overlap=200
)



chunks = splitter.split_documents(document)

print(f"This is the chunks length :  {len(chunks)}")


embeddings = HuggingFaceEmbeddings(
    model_name="BAAI/bge-small-en-v1.5"
)

print("Embedding model ready!")


pc = Pinecone(api_key=PINECONE_API_KEY)


vectorstore = PineconeVectorStore.from_documents(
    chunks,
    embeddings,
    index_name=PINECONE_INDEX
)


print("Data Ingestion Over ")







