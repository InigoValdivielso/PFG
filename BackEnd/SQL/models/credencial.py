from sqlalchemy import ForeignKey, MetaData, Table, Column
from sqlalchemy.sql.sqltypes import Integer, String
from models.estudiante import estudiante
from config.db import meta



credencial = Table("credencial", meta, 
                   Column("id", String(255), primary_key=True), 
                   Column("estudiante_id", Integer, ForeignKey("estudiante.NIA", ondelete="CASCADE") ))

