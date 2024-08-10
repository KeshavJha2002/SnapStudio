import os
from logger import log_event

IMG_POST_DIR = "images/uploads"
IMG_PROCESSED_DIR = "images/processed"

def check_valid_user(received_id) -> bool:
  try:
    upload_dir_name = os.path.join(IMG_POST_DIR, received_id)
    processed_dir_name = os.path.join(IMG_PROCESSED_DIR, received_id)
    if os.path.exists(upload_dir_name) and os.path.exists(processed_dir_name):
      log_event(received_id, f"{received_id} <- Received valid session_id for the API call")
      return True
    else: 
      log_event("Invalid User", f"{received_id} <- Received invalid session_id for the API call")
      return False
  except:
    pass

if __name__ == "__main__":
  DIR_NAME = "test_user"
  print(check_valid_user(DIR_NAME))