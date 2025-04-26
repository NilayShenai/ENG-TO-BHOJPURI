from flask import Flask, request, jsonify
from translator import translator
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, allow_headers="*", supports_credentials=True)  # Allow all origins, headers, credentials

@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()
    message = data.get('message', '')
    print(f"[LOG] /translate endpoint hit. Message received: {message}")
    if not message:
        print("[LOG] No message provided in request.")
        return jsonify({'error': 'No message provided'}), 400
    try:
        translation = translator(message)
        print(f"[LOG] Translation result: {translation}")
        return jsonify({'translation': translation})
    except Exception as e:
        print(f"[LOG] Error during translation: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
