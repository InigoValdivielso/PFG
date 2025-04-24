from sqlalchemy import ForeignKey, MetaData, Table, Column
from sqlalchemy.sql.sqltypes import Integer, String
from config.db import meta
from models.curso import curso
from models.credencial import credencial



solicitud_doc = Table("solicitud_doc", meta, 
                Column('id_solicitud', Integer, ForeignKey('solicitud.id'), primary_key=True),
                Column('id_credencial', String(255), ForeignKey('credencial.id'), primary_key=True))
                