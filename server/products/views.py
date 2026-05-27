from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import RegisterSerializer


@api_view(['GET'])
def test_api(request):
    return Response({
        "message": "ShopIQ Backend Working Successfully 🚀"
    })


@api_view(['POST'])
def register_user(request):

    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

        return Response({
            "message": "User registered successfully"
        })

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from .models import Product
from .serializers import ProductSerializer


@api_view(['GET'])
def get_products(request):

    products = Product.objects.all()

    serializer = ProductSerializer(products, many=True)

    return Response(serializer.data)