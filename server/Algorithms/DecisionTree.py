import sys
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.feature_selection import RFE
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import matplotlib.pyplot as plt
import seaborn as sns
from PIL import Image, ImageDraw, ImageFont

file_path = sys.argv[1]
data = pd.read_csv(file_path)

# Clean the data
data_cleaned = data.drop(columns=['Roll No.', 'Name'])

# Encode categorical variables using one-hot encoding
data_encoded = pd.get_dummies(data_cleaned, drop_first=True)

# Convert the target variable 'CGPA' into discrete classes
y = pd.cut(data_encoded['CGPA'], bins=[0, 6, 8, 10], labels=['Low', 'Medium', 'High'])

# Separate the features (X)
X = data_encoded.drop(columns=['CGPA'])

# Fill missing values with 0
X = X.fillna(0)

# Initialize the Decision Tree Classifier with entropy criterion (ID3)
model = DecisionTreeClassifier(criterion='entropy', random_state=42)

# Perform Recursive Feature Elimination (RFE) to select top 6 features
rfe = RFE(estimator=model, n_features_to_select=6)
rfe = rfe.fit(X, y)

# Select the features identified by RFE
X_selected = X.loc[:, rfe.support_]

# Split the dataset: 20% for training, 80% for testing
X_train, X_test, y_train, y_test = train_test_split(X_selected, y, test_size=0.8, random_state=42)

# Train the model
model.fit(X_train, y_train)

# Predict on the test set
y_pred = model.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred)

# Save terminal output as image
output_text = f"Selected Features: {list(X_selected.columns)}\n\nAccuracy: {accuracy}\n\nClassification Report:\n{report}"

# Create image of text output
font = ImageFont.load_default()
image = Image.new('RGB', (800, 400), color=(255, 255, 255))
draw = ImageDraw.Draw(image)
draw.text((10, 10), output_text, fill=(0, 0, 0), font=font)
image.save("outputs/ID3_Terminal_Output.png")

# Convert the categorical predictions back to CGPA midpoints for visualization
y_test_cgpa = y_test.map({'Low': 5, 'Medium': 7, 'High': 9})
y_pred_cgpa = pd.Series(y_pred).map({'Low': 5, 'Medium': 7, 'High': 9})

# Plot predicted vs. actual CGPA
plt.figure(figsize=(12, 6))
plt.scatter(y_test_cgpa, y_pred_cgpa, alpha=0.7)
plt.xlabel('Actual CGPA (midpoints)')
plt.ylabel('Predicted CGPA (midpoints)')
plt.title('Predicted vs Actual CGPA (ID3 Classifier)')
plt.tight_layout()

# Save plot as image
plt.savefig("outputs/ID3_Actual_vs_Predicted.png")

# Combine the terminal output and plot images into one
terminal_output = Image.open("outputs/ID3_Terminal_Output.png")
plot_image = Image.open("outputs/ID3_Actual_vs_Predicted.png")

combined_image = Image.new('RGB', (max(terminal_output.width, plot_image.width), terminal_output.height + plot_image.height))
combined_image.paste(terminal_output, (0, 0))
combined_image.paste(plot_image, (0, terminal_output.height))

# Save the combined image
combined_image.save("outputs/DecisionTree_Final_Output.png")
