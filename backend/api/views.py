from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .models import Server, Service, Metric
from .serializers import ServerSerializer, ServiceSerializer, MetricSerializer

# Create your views here.

class ServerViewSet(viewsets.ModelViewSet):
    queryset = Server.objects.all()
    serializer_class = ServerSerializer

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class MetricViewSet(viewsets.ModelViewSet):
    queryset = Metric.objects.all()
    serializer_class = MetricSerializer
