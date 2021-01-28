from flask import Flask
from flask import render_template
from flask import request
from flask import session
from flask import redirect # I will learn after that will use
from flask import url_for  # I will learn after that will use
from flask import flash    # I will learn after that will use

import os
import json
import pdb
import scrapy


app = Flask(__name__)
trading_activity = scrapy.trading_value
@app.route("/")
def trading():
    
    return render_template('index.html',data = trading_activity)



if __name__ == '__main__':
   app.run(debug = True)