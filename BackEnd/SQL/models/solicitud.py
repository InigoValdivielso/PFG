from sqlalchemy import ForeignKey, MetaData, Table, Column
from sqlalchemy.sql.sqltypes import Integer, String
from config.db import meta, engine

meta = MetaData()

solicitud = Table("solicitud", meta, 
                Column("id", Integer, primary_key=True, autoincrement=True), 
                Column("id_curso", Integer, ForeignKey("curso.id", ondelete="CASCADE")), 
                Column("id_solicitud_doc", Integer),
                Column("estado", String(255)),
                Column("did_estudiante", String(255), ForeignKey("estudiante.did", ondelete="CASCADE")))

meta.create_all(engine)