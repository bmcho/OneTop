import base64
import os

# backend
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
# image upload
IMAGE_DIR = BASE_DIR + "/.static"


# base64 형식으로 인코딩
def encoding_base64(filepath):
    # file path가 없다면 바로 None return
    if filepath is None or filepath == "":
        return None
    try:
        with open(os.path.join(BASE_DIR, filepath), "rb") as file:
            base64file = base64.b64encode(file.read())
    except:
        return None

    return base64file


# .static 같은 폴더들 생성 해주는 method
def create_folder():
    if not os.path.isdir(IMAGE_DIR):
        os.mkdir(IMAGE_DIR)
