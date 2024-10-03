import sys
import pandas as pd
from sklearn.svm import SVC
from sklearn.feature_selection import RFE
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, fbeta_score
import matplotlib.pyplot as plt
import numpy as np
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

file_path = sys.argv[1]
file_path = file_path
data = pd.read_csv(file_path)

# Clean the data
data_cleaned = data.drop(columns=['Roll No.', 'Name'])

# Encode categorical variables using one-hot encoding
data_encoded = pd.get_dummies(data_cleaned, drop_first=True)

# Separate features (X) and target (y)
X = data_encoded.drop(columns=['CGPA'])

# Define a threshold to convert CGPA into a binary classification (e.g., pass/fail based on a threshold CGPA like 7.0)
threshold = 7.0
y_class = np.where(data_encoded['CGPA'] >= threshold, 1, 0)  # 1 for passing, 0 for failing

# Fill missing values with 0
X = X.fillna(0)

# Initialize the Support Vector Classifier (SVC) model
model = SVC(kernel='linear', probability=True)

# Perform Recursive Feature Elimination (RFE) to select top 6 features
rfe = RFE(estimator=model, n_features_to_select=6)
rfe = rfe.fit(X, y_class)

# Select the features identified by RFE
X_selected = X.loc[:, rfe.support_]

# Split the dataset: 20% for training, 80% for testing
X_train, X_test, y_train, y_test = train_test_split(X_selected, y_class, test_size=0.8, random_state=42)

# Train the model
model.fit(X_train, y_train)

# Predict on the test set
y_pred = model.predict(X_test)
y_pred_prob = model.predict_proba(X_test)[:, 1]

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
f2 = fbeta_score(y_test, y_pred, beta=2)

# Display the selected features and model evaluation metrics
print("Selected Features:", X_selected.columns)
print("Accuracy:", accuracy)
print("Precision:", precision)
print("Recall:", recall)
print("F2 Score:", f2)

# Plot predicted probabilities vs. actual classification
plt.figure(figsize=(12, 6))

# Scatter plot of predicted probabilities vs actual classification (pass/fail)
plt.subplot(1, 2, 1)
plt.scatter(y_test, y_pred_prob, alpha=0.7)
plt.xlabel('Actual Class (Pass=1, Fail=0)')
plt.ylabel('Predicted Probability of Passing')
plt.title('Predicted Probability vs Actual Class')

plt.tight_layout()
plt.show()

# Generate PDF
pdf_file_path = "outputs/ID3_output.pdf"  # Adjust the path as needed
c = canvas.Canvas(pdf_file_path, pagesize=letter)
c.drawString(100, 750, "ID3 Classifier Output")
c.drawString(100, 730, f"Selected Features: {X_selected.columns.tolist()}")
c.drawString(100, 710, f"Accuracy: {accuracy:.4f}")
c.drawString(100, 690, f"Classification Report:\n{report}")

# Save the PDF
c.save()

print(f"Output saved to {pdf_file_path}")
