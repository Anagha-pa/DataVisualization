from django.db import models

# Create your models here.

class Products(models.Model):
    sr_no = models.IntegerField()
    item_name = models.CharField(max_length=100)
    mrp_price = models.DecimalField(max_digits=10, decimal_places=2)
    total_stock = models.IntegerField()
    sold_stock = models.IntegerField()
    total_revenue = models.DecimalField(max_digits=10, decimal_places=2)


    def __str__(self):
        return self.item_name