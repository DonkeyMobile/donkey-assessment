import mysql.connector as sql


### Create connection to SQl
conn = sql.connect(
  host="localhost",
  user="admin",
  password="password",
  database="donkey_mobile_db"
)
cursor = conn.cursor()



# ### Most Active  Groups 
cursor.execute("""select a.name,a.id, count(b.groupid) as activity from   ChurchGroups a left join (select * from Posts where type = 'GROUP' ) b 
               on a.id = b.groupId
               group by a.name,a.id 
               order by count(b.groupid) desc limit 3 """)
for i in cursor:
  print(i) 


#### Most User Active User  
cursor.execute("""select  creatorId,count(*)  from Posts where type = 'User' 
               group by creatorId
               order by count(*)  desc limit 3""")
for i in cursor:
  print(i) 

