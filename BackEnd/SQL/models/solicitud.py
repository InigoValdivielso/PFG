from sqlalchemy import ForeignKey, MetaData, Table, Column
from sqlalchemy.sql.sqltypes import Integer, String
from config.db import meta, engine
from models.curso import curso


meta = MetaData()

solicitud = Table("solicitud", meta, 
                Column("id", Integer, primary_key=True, autoincrement=True), 
                Column("id_curso", Integer, ForeignKey("curso.id", ondelete="CASCADE")), 
                Column("id_solicitud_doc", Integer),
                Column("estado", String(255)),
                Column("did", String(255)))

meta.create_all(engine)