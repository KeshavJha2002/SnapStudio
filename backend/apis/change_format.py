from logger import log_event
import os
from image_processing import change_image_format as cif

IMG_POST_DIR = "images/uploads"
IMG_PROCESSED_DIR = "images/processed"

async def change_image_format(session_id, target, files):
  processed_images = []
  uploaded_dir = os.path.join(IMG_POST_DIR, session_id)
  try:
    # push in the uploaded
    for file in files:
      file_path = os.path.join(uploaded_dir, file.filename)
      with open(file_path, "wb") as buffer:
        buffer.write(await file.read())
    # change the format
    for file in files:
      processed_image_info = cif(session_id, file.filename, target)
      processed_images.append(processed_image_info)
      log_event(session_id, f"Converted {file.filename} -> {target} for {session_id} successfully")
    return {"processed_images": processed_images}
  except Exception as e:
    log_event(session_id, f"Failed to process files: {str(e)}")
    return {"error": str(e)}