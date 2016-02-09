# Angular webapp for QatHome Rest service API

# Overview

Qathome API is the latest evolution in queue management and reservation management. It's reliable, fast, scalable, and carefully tested! If you want to know more, [contact us] (http://www.qathome.com/contact)!

This is a freely licensed minimal client to create your queue management / reservation management web-app based on Qathome API. You ca

# Requirements

* [Python 2.7] (http://askubuntu.com/questions/101591/how-do-i-install-python-2-7-2-on-ubuntu/101595) (releases after 2.7 have not been tested)

# Installation

Install using `pip`...

    pip install -r requirements.txt

# Setup

1. Create an account to 'manage your queue' on [QatHome] (http://www.qathome.com/accounts/signup/manager)
2. Validate email and create your firm
3. Create your application on http://qathome.com/developer/applications/
4. Now edit the `static/src/config.js`:

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
    * replace string 'CLIENT_ID', 'CLIENT_SECRET' with your QatHome application client_id and client_secret 
    * insert your 'USERNAME' and 'PASSWORD'
    * replace string 'FIRM_ID' with the code of your firm.
5. Run the application:
    
    ./manage.py runserver
