"""
product Data ETL
"""
from dataclasses import replace
import database
import re

from core import *

class Product(BaseClass):
  def __init__(self) :
    self.pd_data = self.read_data("product")

  def __del__(self) :
    print("delete class : Product")

  def load_data(self):
    if self.pd_data is None :
      return Exception("The data does not exist")

    # 졍규식 compile
    rex = re.compile("([ㄱ-ㅎ가-힣]*[1-9]*.*[ml]?[g]?)\s?[/]\s?([0-9+,?]*[ㄱ-ㅎ|가-힣]*)")

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
        
        # extinction = 0 if 단종포함 else 1
        # 걸러내는 규칙이 간단하기 때문에 Regex보다 split과 contain을 사용하여 처리하는것이 효율적으로 처리하려고 했으나
        # 2g/2.5g, 1~3호3.5g/4~6호4.5g <- 이러한 놈들이 있다 그렇기 때문에 정규식으로..해줘야한다
        # price ->  capacity / price
        # 가격미정 -> 그냥 가격미정 , capaciry / 가격미정
        extinction = 0 if "단종" in row["name"] else 1
        regStr = rex.match(row["price"])
        price = 0 if regStr.group(2) == '가격미정' else regStr.group(2).translate(regStr.group(2).strip().maketrans({ '원':'' , ',':'' }))
        capacity = regStr.group(1).strip()

        cursor.execute(f'INSERT INTO product (product_num, name, img_url, brand, average_rating, capacity, price, extinction) \
                   VALUES ("{row["product_num"]}","{row["name"]}","{row["img_url"]}","{row["brand"]}", "{row["average_rating"]}", "{capacity}", {price}, {extinction})')
        
      con.commit()
      print(f'product table - commit()')
    except Exception as ex:
      con.rollback()
      return ex
    finally:
      print("Dabase Connection Close")
      con.close()

    return None
