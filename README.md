# SnapStudio

## Project Setup

```bash
# run the following git command to clone the repo
git clone https://github.com/KeshavJha2002/SnapStudio.git
```

### Frontend Setup

```bash
cd frontend
npm i
npm run dev
```

### Backend Setup

```bash
cd backend
# If the virtual environment is not installed, install it
# You can use the below command if you are using python3 and above
apt install python3.10-venv
python3 -m virt virt_env # create the virtual environment
source virt_env/bin/activate # run the virtual environment
pip install -r requirements.txt # install all the necessary libraries
fastapi dev main.py # to run the server in dev mode
fastapi run # to run the server in production mode
```

## Project Structure

### Frontend Structure

### Backend Structure

```code
..backend/
├── apis/
│   ├── __init__.py
│   ├── images.py
│   ├── users.py
│   └── utils.py
├── config/
│   ├── __init__.py
│   └── settings.py
├── images/
│   ├── uploads/
│   └── processed/
├── logs/
│   ├── app.log
├── image_processing/
│   ├── __init__.py
│   ├── change_format.py
│   ├── modify_background.py
│   ├── additional_effects.py
│   ├── filters.py
│   ├── face_detection.py
│   └── smoothening.py
├── tests/
│   ├── __init__.py
│   ├── test_apis.py
│   └── test_image_processing.py
├── utils/
│   ├── __init__.py
│   ├── file_management.py
│   ├── image_helpers.py
│   └── validators.py
├── virt_env/
├── .gitignore
├── main.py
└── requirements.txt
```