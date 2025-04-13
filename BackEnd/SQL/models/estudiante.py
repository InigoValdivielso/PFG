from sqlalchemy import ForeignKey, MetaData, Table, Column
from sqlalchemy.sql.sqltypes import Integer, String
from config.db import meta, engine
from models.solicitud import solicitud

meta = MetaData()

estudiante = Table("estudiante", meta, 
                Column("NIA", Integer, primary_key=True, autoincrement=True), 
                Column("nombre", String(255)),
                Column("primer_apellido", String(255)),
                Column("segundo_apellido", String(255)),
                Column("correo", String(255)),
                Column("dni", String(255)),
                Column("genero", String(255)),
                Column("did", String(255), ForeignKey("solicitud.did", ondelete="CASCADE")))

meta.create_all(engine)