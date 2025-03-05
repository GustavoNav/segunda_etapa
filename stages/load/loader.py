import os
import pymongo

import pandas as pd

from errors.load_error import LoadError
from dotenv import load_dotenv
from pymongo import MongoClient
from sqlalchemy import create_engine, Table, MetaData
from sqlalchemy.dialects.postgresql import insert


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
            metadata = MetaData()

            vendas_table = Table('vendas', metadata, autoload_with=engine)

            data_dict = data.to_dict(orient='records')

            with engine.connect() as conn:
                with conn.begin():
                    for record in data_dict:
                        stmt = insert(vendas_table).values(record)
                        stmt = stmt.on_conflict_do_nothing(index_elements=['id_venda'])
                        conn.execute(stmt)

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
            collection = db["vendas"]

            data_dict = data.to_dict(orient='records')

            for record in data_dict:
                record["_id"] = record.pop("id_venda")
                try:
                    collection.insert_one(record)
                except pymongo.errors.DuplicateKeyError:
                    pass
            
            client.close()

        except Exception as exception:
            raise LoadError(str(exception))
