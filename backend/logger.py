import logging
import os

LOG_DIR = "logs"
os.makedirs(LOG_DIR, exist_ok=True)

def setup_logger(user_id):
    logger = logging.getLogger(user_id)
    logger.setLevel(logging.INFO)
    
    log_file = os.path.join(LOG_DIR, f"{user_id}.log")
    file_handler = logging.FileHandler(log_file)
    
    formatter = logging.Formatter('%(asctime)s - %(message)s')
    file_handler.setFormatter(formatter)
    
    if not logger.handlers:  # To prevent adding multiple handlers
        logger.addHandler(file_handler)
    return logger

# -> exposed function
def log_event(user_id, event):
    logger = setup_logger(user_id)
    logger.info(event)

# -> testing function
if __name__ == "__main__":
    user_id = "test_user"
    event = "This is a test event"
    log_event(user_id, event)