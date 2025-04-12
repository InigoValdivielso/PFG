from sqlalchemy import MetaData, Table, Column
from sqlalchemy.sql.sqltypes import Integer, String
from config.db import meta, engine

meta = MetaData()

curso = Table("curso", meta, Column("id", Integer, primary_key=True, autoincrement=True), 
              Column("nombre", String), Column("descripcion", String), Column("duracion", String) )

meta.create_all(engine)