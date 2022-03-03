import pymysql, os

class MysqlPool:
    def __init__(self):
        self.conn = pymysql.connect(
            user = 'root',
            passwd = os.environ["MYSQL_PASSWORD"],
            host = 'database',
            port = 3306,
            db = os.environ["MYSQL_DATABASE"],
            charset = 'utf8mb4'
        )

    def cursor(self):
        return self.conn.cursor(pymysql.cursors.DictCursor)
    
    def commit(self):
        self.conn.commit()
    
    def close(self):
        self.conn.close()

    def rollback(self):
        self.conn.rollback()

