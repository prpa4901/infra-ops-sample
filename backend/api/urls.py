from django.urls import path, include
from rest_framework import routers
from .views import ServerViewSet, ServiceViewSet, MetricViewSet

router = routers.DefaultRouter()
router.register(r'servers', ServerViewSet)
router.register(r'services', ServiceViewSet)
router.register(r'metrics', MetricViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]