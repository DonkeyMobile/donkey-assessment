import pymongo
import mysql.connector as sql


### Create connection to MongoDb
client = pymongo.MongoClient("mongodb://admin:password@localhost:27017",authSource= 'admin')

db = client['donkey_mobile_db']


cursor = db.list_collection_names()

col = db['groups']
doc = col.find({})

### Create connection to SQl
conn = sql.connect(
  host="localhost",
  user="admin",
  password="password",
  database="donkey_mobile_db"
)
cursor = conn.cursor()


## create ChurchGroups table
cursor.execute("Drop table ChurchGroups ") #drop table if it exists
cursor.execute('''
		CREATE TABLE ChurchGroups (
			id nvarchar(50) primary key,
			churchId nvarchar(50),
			name nvarchar(100)
			)
               ''')


##### Migrate data in groups (mongodb) to Church groups (sql)
cursor1= conn.cursor()

for i in doc:
    id = i.get("_id")
    name = i.get("name")
    churchid= i.get("churchId")
    # cursor.execute( """Insert into ChurchGroups (id,ChurchId,name) VALUES (%s,%s,%s)""",(str(id),str(churchid),name.encode('utf-8').decode('latin-1')))
    # query = "Insert into ChurchGroups (id,churchid,name) values"+'('+str(id)+","+str(churchid)+",'"+name.encode('utf-8').decode('latin-1')+"')"
    query = "Insert into ChurchGroups (id,churchid,name) values(%s,%s,%s)"
    command = cursor1.execute(query,(str(id),str(churchid),name.encode('utf-8').decode('latin-1')))
    # print('Inserted record '+str(i))
    
conn.commit()


 

### Migrate data from posts (Mongodb) to posts (sql) 
post_col = db['posts']
post_doc = post_col.find({})
cursor = conn.cursor(buffered=True)


# Create Posts table 
cursor.execute("Drop table Posts ") #drop table if it exists
cursor.execute('''
		CREATE TABLE Posts (
		id nvarchar(50) primary key,
		groupId nvarchar(50),
		creatorId nvarchar(50),
        type nvarchar(20),
        message TEXT CHARACTER SET utf8 COLLATE utf8_general_ci,
        createdAt  datetime)
        ''')

cursor1= conn.cursor()

for i in post_doc:
    id = i.get("_id")
    groupId = i.get("groupId")
    creatorId= i.get("creatorId")
    type= i.get("type")
    # if i.get("message") == None:
    #     message= i.get("message")
    # else:
    #     message= i.get("message").encode('utf-8').decode('latin-1')
    message= i.get("message")
    createdAt= i.get("createdAt")
    # cursor.execute( """Insert into ChurchGroups (id,ChurchId,name) VALUES (%s,%s,%s)""",(str(id),str(churchid),name.encode('utf-8').decode('latin-1')))
    # query = "Insert into ChurchGroups (id,churchid,name) values"+'('+str(id)+","+str(churchid)+",'"+name.encode('utf-8').decode('latin-1')+"')"
    query = "Insert into Posts (id,groupId,creatorId,type,message,createdAt) values(%s,%s,%s,%s,%s,%s)"
    
    if i.get("message") == None:
        command = cursor1.execute(query,(str(id),str(groupId),str(creatorId),type,message, createdAt))
    else:
        command = cursor1.execute(query,(str(id),str(groupId),str(creatorId),type,message.encode('utf-8').decode('latin-1') ,createdAt))
    # print('Inserted record '+str(i))

conn.commit()  



#### Top 3 Most Active  Groups  with number of Posts
cursor.execute("""select a.name,a.id, count(b.groupid) as Posts from   ChurchGroups a left join (select * from Posts where type = 'GROUP' ) b 
               on a.id = b.groupId
               group by a.name,a.id 
               order by count(b.groupid) desc limit 3 """)
print('Top 3 most active Groups ')
for i in cursor:
  print(i) 


#### Top 3 Most User Active Users with number of Posts
cursor.execute("""select  creatorId,count(*) as Posts  from Posts where type = 'User' 
               group by creatorId
               order by count(*)  desc limit 3""")
print('Top 3 most active users ')
for i in cursor:
  print(i) 

