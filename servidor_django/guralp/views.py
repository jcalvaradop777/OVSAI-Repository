from django.http import JsonResponse

def get_data(request):
    data = {
        "xArray": ["Italy","France","Spain","USA","Argentina"],
        "yArray": [55, 49, 44, 24, 15]
    }
    return JsonResponse(data)