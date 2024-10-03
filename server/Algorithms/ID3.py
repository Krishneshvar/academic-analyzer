import sys
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, fbeta_score
import matplotlib.pyplot as plt
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.feature_selection import RFE

file_path = sys.argv[1]
file_path = file_path
data = pd.read_csv(file_path)

# Drop non-informative columns (Roll No., Name)
data_cleaned = data.drop(columns=['Roll No.', 'Name'])

# Encode categorical variables using one-hot encoding
data_encoded = pd.get_dummies(data_cleaned, drop_first=True)

# Separate features (X) and target (y)
X = data_encoded.drop(columns=['CGPA'])

# Define a threshold to convert CGPA into binary classification (pass/fail based on a threshold CGPA like 7.0)
threshold = 7.0
y_class = np.where(data_encoded['CGPA'] >= threshold, 1, 0)  # 1 for passing, 0 for failing

# Fill missing values with 0
X = X.fillna(0)

# Initialize the models
models = {
    'Random Forest': RandomForestClassifier(random_state=42),
    'SVC': SVC(kernel='linear', random_state=42),
    'Decision Tree': DecisionTreeClassifier(random_state=42),
    'ID3': DecisionTreeClassifier(criterion='entropy', random_state=42)  # ID3 represented by using 'entropy' criterion
}

# Define the number of top features to select
n_features_to_select = 6

# Store metrics
results = {'Model': [], 'Accuracy': [], 'Precision': [], 'Recall': [], 'F2 Score': []}

# Perform RFE for each model and evaluate
for name, model in models.items():
    # Perform Recursive Feature Elimination (RFE) for all models
    rfe = RFE(estimator=model, n_features_to_select=n_features_to_select)
    rfe = rfe.fit(X, y_class)
    X_selected = X.loc[:, rfe.support_]
    
    # Split the data into training and testing sets (80% training, 20% testing)
    X_train, X_test, y_train, y_test = train_test_split(X_selected, y_class, test_size=0.2, random_state=42)
    
    # Train the model
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    
    # Evaluate the model
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred)
    recall = recall_score(y_test, y_pred)
    f2 = fbeta_score(y_test, y_pred, beta=2)
    
    results['Model'].append(name)
    results['Accuracy'].append(accuracy)
    results['Precision'].append(precision)
    results['Recall'].append(recall)
    results['F2 Score'].append(f2)

# Convert results to DataFrame
results_df = pd.DataFrame(results)

# Plot Accuracy, Precision, Recall, and F2 Score for each model
plt.figure(figsize=(14, 8))

# Accuracy
plt.subplot(2, 2, 1)
plt.bar(results_df['Model'], results_df['Accuracy'], color='green')
plt.xlabel('Model')
plt.ylabel('Accuracy')
plt.title('Accuracy Comparison')

# Precision
plt.subplot(2, 2, 2)
plt.bar(results_df['Model'], results_df['Precision'], color='blue')
plt.xlabel('Model')
plt.ylabel('Precision')
plt.title('Precision Comparison')

# Recall
plt.subplot(2, 2, 3)
plt.bar(results_df['Model'], results_df['Recall'], color='red')
plt.xlabel('Model')
plt.ylabel('Recall')
plt.title('Recall Comparison')

# F2 Score
plt.subplot(2, 2, 4)
plt.bar(results_df['Model'], results_df['F2 Score'], color='yellow')
plt.xlabel('Model')
plt.ylabel('F2 Score')
plt.title('F2 Score Comparison')

plt.tight_layout()
plt.show()

# Identify and print the best model based on F2 Score
best_model_index = results_df['F2 Score'].idxmax()
best_model = results_df.iloc[best_model_index]

print("\nBest Model Based on F2 Score:")
print(f"Model: {best_model['Model']}")
print(f"Accuracy: {best_model['Accuracy']:.4f}")
print(f"Precision: {best_model['Precision']:.4f}")
print(f"Recall: {best_model['Recall']:.4f}")
print(f"F2 Score: {best_model['F2 Score']:.4f}")
