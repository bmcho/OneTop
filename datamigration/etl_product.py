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
        
        #걸러내는 규칙이 간단하기 때문에 Regex보다 split과 contain을 사용하여 처리하는것이 효율적 
        # extinction = 0 if 단종포함 else 1
        # price ->  capacity / price
        extinction = 0 if "단종" in row["name"] else 1
        price_split = row["price"].split("/")
        price = price_split[1].translate(price_split[1].strip().maketrans({ '원':'' , ',':'' }))

        cursor.execute(f'INSERT INTO product (product_num, name, img_url, brand, average_rating, capaciry, price, extinction) \
                   VALUES ("{row["product_num"]}","{row["name"]}","{row["img_url"]}","{row["brand"]}", "{row["average_rating"]}", "{price_split[0]}", {price}, {extinction})')
        
      con.commit()
      print(f'product table - commit()')
    except Exception as ex:
      con.rollback()
      return ex
    finally:
      print("Dabase Connection Close")
      con.close()

    return None
