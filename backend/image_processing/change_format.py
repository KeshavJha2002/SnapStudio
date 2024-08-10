from PIL import Image
import os
from logger import log_event

IMG_POST_DIR = "images/uploads"
IMG_PROCESSED_DIR = "images/processed"

def change_image_format(user_id, image_name, destination_type):
    try:
        name, source_extension = os.path.splitext(image_name)
        source_image_path = os.path.join(IMG_POST_DIR, user_id, f"{image_name}")
        source_image = Image.open(source_image_path)

        destination_image_path = os.path.join(IMG_PROCESSED_DIR, user_id, f"{name}.{destination_type}")
        source_image.save(destination_image_path, destination_type.upper())
        log_event(user_id, f"Image {name}.{source_extension} -> {name}.{destination_type} successfully.")

        processed_image = Image.open(destination_image_path)

        processed_image_width, processed_image_height = processed_image.size
        processed_file_size = os.path.getsize(destination_image_path) / 1024  # Convert to KB

        return {
            "user_id": user_id,
            "image_name": name,
            "source_type": source_extension,
            "destination_type": destination_type,
            "width": processed_image_width,
            "height": processed_image_height,
            "file_size_kb": processed_file_size
        }
    except Exception as e:
        log_event(user_id, f"Failed to convert image {name}.{source_extension} -> {name}.{destination_type}: {str(e)}")
        return {"error": str(e)}

# Example usage
if __name__ == "__main__":
    user_id = "test_user"
    image_name = "personal_pic"
    source_type = "jpg"
    destination_type = "png"
    print(change_image_format(user_id, image_name, destination_type))
