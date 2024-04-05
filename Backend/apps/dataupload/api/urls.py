from django.urls import path
from .views import *

urlpatterns = [
    path('data-upload/', DataUploadAPIView.as_view(), name='data_upload'),
    path('table-representation/',TableRepresentationview.as_view(), name='table-representation'),
    path('bar-graph-data',BarGraphData.as_view(), name='bar-graph-data'),
    path('graph-data',GraphData.as_view(), name='graph-data'),
]
