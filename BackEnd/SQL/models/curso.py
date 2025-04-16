from sqlalchemy import MetaData, Table, Column, Text
from sqlalchemy.sql.sqltypes import Integer, String
from config.db import meta



curso = Table("curso", meta, 
              Column("id", Integer, primary_key=True, autoincrement=True), 
              Column("nombre", String(255)), 
              Column("descripcion", Text), 
              Column("duracion", String(255)) )

