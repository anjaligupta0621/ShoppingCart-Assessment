from django.urls import path
from .views import product_list, cart_list, add_to_cart, clear_cart

urlpatterns = [
    path('products/', product_list, name='product-list'),
    path('cart/', cart_list, name='cart-list'),
    path('cart/add/', add_to_cart, name='add-to-cart'),
    path('cart/clear/', clear_cart, name='clear-cart'),  
]
