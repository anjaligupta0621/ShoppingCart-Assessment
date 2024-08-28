from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json

products = [
    {'name': 'Ball Pen', 'quantity': 10, 'price': 10},
    {'name': 'Pencil', 'quantity': 10, 'price': 20},
    {'name': 'Notebook', 'quantity': 5, 'price': 15},
]

cart = []

# View to return the list of products
def product_list(request):
    return JsonResponse(products, safe=False)

# View to return the current state of the cart
def cart_list(request):
    return JsonResponse(cart, safe=False)

# View to add an item to the cart
@method_decorator(csrf_exempt, name='dispatch')
def add_to_cart(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        product_name = data.get('name')
        quantity = data.get('quantity', 1)

        # Find the product in the products list
        product = next((p for p in products if p['name'] == product_name), None)

        if product and product['quantity'] >= quantity:
            # Check if the item is already in the cart
            cart_item = next((item for item in cart if item['name'] == product_name), None)

            if cart_item:
                # Update quantity if the item is already in the cart
                cart_item['quantity'] += quantity
            else:
                # Add the item to the cart if it's not already there
                cart.append({'name': product_name, 'quantity': quantity, 'price': product['price']})

            # Update the quantity in the products list
            product['quantity'] -= quantity

            return JsonResponse({'message': 'Item added to cart', 'cart': cart}, safe=False)
        else:
            return JsonResponse({'message': 'Product not available or insufficient quantity'}, status=400)

@method_decorator(csrf_exempt, name='dispatch')
def clear_cart(request):
    if request.method == 'POST':
        cart.clear()  # Clear all items in the cart
        return JsonResponse({'message': 'Cart cleared successfully!', 'cart': cart}, safe=False)
