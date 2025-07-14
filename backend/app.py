from flask import Flask, request, jsonify
import paho.mqtt.publish as publish

app = Flask(__name__)

@app.route('/api/control', methods=['POST'])
def control():
    data = request.get_json()
    publish.single("greenhouse/control", data['command'], hostname="broker.hivemq.com")
    return jsonify({"status": "OK", "command": data['command']})

@app.route('/api/status', methods=['GET'])
def status():
    return jsonify({
        "watertank": "1200ml",
        "nutrient1": "300ml",
        "nutrient2": "450ml"
    })

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)