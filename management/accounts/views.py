import json

from django.contrib.auth import login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import User


def add_cors_headers(response, request):
    origin = request.headers.get("Origin")
    if origin:
        response["Access-Control-Allow-Origin"] = origin
        response["Access-Control-Allow-Credentials"] = "true"
        response["Vary"] = "Origin"
    else:
        response["Access-Control-Allow-Origin"] = "*"

    response["Access-Control-Allow-Methods"] = "POST, OPTIONS, GET"
    response["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-CSRFToken"
    return response


@csrf_exempt
def signup(request):
    if request.method == "OPTIONS":
        return add_cors_headers(JsonResponse({"status": "ok"}), request)
    if request.method != "POST":
        return add_cors_headers(JsonResponse({"error": "Only POST requests are allowed"}, status=405), request)

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return add_cors_headers(JsonResponse({"error": "Invalid JSON"}, status=400), request)

    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""
    role = (data.get("role") or "organizer").strip()

    if not name or not email or not password:
        return add_cors_headers(JsonResponse({"error": "Name, email and password are required"}, status=400), request)

    if len(password) < 8:
        return add_cors_headers(JsonResponse({"error": "Password must be at least 8 characters"}, status=400), request)

    valid_roles = ["organizer", "attendee", "community_builder"]
    if role not in valid_roles:
        return add_cors_headers(JsonResponse({"error": "Invalid role"}, status=400), request)

    if User.objects.filter(email=email).exists():
        return add_cors_headers(JsonResponse({"error": "An account with this email already exists"}, status=400), request)

    username = email.split("@")[0] + str(User.objects.count() + 1)
    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
        name=name,
        role=role,
    )

    login(request, user)

    return add_cors_headers(JsonResponse(
        {
            "message": f"Welcome to Gatherly, {name.split()[0]}!",
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role,
            },
        },
        status=201,
    ), request)


@csrf_exempt
def signin(request):
    if request.method == "OPTIONS":
        return add_cors_headers(JsonResponse({"status": "ok"}), request)

    if request.method != "POST":
        return add_cors_headers(JsonResponse({"error": "Only POST requests are allowed"}, status=405), request)

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return add_cors_headers(JsonResponse({"error": "Invalid JSON"}, status=400), request)

    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""
    remember = data.get("remember", False)

    if not email or not password:
        return add_cors_headers(JsonResponse({"error": "Email and password are required"}, status=400), request)

    user = User.objects.filter(email=email).first()
    if user is None or not user.check_password(password):
        return add_cors_headers(JsonResponse({"error": "Invalid email or password"}, status=401), request)

    if not user.is_active:
        return add_cors_headers(JsonResponse({"error": "This account is inactive"}, status=403), request)

    login(request, user)

    if not remember:
        request.session.set_expiry(0)

    return add_cors_headers(JsonResponse(
        {
            "message": "You are signed in. Welcome back to Gatherly!",
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role,
            },
        }
    ), request)


@csrf_exempt
def signout(request):
    if request.method == "OPTIONS":
        return add_cors_headers(JsonResponse({"status": "ok"}), request)

    if request.method != "POST":
        return add_cors_headers(JsonResponse({"error": "Only POST requests are allowed"}, status=405), request)

    logout(request)
    return add_cors_headers(JsonResponse({"message": "You have been logged out successfully."}), request)


def current_user(request):
    if request.method == "OPTIONS":
        return add_cors_headers(JsonResponse({"status": "ok"}), request)

    if not request.user.is_authenticated:
        return add_cors_headers(JsonResponse({"authenticated": False, "user": None}, status=401), request)

    return add_cors_headers(JsonResponse(
        {
            "authenticated": True,
            "user": {
                "id": request.user.id,
                "name": request.user.name,
                "email": request.user.email,
                "role": request.user.role,
            },
        }
    ), request)
