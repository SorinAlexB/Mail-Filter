from transformers import pipeline
from PIL import Image
import os

classifier = pipeline("image-classification", model="google/vit-base-patch16-224")

def classify_violence(image_path):
    try:
        image = Image.open(image_path)
        
        results = classifier(image)
        
        violent_keywords = [
            "gun", "knife", "weapon", "blood", "fire", "explosion", "rifle", 
            "pistol", "sword", "bullet", "bomb", "shooting", "attack", "fight",
            "violence", "assault", "wound", "injury", "battle", "combat", 
            "military", "soldier", "war", "terrorist", "crime"
        ]
        
        for result in results:
            label = result['label'].lower()
            score = result['score']
            
            for keyword in violent_keywords:
                if keyword in label and score > 0.25:
                    return "violent", result
        
        return "normal", results[0]
    
    except Exception as e:
        return f"Error: {str(e)}", None

def process_folder(folder_path, output_file="results.txt"):
    with open(output_file, "w") as f:
        f.write("Filename,Classification,Confidence,Label\n")
        
        for filename in os.listdir(folder_path):
            if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif')):
                image_path = os.path.join(folder_path, filename)
                classification, result = classify_violence(image_path)
                
                if result:
                    f.write(f"{filename},{classification},{result['score']:.4f},{result['label']}\n")
                    print(f"{filename}: {classification} ({result['label']} - {result['score']:.4f})")
                else:
                    f.write(f"{filename},{classification},0,Error\n")
                    print(f"{filename}: {classification}")
    
    print(f"Results saved to {output_file}")

def test_single_image(image_path):
    classification,_= classify_violence(image_path)
    return classification
    