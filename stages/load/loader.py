import pandas as pd
import os

from errors.load_error import LoadError
from dotenv import load_dotenv
from pymongo import MongoClient
from sqlalchemy import create_engine


class Loader:
    def __init__(self):
        load_dotenv()

        self.pg_username = os.getenv('DB_USER')
        self.pg_password = os.getenv('DB_PASS')
        self.pg_host = os.getenv('DB_HOST', 'localhost')
        self.pg_port = os.getenv('DB_PORT', '5432')
        self.pg_database = os.getenv('DB_NAME', 'vendas')

        self.mongo_username = os.getenv('MONGO_USER')
        self.mongo_password = os.getenv('MONGO_PASS')
        self.mongo_host = os.getenv('MONGO_HOST', 'localhost')
        self.mongo_port = os.getenv('MONGO_PORT', '27017')
        self.mongo_database = os.getenv('MONGO_DB', 'vendas')

    def load_to_postgres(self, data: pd.DataFrame) -> None:
        try:
            connection_string = f'postgresql://{self.pg_username}:{self.pg_password}@{self.pg_host}:{self.pg_port}/{self.pg_database}'
            engine = create_engine(connection_string)

            data.to_sql('clientes', con=engine, if_exists='append', index=False)

        except Exception as exception:
            raise LoadError(str(exception))

    def load_to_mongo(self, data: pd.DataFrame) -> None:
        try:
            mongo_uri = (
                f"mongodb://{self.mongo_username}:{self.mongo_password}@{self.mongo_host}:{self.mongo_port}/"
                if self.mongo_username and self.mongo_password else
                f"mongodb://{self.mongo_host}:{self.mongo_port}/"
            )
            
            client = MongoClient(mongo_uri)
            db = client[self.mongo_database]

            data_dict = data.to_dict(orient='records')

            collection = db["clientes"]
            collection.insert_many(data_dict)

            client.close()

        except Exception as exception:
            raise LoadError(str(exception))