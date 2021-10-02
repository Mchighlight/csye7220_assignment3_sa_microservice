from textblob import TextBlob
from flask import Flask, request, jsonify

app = Flask(__name__)
@app.route("/testHealth")
def hello():
    return "Hello from python sentiment analysis flask app!"

@app.route("/analyse/sentiment", methods=['POST'])
def analyse_sentiment():
    sentence = request.get_json()['sentence']
    polarity = TextBlob(sentence).sentences[0].polarity
    return jsonify(
        sentence=sentence,
        polarity=polarity
    )

# use + for spaces, i.e. http://localhost:5000/analyse?sentence=i+am+so+happy!
@app.route("/analyse", methods=['GET'])
def analyse_sentiment_get():
    sentence = request.args.get('sentence')
    polarity = TextBlob(sentence).sentences[0].polarity
    return str(polarity)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)