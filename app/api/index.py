from flask import Flask, request, jsonify
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import LabelEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import os
import json

app = Flask(__name__)

script_dir = os.path.dirname(__file__)  
file_path = os.path.join(script_dir, 'dataset.csv')
df = pd.read_csv(file_path)

X = df.drop('Price', axis=1)
y = df['Price']

le_type = LabelEncoder()
le_location = LabelEncoder()
le_area = LabelEncoder()

X['Type'] = le_type.fit_transform(X['Type'])
X['Location'] = le_location.fit_transform(X['Location'])
X['Area'] = le_area.fit_transform(X['Area'])

preprocessor = ColumnTransformer(
    transformers=[
        ('num', 'passthrough', ['Bath(s)', 'Bedroom(s)']),
        ('cat', 'passthrough', ['Type', 'Location', 'Area'])
    ])

model = Pipeline(steps=[('preprocessor', preprocessor),
                        ('regressor', LinearRegression())])

model.fit(X, y)

def predict_house_price(type, location, area, baths, bedrooms):
    input_data = {'Type': [type],
                  'Location': [location],
                  'Area': [area],
                  'Bath(s)': [baths],
                  'Bedroom(s)': [bedrooms]}
    
    input_df = pd.DataFrame(input_data)
    
    # Preprocess input data
    input_df['Type'] = le_type.transform(input_df['Type'])
    input_df['Location'] = le_location.transform(input_df['Location'])
    input_df['Area'] = le_area.transform(input_df['Area'])
    
    # Predict the price
    predicted_price = model.predict(input_df)
    return predicted_price[0]



@app.route('/api/estimation/calculate', methods=['POST'])
def estimation():
    try:
        data = request.get_json()
        type = data['type']
        location = data['location']
        area = data['area']
        baths = data['bathrooms']
        bedrooms = data['bedrooms']

        print(data)

        predicted_price = predict_house_price(type, location, area, baths, bedrooms)

        response_data = {'price': predicted_price}
        return jsonify(response_data)
    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(port=5328)