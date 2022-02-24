import secrets
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
import json
import os

BASE_DIR=os.path.dirname(os.path.abspath(__file__))
SECRET_FILE=os.path.join(BASE_DIR,'secrets.json')
secrets=json.loads(open(SECRET_FILE).read())

DB=secrets["DB"]
env=os.environ

# user=os.getenv("MYSQL_USER")
# password=os.getenv("MYSQL_PASSWORD")
# host=os.getenv("MYSQL_HOST")
# port=os.getenv("MYSQL_PORT",default=3306)
# database=os.getenv("MYSQL_DATABASE")

DB_URL=f"mysql+pymysql://{DB['user']}:{DB['password']}@{DB['host']}:{DB['port']}/{DB['database']}?charset=utf8"
#DB_URL=f"mysql+pymysql://{user}:{password}@{host}:{port}/{database}?charset=utf8"

engine=create_engine(
    DB_URL,encoding='utf-8'
)

SessionLocal=sessionmaker(autocommit=False,autoflush=False,bind=engine)

Base=declarative_base()