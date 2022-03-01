"""
ingredient Data ETL
"""
import database

from core import *
from utill import *

# stopWatch = StopWatch()

class Relation(BaseClass):
  def __init__(self) :
    self.pd_data = self.read_data("Relation")

  def __del__(self) :
    print("delete class : Relation")

  def set_igredientID(self, x, data):
    try:
      a = data[data['ko_ingredient']==x].iloc[0]['id']
      print(a)
    except :
      return None

    return a

  def load_data(self):
    if self.pd_data is None :
      return Exception("The data does not exist")
    
    con = database.MysqlPool()

    try :
      cursor = con.cursor()

      data_ingre, ex = search_data("ingredient", cursor)

      df_ingre = pd.DataFrame(columns=['ingredient_id', 'ko_ingredient','1','2','3'], data=data_ingre)
      df_ingre = df_ingre.drop(['1','2','3'], axis=1)

      '''
      해당 csv 파일에는 `ingredient` 의 id가 없는 상태
      `ingredient` Table의 id를 가지고 와야한다
      self.pd_data > 주데이터
      df_data_ingre > 추가해야 할 데이터
      '''
      # stopWatch.start()
      # print(stopWatch.stop())
      self.pd_data['ingredient_id'] = self.pd_data['ko_ingredient'].apply(self.set_igredientID, data=df_ingre)

      print(self.pd_data)
      for idx, row in self.pd_data.iterrows() :
        cursor = con.cursor()
        #데이터양이 너무많아..
        # data, ex = search_data("productingredientrelation", cursor, [f"ko_ingredient = '{row['ko_ingredient']}'"])
        # if ex is not None :
        #   raise(ex)
        # if data is not None :
        #   continue

        cursor.execute(f'INSERT INTO productingredientrelation (product_num, ingredient_id) \
                   VALUES ("{row["product_num"]}","{row["ingredient_id"]}")')
        
        print(f'ingredient table({idx}) : "{row["ko_ingredient"]}"')

      print(f'ingredient table - commit')
      con.commit()
    except Exception as ex:
      con.rollback()
      print(ex)
      return ex
    finally:
      print("Dabase Connection Close")
      con.close()

    return None


Relation().load_data()
