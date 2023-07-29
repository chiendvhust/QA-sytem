import json
from flask_cors import CORS
from flask import Flask, request, jsonify
import os
import time
from typing import List

from haystack.document_stores import ElasticsearchDocumentStore
from haystack.nodes import BM25Retriever, FARMReader, SentenceTransformersRanker
from haystack.schema import Document, Answer

from tqdm import tqdm

import logging

# logging.basicConfig(format="%(levelname)s - %(name)s -  %(message)s", level=logging.WARNING)
# logging.getLogger("haystack").setLevel(logging.INFO)
app = Flask(__name__)
CORS(app)

app.config["host"] = "elasticsearch"
app.config["username"] = ""
app.config["password"] = ""
app.config["port"] = "9200"


def convertToDocument(dataSet):
    docs = []
    for context in tqdm(dataSet):
        cur_full_doc = Document(content=context)
        docs.append(cur_full_doc)
    return docs


def query(question, top_k, retriever, ranker, reader) -> List[Answer]:
    candidate_documents = retriever.retrieve(query=question, top_k=100)
    candidate_documents_ranked = ranker.predict(question, candidate_documents, top_k)
    result = reader.predict(
        query=question,
        documents=candidate_documents_ranked,
        top_k=top_k
    )
    sorted_answers = sorted(result['answers'], key=lambda x: x.score, reverse=True)
    return sorted_answers


# logging.INFO(("Star sleep 30s"))
print("Start sleep 30s")
time.sleep(30)
document_index = "document"
document_store = ElasticsearchDocumentStore(host=app.config["host"],
                                            port=app.config["port"],
                                            username=app.config["username"],
                                            password=app.config["password"])
dirname = os.path.dirname(__file__)
filename = os.path.join(dirname, 'db.json')
with open(filename) as f:
    dataBase = json.load(f)
dataDocuments = convertToDocument(dataBase)
document_store.write_documents(dataDocuments, document_index)
retriever = BM25Retriever(document_store)
ranker = SentenceTransformersRanker(model_name_or_path="chiendvhust/cross-encoder-distilroberta-base")
reader = FARMReader(model_name_or_path="chiendvhust/biobert_v1.1_pubmed_squad_v2-finetuned-covidQA",
                    use_gpu=True,
                    max_seq_len=512,
                    context_window_size=5000,
                    use_confidence_scores=False,
                    return_no_answer=True)
top_k = 10

print("running succesfully")

# host = os.environ.get("ELASTICSEARCH_HOST", "localhost")

@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/qa', methods=['POST'])
def qa():
    data = request.get_json()
    question = data.get('question')
    result = query(question, top_k, retriever, ranker, reader)
    answer = result[0]
    jsonFormat = {"answer": answer.answer,
                  "score": answer.score,
                  "context": answer.context,
                  "offsets_in_context": answer.offsets_in_context[0]
                  }

    return jsonify(jsonFormat)




@app.errorhandler(500)
def server_error(e):
    logging.exception('An error occurred during a request.')
    return json.dumps({'status': 'failed', 'message':
        "An internal error occurred: <pre>{}</pre>See logs for full stacktrace."})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8777)
