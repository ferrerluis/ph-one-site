import peewee

db = peewee.SqliteDatabase('members.db')

class BaseModel(peewee.Model):
	class Meta:
		database = db

class Member(BaseModel):
	first_name = peewee.CharField(max_length=30)
	last_name = peewee.CharField(max_length=30)
	email = peewee.CharField(max_length=50, unique=True)
	phone = peewee.CharField(max_length=20, unique=True)
	academic_level = peewee.CharField(max_length=10)
	gender = peewee.CharField(max_length=15, null=True)
	race = peewee.CharField(null=True)
	news = peewee.BooleanField(default=True)
	heard = peewee.CharField(max_length=30)

class Role(BaseModel):
	name = peewee.CharField(max_length=30)
	member = peewee.ForeignKeyField(Member)

class Event(BaseModel):
	name = peewee.CharField(max_length=10)
	device = peewee.CharField(max_length=10)
