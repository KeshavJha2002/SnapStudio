import os
from logger import log_event

IMG_POST_DIR = "images/uploads"
IMG_PROCESSED_DIR = "images/processed"

def setup_image_folder(user_id):
  try:
    upload_dir_name = os.path.join(IMG_POST_DIR, user_id)
    os.makedirs(upload_dir_name, exist_ok=True)
    log_event(user_id, f"Upload folder for the client {user_id} is created")

    processed_dir_name = os.path.join(IMG_PROCESSED_DIR, user_id)
    os.makedirs(processed_dir_name, exist_ok=True)
    log_event(user_id, f"Processed folder for the client {user_id} is created")
  except OSError as e:
    print(f"Failed to create directory : {e}")


if __name__ == "__main__":
  DIR_NAME = "test_user"
  setup_image_folder(DIR_NAME)