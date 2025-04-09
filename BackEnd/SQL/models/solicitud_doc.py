from sqlalchemy import ForeignKey, MetaData, Table, Column
from sqlalchemy.sql.sqltypes import Integer, String
from config.db import meta, engine

meta = MetaData()

solicitud_doc = Table("solicitud_doc", meta, Column("id_solicitud", Integer, ForeignKey("solicitud.id", ondelete="CASCADE")), Column("id_credencial", Integer, ForeignKey("credencial.id", ondelete="CASCADE")))

meta.create_all(engine)