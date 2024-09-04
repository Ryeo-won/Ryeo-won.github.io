# orders/models.py
from django.db import models

class Order(models.Model):
    order_list = models.JSONField() 
    current_url = models.URLField() 
    total_price = models.IntegerField() 
    takeout_option = models.CharField(max_length=10) 
    created_at = models.DateTimeField(auto_now_add=True)  

    def __str__(self):
        return f"Order {self.id} at {self.created_at}"