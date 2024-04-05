from rest_framework import serializers
from ..models import Products



class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'

        
class BarGraphSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = ('item_name', 'sold_stock')

class GraphSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = ('item_name', 'sold_stock', 'total_revenue')        