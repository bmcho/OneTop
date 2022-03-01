"""
product Data ETL
"""
from dataclasses import replace
import database

from core import *

class Descrip(BaseClass):
  def __init__(self) :
    self.pd_data = self.read_data("Descrip") 

  def __del__(self) :
    print("delete class : Descrip")

  def load_data(self):

    if self.pd_data is None :
      return Exception("The data does not exist")

    con = database.MysqlPool()
    '''
    double quotes => single quotes 치환
    '''    
    self.pd_data = self.pd_data.str.replace('\"','\'')

    try :
      for idx, row in self.pd_data.iterrows() :
        cursor = con.cursor()
        data, ex = search_data("descrip", cursor, [f'product_num = "{row["product_num"]}"'])
        
        if ex is not None :
          raise(ex)

        if data is not None :
          continue
        
        cursor.execute(f'INSERT INTO descrip (product_num, description, hashtag, color_type, cost, category_large, category_middle, category_small) \
                   VALUES ("{row["product_num"]}","{row["description"]}","{row["hashtag"]}","{row["color_type"]}", "{row["category_large"]}", "{row["category_middle"]}", "{row["category_small"]}")')
      
      con.commit()
      print(f' descrip table - commit()')
    except Exception as ex:
      con.rollback()
      return ex
    finally:
      print("Database Connection Close")
      con.close()

    return None
