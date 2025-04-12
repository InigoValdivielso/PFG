from sqlalchemy import ForeignKey, MetaData, Table, Column
from sqlalchemy.sql.sqltypes import Integer, String
from config.db import meta, engine

meta = MetaData()

credencial = Table("credencial", meta, Column("id", String, primary_key=True), Column("estudiante_id", Integer, ForeignKey("estudiante.NIA")))

meta.create_all(engine)