from django.urls import path
from .views import ProductListCreateView

urlpatterns = [
    path('products/', ProductListCreateView.as_view(), name='product-list-create'),
    path('user-option/', ProductListCreateView.as_view(), name='product-list-create'),

]
