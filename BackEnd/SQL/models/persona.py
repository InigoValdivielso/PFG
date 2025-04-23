from sqlalchemy import ForeignKey, MetaData, Table, Column
from sqlalchemy.sql.sqltypes import Integer, String, Date
from config.db import meta




persona = Table("persona", meta, 
                Column("id", Integer, primary_key=True, autoincrement=True), 
                Column("nombre", String(255)),
                Column("primer_apellido", String(255)),
                Column("segundo_apellido", String(255)),
                Column("correo", String(255)),
                Column("dni", String(255)),
                Column("fecha_nacimiento", Date))
