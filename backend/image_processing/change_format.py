from PIL import Image
import os
import json
# from logger import log_event

IMG_POST_DIR = "images/uploads"
IMG_PROCESSED_DIR = "images/processed"

def change_image_format(user_id, image_name, source_type, destination_type):
    try:
        source_image_path = os.path.join(IMG_POST_DIR, user_id, f"{image_name}.{source_type}")
        source_image = Image.open(source_image_path)

        destination_image_path = os.path.join(IMG_PROCESSED_DIR, user_id, f"{image_name}.{destination_type}")
        source_image.save(destination_image_path, destination_type.upper())
        # log_event(user_id, f"Image {image_name}.{source_type} -> {image_name}.{destination_type} successfully.")

        processed_image = Image.open(destination_image_path)

        processed_image_width, processed_image_height = processed_image.size
        processed_file_size = os.path.getsize(destination_image_path) / 1024  # Convert to KB

        response = {
            "user_id": user_id,
            "image_name": image_name,
            "source_type": source_image.format,
            "destination_type": destination_type,
            "width": processed_image_width,
            "height": processed_image_height,
            "file_size_kb": processed_file_size
        }
        return json.dumps(response, indent=4)
    except Exception as e:
        # log_event(user_id, f"Failed to convert image {image_name}.{source_type} -> {image_name}.{destination_type}: {str(e)}")
        return json.dumps({"error": str(e)}, indent=4)

# Example usage
if __name__ == "__main__":
    user_id = "test_user"
    image_name = "personal_pic"
    source_type = "jpg"
    destination_type = "png"
    print(change_image_format(user_id, image_name, source_type, destination_type))
