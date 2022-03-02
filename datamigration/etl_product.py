"""
product Data ETL
"""
from dataclasses import replace
import database

from core import *

class Product(BaseClass):
  def __init__(self) :
    self.pd_data = self.read_data("product")

  def __del__(self) :
    print("delete class : Product")

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
        
        data, ex = search_data("product", cursor, [f'product_num = "{row["product_num"]}"'])
        
        if ex is not None :
          raise(ex)

        if len(data) != 0 :
          continue
        
        cursor.execute(f'INSERT INTO product (product_num, name, img_url, brand, average_rating, price, extinction) \
                   VALUES ("{row["product_num"]}","{row["name"]}","{row["img_url"]}","{row["brand"]}", "{row["rating"]}", "{row["price"]}", 1)')
        
      con.commit()
      print(f'product table - commit()')
    except Exception as ex:
      con.rollback()
      return ex
    finally:
      print("Dabase Connection Close")
      con.close()

    return None