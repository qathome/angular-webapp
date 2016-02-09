# Angular webapp for QatHome Rest service API

# Overview

Qathome is the latest evolution in queue management and reservation management. It's reliable, fast, scalable, and carefully tested! If you want to know more, [contact us] (http://www.qathome.com/contact)!

This is a freely licensed minimal client to create your queue management / reservation management web-app based on [Qathome API] (http://www.qathome.com/pricing-api). 

# Requirements

* Pip
* Python 2.7 (this release is tested on 2.7.5 only)

    ```
    sudo apt-get install python-pip
    wget http://python.org/ftp/python/2.7.5/Python-2.7.5.tgz
    cd Python-2.7.5
    ./configure
    make
    ```
# Installation

Clone this project and navigate to project folder. Install requirements

    sudo pip install -r requirements.txt

# Setup

1. Create an account to 'manage your queue' on [QatHome] (http://www.qathome.com/accounts/signup/manager)
2. Follow instructions to validate your email and create your firm, until you reach the help page in the queue manager interface
3. Mark yourself as a developer by following the next steps
4. Go to API interface http://www.qathome.com/api/v1/ 
5. Login with your email and password
6. Navigate users list http://www.qathome.com/api/v1/users/
7. Find to your specific user link in the "ulr" field (example http://www.qathome.com/api/v1/users/8/)
8. Go to your user link
9. Mark the "developer" checkbox at the end of the page and click PUT
8. Now you are a QatHome developer
9. Create your application on http://qathome.com/developer/applications/ (link is available for developer users and after login)
10. QatHome follows the django-allauth standards so feel free to choose what you need (Use for example "Client type" = "Public", "Authorization grant type" = "Client credentials", nothing into "redirect uris")
11. Go to project folder and edit `static/src/config.js`:
    ```
    var QATHOME_CLIENT_CONFIG = {
        server: 'http://qathome.com',
        client_id: 'CLIENT_ID',
        client_secret: 'CLIENT_SECRET',
        username: 'USERNAME',
        password: 'PASSWORD',
        firm_id: 'FIRM_ID'
    };
    ```
    * replace string CLIENT_ID, CLIENT_SECRET with your QatHome application client_id and client_secret 
    * replace string USERNAME and PASSWORD with your QatHome account email and password
    * replace string 'FIRM_ID' with the code of your firm.
    
12. Run the application from project root folder:
    ```
    ./manage.py runserver
    ```
