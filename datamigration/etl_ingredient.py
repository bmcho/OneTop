"""
ingredient Data ETL
"""
import database

from core import *

class Ingredient(BaseClass):
  def __init__(self) :
    self.pd_data = self.read_data("Ingredient")

  def __del__(self) :
    print("delete class : Ingredient")

  def load_data(self):

    if self.pd_data is None :
      return Exception("The data does not exist")

    con = database.MysqlPool()
    try :
      for idx, row in self.pd_data.iterrows() :
        cursor = con.cursor()
        data, ex = search_data("ingredient", cursor, [f"ko_ingredient = '{row['ko_ingredient']}'"])
        
        if ex is not None :
          raise(ex)

        if data is not None :
          continue

        cursor.execute(f'INSERT INTO ingredient (ko_ingredient, en_ingredient, `use`, score) \
                   VALUES ("{row["ko_ingredient"]}","{row["en_ingredient"]}","{row["use"]}","{row["score"]}")')

      
      con.commit()
      print(f' ingredient table - commit()')
    except Exception as ex:
      con.rollback()
      return ex
    finally:
      print("Dabase Connection Close")
      con.close()

    return None
