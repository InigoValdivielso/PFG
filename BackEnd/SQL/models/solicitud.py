from sqlalchemy import ForeignKey, MetaData, Table, Column
from sqlalchemy.sql.sqltypes import Integer, String
from config.db import meta
from models.curso import curso
from models.persona import persona



solicitud = Table("solicitud", meta, 
                Column("id", Integer, primary_key=True, autoincrement=True), 
                Column("id_curso", Integer, ForeignKey("curso.id", ondelete="CASCADE")), 
                Column("id_solicitud_doc", String(255), ForeignKey("credencial.id", ondelete="CASCADE")),
                Column("id_persona", Integer, ForeignKey("persona.id", ondelete="CASCADE")),
                Column("estado", String(255)))
                

