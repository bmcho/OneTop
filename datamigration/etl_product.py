"""
product Data ETL
"""
from dataclasses import replace
import database

from core import *

class Product(BaseClass):
  def __init__(self) :
    self.pd_data = self.read_data("Product")

  def __del__(self) :
    print("delete class : Product")

  def load_data(self):

    if self.pd_data is None :
      return Exception("The data does not exist")

    con = database.MysqlPool()

    '''
    double quotes => single quotes 치환
    '''    
    self.pd_data["name"] = self.pd_data["name"].str.replace('\"','\'')
    try :
      for idx, row in self.pd_data.iterrows() :
        cursor = con.cursor()
        data, ex = search_data("product", cursor, [f'product_num = "{row["product_num"]}"'])
        
        if ex is not None :
          raise(ex)

        if data is not None :
          continue
        
        cursor.execute(f'INSERT INTO product (product_num, name, img_url, brand, average_rating, price, extinction) \
                   VALUES ("{row["product_num"]}","{row["name"]}","{row["img_url"]}","{row["brand"]}", "{row["rating"]}", "{row["price"]}", 1)')
        
      
      con.commit()
      print(f' product table - commit()')
    except Exception as ex:
      con.rollback()
      return ex
    finally:
      print("Dabase Connection Close")
      con.close()

    return None
