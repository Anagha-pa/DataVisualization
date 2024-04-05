from ..models import Products
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from ..resources import ProductsResource
from tablib import Dataset
from ..models import Products
from .serializers import *
# Create your views here.


# def data_upload(request):
#     if request.method == 'POST':
#         product_resource = ProductsResource()
#         dataset = Dataset()
#         new_product = request.FILES['myfile']

#         imported_data = dataset.load(new_product.read(), format='xlsx')
#         for data in imported_data:
#             value = Products(
#                 data[0],data[1],data[2],data[3],data[4],data[5]
#             )
#             value.save()
#         return HttpResponse("Data upload successfully")
#     else:
#         return HttpResponse("Invalid request method")

class DataUploadAPIView(APIView):
    def post(self, request, format=None):
        product_resource = ProductsResource()
        dataset = Dataset()
        new_product = request.FILES.get('myfile')

        if new_product is None:
            return Response("plz select a file", status=status.HTTP_400_BAD_REQUEST)
        try:
            imported_data = dataset.load(new_product.read(), format='xlsx')
            for data in imported_data:
                serializer = ProductsSerializer(data ={
                    'sr_no': data[0],
                    'item_name': data[1],
                    'mrp_price': data[2],
                    'total_stock': data[3],
                    'sold_stock': data[4],
                    'total_revenue': data[5]
                })
                if serializer.is_valid():
                    serializer.save()
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response("Data uploaded successfully", status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(str(e),status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class TableRepresentationview(APIView):
    def get(self,request):
        try:
            table_data = Products.objects.all()
            serilaizer =  ProductsSerializer(table_data, many=True)
            return Response(serilaizer.data)
        except:
            return Response({'msg': 'Data not found'})
    
class BarGraphData(APIView):
    def get(self, request, format=None):
        products = Products.objects.all()
        serializer = BarGraphSerializer(products, many=True)
        return Response(serializer.data)
    
class GraphData(APIView):    
    def get(self,request, format=None):
        products = Products.objects.all()
        serializer = GraphSerializer(products, many=True)
        return Response (serializer.data)
        

