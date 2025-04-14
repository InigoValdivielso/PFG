from sqlalchemy import MetaData, Table, Column
from sqlalchemy.sql.sqltypes import Integer, String
from config.db import meta



curso = Table("curso", meta, 
              Column("id", Integer, primary_key=True, autoincrement=True), 
              Column("nombre", String(255)), 
              Column("descripcion", String(255)), 
              Column("duracion", String(255)) )

