from sqlalchemy import ForeignKey, MetaData, Table, Column
from sqlalchemy.sql.sqltypes import Integer, String
from config.db import meta, engine

meta = MetaData()

solicitud = Table("solicitud", meta, Column("id", Integer, primary_key=True), Column("id_curso", Integer, ForeignKey("curso.id", ondelete="CASCADE")), Column("did", String(255), nullable=False))

meta.create_all(engine)