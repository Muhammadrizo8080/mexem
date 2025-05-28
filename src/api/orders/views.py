from rest_framework import generics, mixins
from rest_framework.permissions import IsAuthenticated
from api.permissions import IsAuthenticatedUser
from main.models import Order
from .serializers import OrderSerializer

class OrderListCreateView(mixins.ListModelMixin,
                          mixins.CreateModelMixin,
                          generics.GenericAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    # permission_classes = [IsAuthenticatedUser]

    def get(self, request, *args, **kwargs):
        return self.list(request)

    def post(self, request, *args, **kwargs):
        return self.create(request)
