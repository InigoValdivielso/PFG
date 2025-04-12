from sqlalchemy import ForeignKey, MetaData, Table, Column
from sqlalchemy.sql.sqltypes import Integer, String
from config.db import meta, engine

meta = MetaData()

estudiante_curso = Table("estudiante_curso", meta, 
                         Column("estudiante_id", Integer, ForeignKey("estudiante.NIA")), 
                         Column("curso_id", Integer, ForeignKey("curso.id"))
)

meta.create_all(engine)
