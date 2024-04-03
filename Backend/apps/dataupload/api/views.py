from django.shortcuts import render
import json
from django.http import JsonResponse
from ..models import Products
from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import Products
from .serializers import *
# Create your views here.


def excel_data_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            columns = data['cols']
            rows = data['rows']

            rows = rows[1:]

            for row in rows:
                product_data = {}
                for i, value in enumerate(row):
                    column_name = columns[i]['name']
                    product_data[column_name] = value
                product = Products(**product_data)
                product.save()
            return JsonResponse({'status':'success'})
        except Exception as e:
            return JsonResponse({'status':'error', 'msg':str(e)}, status=400)
    else:
        return JsonResponse({'status': 'error', 'message': 'Only POST requests are allowed for this endpoint'}, status=405)

                
class TableRepresentationview(APIView):
    def get(self,request):
        try:
            table_data = Products.objects.all()
            serilaizer =  TableDataSerializer(table_data, many=True)
            return Response(serilaizer.data)
        except:
            return Response({'msg': 'Data not found'})
    
    
    