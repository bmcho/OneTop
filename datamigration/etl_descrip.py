"""
product Data ETL
"""
from dataclasses import replace
import database

from core import *

class Descrip(BaseClass):
  def __init__(self) :
    self.pd_data = self.read_data("descrip") 

  def __del__(self) :
    print("delete class : Descrip")

  def load_data(self):
    if self.pd_data is None :
      return Exception("The data does not exist")

    con = database.MysqlPool()

    try :

      '''
      double quotes => single quotes 치환
      backslash -> empty
      '''    
      self.pd_data = self.pd_data.replace(regex={'"':"'", r'\\':""})
      cursor = con.cursor() 
      for idx, row in self.pd_data.iterrows() :

        data, ex = search_data("descrip", cursor, [f'product_num = "{row["product_num"]}"'])
        
        if ex is not None :
          raise(ex)

        if len(data) != 0 :
          continue
        
        cursor.execute(f'INSERT INTO descrip (product_num, description, hashtag, color_type, cost, major_classification, medium_classification, minor_classification) \
                   VALUES ("{row["product_num"]}","{row["description"]}","{row["hashtag"]}","{row["color_type"]}", "{row["cost"]}", "{row["major_classification"]}", "{row["medium_classification"]}", "{row["minor_classification"]}")')

      con.commit()
      print(f'descrip table - commit()')
    except Exception as ex:
      con.rollback()
      print(ex)
      return ex
    finally:
      print("Database Connection Close")
      con.close()

    return None
