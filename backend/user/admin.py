from django.contrib import admin

# Register your models here.
from django.apps import AppConfig
from .models import Profile
admin.site.register(Profile)

class UserConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'user'


