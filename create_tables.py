import mysql.connector as sql

## connec to Mysql

conn = sql.connect(
  host="localhost",
  user="admin",
  password="password",
  database="donkey_mobile_db"
)
cursor = conn.cursor()


# create ChurchGroup table
# cursor.execute("Drop table ChurchGroups ") # drop if it exists
cursor.execute('''
		CREATE TABLE ChurchGroups (
			id nvarchar(50) primary key,
			churchId nvarchar(50),
			name nvarchar(100)
			)
               ''')





# create ChurchGroup table
# cursor.execute("Drop table Posts ") # drop if it exists
cursor.execute('''
		CREATE TABLE Posts (
			id nvarchar(50) primary key,
			groupId nvarchar(50),
			creatorId nvarchar(50),
      type nvarchar(20),
      message TEXT CHARACTER SET utf8 COLLATE utf8_general_ci,
      reatedAt  datetime
			)
      ''')


