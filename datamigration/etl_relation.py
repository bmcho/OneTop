"""
ingredient Data ETL
"""
import database

from core import *
from util import *

# stopWatch = StopWatch()

class Relation(BaseClass):
  def __init__(self) :
    self.pd_data = self.read_data("relation")

  def __del__(self) :
    print("delete class : Relation")

  def set_igredientID(self, x, data):
      return data[x]

  def load_data(self):
    # stopWatch.start()
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
      #   '''
      #   해당 csv 파일에는 `ingredient` 의 id가 없는 상태
      #   `ingredient` Table의 id를 가지고 와야한다
      #   self.pd_data > 주데이터
      #   data_ingre > 추가해야 할 데이터
      #   '''
      data_ingre, ex = search_data("ingredient", cursor)
      # 성분명 : id dictonary
      dict_ingre = dict([(i['ko_ingredient'], i['id']) for i in data_ingre])
      self.pd_data['ingredient_id'] = self.pd_data['ko_ingredient'].apply(self.set_igredientID, data=dict_ingre)

      for idx, row in self.pd_data.iterrows() :
        #데이터양이 너무많아..
        # data, ex = search_data("productingredientrelation", cursor, [f"ko_ingredient = '{row['ko_ingredient']}'"])
        # if ex is not None :
        #   raise(ex)
        # if len(data) != 0 :
        #   continue

        cursor.execute(f'INSERT INTO productingredientrelation (product_id, ingredient_id) \
                   VALUES ("{row["product_id"]}","{row["ingredient_id"]}")')

      con.commit()
      print(f'ingredient table - commit')
    except Exception as ex:
      con.rollback()
      print(ex)
      return ex
    finally:
      print("Dabase Connection Close")
      con.close()
      # print(stopWatch.stop())

    return None