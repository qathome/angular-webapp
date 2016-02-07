from django.shortcuts import render, redirect

def app_index(request, path):
    return render(request, 'app.html')
