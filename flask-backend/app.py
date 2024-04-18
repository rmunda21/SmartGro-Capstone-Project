from flask import Flask, request, make_response

app = Flask(__name__)

@app.route('/api/login', methods=['POST'])
def login():
    print(request.form['username'])
    return make_response({'message': 'success'}, 200)

if __name__ == '__main__':
    app.run(debug=True)