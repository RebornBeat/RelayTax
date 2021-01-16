from django.shortcuts import render
from django.contrib.auth import authenticate, login
from .models import User, Questions, Personal, Upload
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

def index(request):
    return render(request, 'userLR/index.html')

@login_required(login_url='/login')
def portal(request):
    current_user = request.user
    context = {}
    # Check if user completed first step
    try:
        q = Questions.objects.get(user=current_user).data
        context['Question'] = q
    except:
        pass
    # Check if user completed second step
    try:
        a = Personal.objects.get(user=current_user).data
        context['Personal'] = a 
    except:
        pass
    try:
        u = Upload.objects.get(user=current_user).data
        context['Upload'] = u
    except:
        pass
    return render(request, 'userLR/portal.html', {'context': context})

def portal_question(request):
    # Save questions under user model
    if request.method =="POST":
        new_request = json.loads(request.body.decode('utf-8'))
        current_user = request.user
        try:
            Questions.objects.create(data=new_request, user=current_user)
        except:
            pass
    return JsonResponse({'details': "accepted"})

def portal_personal(request):
    # Save personal under user model
    if request.method =="POST":
        new_request = json.loads(request.body.decode('utf-8'))
        current_user = request.user
        try:
            Personal.objects.create(data=new_request, user=current_user)
        except:
            pass
    return JsonResponse({'details': "accepted"})

def portal_upload(request):
    # Save file under user model
    if request.method =="POST":
        new_request = request.body.decode('utf-8')
        current_user = request.user
        try:
            Upload.objects.create(data=new_request, user=current_user)
        except:
            pass
    return JsonResponse({'details': "accepted"})

def portal_login(request):
    return render(request, 'userLR/login.html')

def portal_register(request):
    return render(request, 'userLR/register.html')

@csrf_exempt
def login_user(request):
    if request.method =="POST":
        new_request = json.loads(request.body.decode('utf-8'))
        email = new_request['email']
        password = new_request['password']
        try:
            u = User.objects.get(email=email)
        except:
            return JsonResponse({'details': "no_user"})
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'details': "accepted"})
        else:
            return JsonResponse({'details': "pass_failed"})
        
@csrf_exempt
def register_user(request):
    if request.method =="POST":
        new_request = json.loads(request.body.decode('utf-8'))
        first_name = new_request['fname']
        last_name = new_request['lname']
        email = new_request['email']
        password = new_request['password']
        re_password = new_request['re_password']
        if password == re_password:
            try:
                u = User.objects.get(email=email)
                return JsonResponse({'details': "in_use"})
            except:
                User.objects.create_user(first_name=first_name, last_name=last_name, email=email, password=password)
                user = authenticate(request, email=email, password=password)
                if user is not None:
                    login(request, user)
                    return JsonResponse({'details': "accepted"})
        else:
            return JsonResponse({'details': "pass_failed"})