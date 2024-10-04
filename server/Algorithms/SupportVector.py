import sys
import pandas as pd
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import seaborn as sns
import matplotlib.pyplot as plt
from PIL import Image, ImageDraw, ImageFont

file_path = sys.argv[1]
data = pd.read_csv(file_path)

# Clean the data
data_cleaned = data.drop(columns=['Roll No.', 'Name'])

# Encode categorical variables using one-hot encoding
data_encoded = pd.get_dummies(data_cleaned, drop_first=True)

# Define features (X) and target (y)
X = data_encoded.drop(columns=['CGPA'])
y = pd.cut(data_encoded['CGPA'], bins=[0, 6, 8, 10], labels=['Low', 'Medium', 'High'])

# Fill missing values
X = X.fillna(0)

# Initialize the SVM model
model = SVC(kernel='linear', random_state=42)

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model.fit(X_train, y_train)

# Predict on test data
y_pred = model.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred)
conf_matrix = confusion_matrix(y_test, y_pred)

# Save terminal output as image
output_text = f"Accuracy: {accuracy:.4f}\n\nClassification Report:\n{report}"

# Create image of text output
font = ImageFont.load_default()
image = Image.new('RGB', (800, 400), color=(255, 255, 255))
draw = ImageDraw.Draw(image)
draw.text((10, 10), output_text, fill=(0, 0, 0), font=font)
image.save("outputs/SVM_Terminal_Output.png")

# Plot confusion matrix
plt.figure(figsize=(8, 6))
sns.heatmap(conf_matrix, annot=True, fmt='d', cmap='Blues', cbar=False)
plt.title('Confusion Matrix')
plt.xlabel('Predicted')
plt.ylabel('Actual')

# Save plot as image
plt.savefig("outputs/SVM_Confusion_Matrix.png")
plt.show()

# Combine the terminal output and plot into one image
terminal_output = Image.open("outputs/SVM_Terminal_Output.png")
plot_image = Image.open("outputs/SVM_Confusion_Matrix.png")

combined_image = Image.new('RGB', (max(terminal_output.width, plot_image.width), terminal_output.height + plot_image.height))
combined_image.paste(terminal_output, (0, 0))
combined_image.paste(plot_image, (0, terminal_output.height))

# Save the combined image
combined_image.save("outputs/SupportVector_Final_Output.png")
