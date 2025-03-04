from rest_framework import viewsets
from .models import Category
from .serializers import CategorySerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.filter(is_featured=True)
    serializer_class = CategorySerializer
