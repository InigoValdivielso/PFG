from sqlalchemy import ForeignKey, MetaData, Table, Column
from sqlalchemy.sql.sqltypes import Integer, String
from config.db import meta, engine

meta = MetaData()

requisitos = Table("requisitos_curso", meta, Column("curso_id", Integer, ForeignKey("curso.id"), primary_key=True), 
              Column("requisito_id", Integer, ForeignKey("curso.id"), primary_key=True ))

meta.create_all(engine)