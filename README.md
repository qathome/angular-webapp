# Angular webapp for QatHome Rest service API

# Overview

[Qathome] (http://www.qathome.com) is the latest evolution in queue management and reservation management. It's reliable, fast, scalable, and carefully tested!

This is a freely licensed client to create your queue management / reservation management web-app based on Qathome API. The setup takes less than one hour and your are ready to rebrand QatHome interface, sell this service to others, see some working examples of advanced settings such as multiservice queues, custom calendars, maximum daily tickets limits and so on. 

If you want to know more, [contact us] (http://www.qathome.com/contact)!

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

1. Create an account to manage your queue on [QatHome] (http://www.qathome.com/accounts/signup/manager)
2. Follow instructions to validate your email and create your firm, until you reach the help page in the queue manager interface
3. Create your application on http://qathome.com/developer/applications/ (link is available only AFTER LOGIN)
4. QatHome follows the [OAuth 2.0] (http://tools.ietf.org/html/rfc6749) standard so feel free to choose what you need (Use for example "Client type" = "Public", "Authorization grant type" = "Resource owner password-based", nothing into "redirect uris")
5. Go to project folder and edit `static/src/config.js`:
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
    * replace string FIRM_ID with your firm id that you can find in the url after login in the queue manager interface. For example: if the url is qathome.com/app/firms/45cbde9e-0dd1-34c4-bf4a-acf92eaf1706/desks/1 then the firm id is 45cbde9e-0dd1-34c4-bf4a-acf92eaf1706
    
12. Run the application from project root folder:
    ```
    ./manage.py runserver
    ```
    
13. Type 127.0.0.1:8000 in the address bar of your favourite browser
