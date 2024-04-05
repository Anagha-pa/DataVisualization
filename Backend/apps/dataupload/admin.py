from import_export.admin import ImportExportModelAdmin
from django.contrib import admin
from .models import Products

# Register your models here.

@admin.register(Products)
class ProductsAdmin(ImportExportModelAdmin):
    list_display = ('sr_no', 'item_name', 'mrp_price', 'total_stock', 'sold_stock','total_revenue')