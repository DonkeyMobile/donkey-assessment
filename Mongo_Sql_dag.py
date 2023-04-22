from airflow import DAG
from airflow.operators.python import PythonOperator
# from airflow.operators.python_operator import PythonOperator
from datetime import datetime, timedelta
from pymongo import MongoClient
import mysql.connector
import pymongo

# Define MongoDB and MySQL connections
MONGO_CONN_ID = 'Mongoid'
MONGO_DB = 'donkey_mobile_db'
MONGO_COLLECTION = 'groups' 
# MONGO_COLLECTION = 'posts' 
MYSQL_CONN_ID = 'Mysql'
MYSQL_TABLE = 'ChurchGroups'
MYSQL_COLUMNS = ['Id', 'ChurchId', 'Name']
# MYSQL_COLUMNS = ['Id', 'groupId', 'creatorId','type','message','reatedAt']

# client['donkey_mobile_db']

# Function to extract data from MongoDB
def extract_from_mongo():
    client = pymongo.MongoClient("mongodb://admin:password@localhost:27017",authSource= 'admin')
    db = client[MONGO_DB]
    collection = db[MONGO_COLLECTION]
    return list(collection.find())


# Function to load data into MySQL
def load_into_mysql():
    client = mysql.connector.connect(
        host='Localhost',
        user='admin ',
        password='password',
        database='donkey_mobile_db'
    )
    cursor = client.cursor()
    data = extract_from_mongo()
    for document in data:
        values = []
        for column in MYSQL_COLUMNS:
            values.append(str(document[column]))
        query = "INSERT INTO {} ({}) VALUES ({})".format(
            MYSQL_TABLE,
            ", ".join(MYSQL_COLUMNS),
            ", ".join(["%s"] * len(MYSQL_COLUMNS))
        )
        cursor.execute(query, tuple(values))
    client.commit()


# Define the DAG
default_args = {
    'owner': 'Harold',
    'depends_on_past': False,
    'start_date': datetime(2023, 4, 16),
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

dag = DAG(
    dag_id='mongo_to_mysql',
    default_args=default_args,
    # schedule_interval='0 0 * * *'  # Run once a day at midnight
)


# Define the operators
extract_operator = PythonOperator(
    task_id='extract_from_mongo',
    python_callable=extract_from_mongo,
    dag=dag,
    op_kwargs={'Mongoid': MONGO_CONN_ID}
)

load_operator = PythonOperator(
    task_id='load_into_mysql',
    python_callable=load_into_mysql,
    dag=dag,
    op_kwargs={'Mysql': MYSQL_CONN_ID}
)


# Set the order of the tasks
extract_operator >> load_operator
