import pymysql

class MysqlPool:
    def __init__(self):
        self.conn = pymysql.connect(
            user = 'root',
            passwd = '123456',
            host = 'localhost',
            port = 3306,
            db = 'test',
            charset = 'utf8mb4'
        )

    def cursor(self):
        return self.conn.cursor()
    
    def commit(self):
        self.conn.commit()
    
    def close(self):
        self.conn.close()

    def rollback(self):
        self.conn.rollback()
