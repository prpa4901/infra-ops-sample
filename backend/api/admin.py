from django.contrib import admin
from .models import Server, Service, Metric

# Register your models here.

admin.site.register(Server)
admin.site.register(Service)
admin.site.register(Metric)
