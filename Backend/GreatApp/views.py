from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    @action(detail=False, methods=["get"])
    def featured(self, request):
        """Retrieve only featured categories"""
        featured_categories = Category.objects.filter(is_featured=True)
        serializer = self.get_serializer(featured_categories, many=True)
        return Response(serializer.data)

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(is_available=True)  # Get only available products
    serializer_class = ProductSerializer

    def get_queryset(self):
        """Filter products by category if a query parameter is provided"""
        queryset = super().get_queryset()
        category_id = self.request.query_params.get("category")
        if category_id:
            queryset = queryset.filter(category_id=category_id)
        return queryset
