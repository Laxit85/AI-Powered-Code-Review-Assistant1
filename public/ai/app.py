from flask import Flask, request, jsonify
from code_analyzer import analyze_code

app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    code = data.get('code')

    verdict, feedback = analyze_code(code)
    return jsonify({"verdict": verdict, "feedback": feedback})

if __name__ == '__main__':
    app.run(port=5000)
