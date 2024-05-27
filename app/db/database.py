from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

from ..config.environment import env

engine = create_engine(env.DB_URL, echo=env.DEBUG)

Session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))
