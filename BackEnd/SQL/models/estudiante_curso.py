from sqlalchemy import ForeignKey, MetaData, Table, Column
from sqlalchemy.sql.sqltypes import Integer, String
from config.db import meta
from models.curso import curso
from models.estudiante import estudiante

estudiante_curso = Table("estudiante_curso", meta, 
                         Column("estudiante_id", Integer, ForeignKey("estudiante.NIA")), 
                         Column("curso_id", Integer, ForeignKey("curso.id")),
                         Column("estado", String(50))
)
