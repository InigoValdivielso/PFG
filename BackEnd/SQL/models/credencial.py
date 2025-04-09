from sqlalchemy import ForeignKey, MetaData, Table, Column
from sqlalchemy.sql.sqltypes import Integer, String
from config.db import meta, engine

meta = MetaData()

credencial = Table("credencial", meta, Column("id", Integer, primary_key=True))

meta.create_all(engine)