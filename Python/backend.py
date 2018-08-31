from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/write', methods=['POST']) 
def write():
    phrase = request.form.get("phrase")
    count = len(open("storage.txt").readlines())
    with open("storage.txt","a") as f:
        f.write(phrase)
        f.write('\n')
    return jsonify(id=count)

@app.route('/read', methods=['GET'])
def read(): 
    data = {}
    with open("storage.txt","r") as f:
        content = f.readlines()  
    data['phrases'] = [{'id': idx, 'phrase':x.strip()} for idx, x in enumerate(content)] 
    return jsonify(data)

@app.route('/delete/<line_number>', methods=['DELETE'])
def delete(line_number):
    result = False
    infile = open('storage.txt','r').readlines()
    with open('storage.txt','w') as outfile:
        for idx, line in enumerate(infile):
            if idx != int(line_number):
                outfile.write(line)
            else:
                result=True
    return jsonify(success=result)

if __name__ == '__main__':
    import os
    if not os.path.exists('storage.txt'):
        with open('storage.txt', 'w'): pass

    app.run(port=8080, debug=True)