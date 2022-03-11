from ast import Str
import numpy as np
from flask import Flask , request,jsonify
import json
from flask_cors import CORS, cross_origin
from joblib import load
import pickle

# Set-ExecutionPolicy Unrestricted -Scope Process
# env\Scripts\activate

clf = load('./model/modelfinal.joblib') 
# clf = load('./model/model0.joblib') 
# clf = pickle.loads('./finalized_model.sav') 

app=Flask(__name__)
CORS(app)
cors = CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})

@app.route("/")
def main():
    return 'main'

#http://127.0.0.1:5000/predict/?val[]=22&val[]=15&val[]=9&val[]=22&val[]=15&val[]=9&val[]=22&val[]=15&val[]=9
@app.route("/predict/")
def predict():
    #loaded_model = pickle.load(open(r'E:\SBME\Elec\git\Indoor Localization\finalized_model.sav', 'rb'))
    values=request.args.getlist('val[]')
    # pred=[[0,-53,0,-78,-87,-80,0,-60,-79]] #  ==> 2
    # pred=[[-88,-64,0,-79,0,-77,0,-81,-55]]   #  ==> 1
    pred=[]
    for i in values:
        pred.append(float(i))
    print(values)
    print(pred)
    # result = loaded_model.predict(pred)
    result = clf.predict([pred])
    print(result)
    ############# Predict Here ##################
    # return jsonify(result[0])
    return "done"


#http://localhost:5000/localize
@app.route("/localize")
def localize():
    # label = {'value':predict}
    return jsonify(value = predict)
    # return json.dumps(label)

@app.route('/post', methods=['POST'])
def post():
    global predict
    # loaded_model = pickle.load(open(r'E:\SBME\Elec\git\Indoor Localization\finalized_model.sav', 'rb'))
    if request.method == 'POST':
        requested_data = request.get_json()
        data =([requested_data["value"]])
        print(data)
        # result = loaded_model.predict(data)
        result = clf.predict(data)
        if(result):
            print("Here ==>", result)
        else:
            print('error')
        predict=result.tolist()[0]
        #result={"loc":str(result[0])}
        # return  jsonify(result[0])
        return str(predict)


if __name__ == "__main__":
    app.run(host='192.168.188.174', port= 8000, debug=True)
    # app.run(host='172.28.130.54', port= 8000, debug=True)
    # app.run(port=8000,debug=True)