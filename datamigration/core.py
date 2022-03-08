'''
공통 핵심함수
'''
import os
import pandas as pd
from abc import ABCMeta, abstractmethod

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

'''
file read
'''
def read_files(directory_name) :
  print(BASE_DIR)
  file_names = os.listdir(f"{BASE_DIR}/{directory_name}")

  if len(file_names) > 0 :
    return pd.read_csv(f"{BASE_DIR}/{directory_name}/{file_names[0]}")
  else :
    return None

'''
select query
'''
def search_data(tablename, cursor, options = None) :
  try :
    query = f"SELECT * FROM {tablename}"

    if options is not None :
      query += " WHERE"
      for idx, option in enumerate(options) :
        query += f" {option}" if idx == 0 else f" AND {option}"

    cursor.execute(query)
    perm = cursor.fetchall()
    return perm , None

  except Exception as ex:
      return None, ex
    
'''
Base Class
'''
class BaseClass(metaclass=ABCMeta) :

    @abstractmethod
    def load_data(self):
        pass  
    
    def read_data(self, directory) :
      return read_files(directory)
