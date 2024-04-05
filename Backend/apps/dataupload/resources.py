from import_export import resources
from .models import Products


class ProductsResource(resources.ModelResource):
    class Meta:
        model = Products