import sys
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, fbeta_score, classification_report
import matplotlib.pyplot as plt
from sklearn.tree import DecisionTreeClassifier
from sklearn.feature_selection import RFE
import seaborn as sns
from PIL import Image, ImageDraw, ImageFont

file_path = sys.argv[1]
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

# Initialize the ID3 model
model = DecisionTreeClassifier(criterion='entropy', random_state=42)

# Perform Recursive Feature Elimination (RFE)
rfe = RFE(estimator=model, n_features_to_select=6)
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
report = classification_report(y_test, y_pred)

# Save terminal output as image
output_text = f"Accuracy: {accuracy:.4f}\nPrecision: {precision:.4f}\nRecall: {recall:.4f}\nF2 Score: {f2:.4f}\n\nClassification Report:\n{report}"

# Create image of text output
font = ImageFont.load_default()
image = Image.new('RGB', (800, 400), color=(255, 255, 255))
draw = ImageDraw.Draw(image)
draw.text((10, 10), output_text, fill=(0, 0, 0), font=font)
image.save("outputs/ID3_Terminal_Output.png")

# Plot confusion matrix
plt.figure(figsize=(8, 6))
sns.heatmap(pd.crosstab(y_test, y_pred), annot=True, fmt="d", cmap="Blues", cbar=False)
plt.title("Confusion Matrix")
plt.xlabel("Predicted")
plt.ylabel("Actual")

# Save plot as image
plt.savefig("outputs/ID3_Confusion_Matrix.png")
plt.show()

# Combine terminal output and plot into one image
terminal_output = Image.open("outputs/ID3_Terminal_Output.png")
plot_image = Image.open("outputs/ID3_Confusion_Matrix.png")

combined_image = Image.new('RGB', (max(terminal_output.width, plot_image.width), terminal_output.height + plot_image.height))
combined_image.paste(terminal_output, (0, 0))
combined_image.paste(plot_image, (0, terminal_output.height))

# Save the combined image
combined_image.save("outputs/ID3_Final_Output.png")
