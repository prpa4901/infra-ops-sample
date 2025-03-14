from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Server(models.Model):
    name = models.CharField(max_length=100, verbose_name="Server Name")
    hostname = models.CharField(max_length=255, unique=True, verbose_name="Hostname")
    ip_address = models.GenericIPAddressField(unique=True, verbose_name="IP Address")
    
    STATUS_CHOICES = [
        ('running', 'Running'),
        ('stopped', 'Stopped'),
        ('error', 'Error'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='stopped', verbose_name="Status")
    
    SERVER_TYPE_CHOICES = [
        ('web', 'Web Server'),
        ('db', 'Database'),
        ('cache', 'Cache'),
        ('app', 'Application Server'),
        ('other', 'Other'),
    ]
    server_type = models.CharField(max_length=50, choices=SERVER_TYPE_CHOICES, default='other', verbose_name="Server Type")
    
    cpu_usage = models.FloatField(default=0.0, verbose_name="CPU Usage (%)")
    memory_usage = models.FloatField(default=0.0, verbose_name="Memory Usage (%)")
    disk_usage = models.FloatField(default=0.0, verbose_name="Disk Usage (%)")

    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Last Updated")

    def __str__(self):
        return f"{self.name} ({self.ip_address}) - {self.status}"

class Service(models.Model):
    name = models.CharField(max_length=100, verbose_name="Service Name")
    server = models.ForeignKey(Server, on_delete=models.CASCADE, related_name='services')
    
    STATUS_CHOICES = [
        ('running', 'Running'),
        ('stopped', 'Stopped'),
        ('error', 'Error'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='stopped', verbose_name="Status")
    
    port = models.IntegerField(
        null=True, 
        blank=True, 
        validators=[MinValueValidator(0), MaxValueValidator(65535)], 
        verbose_name="Port Number"
    )

    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Last Updated")

    def __str__(self):
        return f"{self.name} on {self.server.name} (Port: {self.port if self.port else 'N/A'})"

class Metric(models.Model):
    server = models.ForeignKey(Server, on_delete=models.CASCADE, related_name='metrics')
    cpu_usage = models.FloatField(verbose_name="CPU Usage (%)")
    memory_usage = models.FloatField(verbose_name="Memory Usage (%)")
    disk_usage = models.FloatField(verbose_name="Disk Usage (%)")
    timestamp = models.DateTimeField(auto_now_add=True, verbose_name="Timestamp")

    class Meta:
        ordering = ['-timestamp']
        verbose_name_plural = "Metrics"

    def __str__(self):
        return f"Metrics for {self.server.name} at {self.timestamp}"
