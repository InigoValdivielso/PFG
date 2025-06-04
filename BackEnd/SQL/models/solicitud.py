from sqlalchemy import ForeignKey, MetaData, Table, Column, Enum
import enum
from sqlalchemy.sql.sqltypes import Integer, String
from config.db import meta
from models.curso import curso
from models.persona import persona

class EstadoSolicitudEnum(enum.Enum):
    pendiente = "pendiente"
    aceptada = "aceptada"
    rechazada = "rechazada"

solicitud = Table("solicitud", meta, 
                Column("id", Integer, primary_key=True, autoincrement=True), 
                Column("id_curso", Integer, ForeignKey("curso.id", ondelete="CASCADE")), 
                Column("id_persona", Integer, ForeignKey("persona.id", ondelete="CASCADE")),
                Column("estado", Enum(EstadoSolicitudEnum), nullable=False))
                

