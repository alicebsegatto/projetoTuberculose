from flask import Flask, jsonify
from flask_cors import CORS
from app.routes.predicao import bp as predicao_bp

app = Flask(__name__)
app.register_blueprint(predicao_bp)

CORS(app)

@app.route('/', methods=['GET'])
def hello_world():
    return jsonify({"message": "API Tuberculose rodando!"})

if __name__ == '__main__':
    app.run(debug=True)