# Angular webapp for QatHome Rest service API

# Overview

Minimal client to create your personal QatHome webapp.

# Requirements

* Python (2.7, 3.2, 3.3, 3.4, 3.5)

# Installation

Install using `pip`...

    pip install -r requirements.txt

# Setup

1.Create an user on QatHome http://qathome.com
2.Create your personal application on http://qathome.com/developer/applications/
3.Now edit the `static/src/config.js`:
```javescript
var QATHOME_CLIENT_CONFIG = {
    server: 'http://qathome.com',
    client_id: 'CLIENT_ID',
    client_secret: 'CLIENT_SECRET',
    username: 'USERNAME',
    password: 'PASSWORD',
    firm_id: 'FIRM_ID'
};
```    
4.Run the application:
    
    ./manage.py runserver

