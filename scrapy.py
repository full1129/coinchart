import sys
import re
import os
import json
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait  # for implicit and explict waits
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.select import Select
from datetime import date
import selenium.webdriver
import webbrowser
import time
from datetime import datetime
import random

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

option = webdriver.ChromeOptions()
option.add_argument('headless')
today = date.today()
# now = datetime.now()
current_time = today.strftime("%m%d%y")
print(current_time)

# file_name = input("Enter the excel file name: ")
driver = webdriver.Chrome('chromedriver', options = option)
# driver = selenium.webdriver.Chrome()

Email = "tran200989@gmail.com"
Password = "ngocthuy1989"

base_url = 'https://www.coinbase.com/signin'

driver.get(base_url)
time.sleep(5)
driver.implicitly_wait(5)

# pytesseract.pytesseract.tesseract_cmd = r'C:/Users/Secret Agent/AppData/Local/Tesseract-OCR/tesseract.exe'

print("----------start login---------------")
email_input = driver.find_element_by_id('email')
email_input.send_keys(Email)
password_input = driver.find_element_by_id('password')
password_input.send_keys(Password)
print("--------Please insert key manually--------------")
time.sleep(1)
submit_button=driver.find_element_by_xpath('//input[@type="submit"]')
submit_button.click()

time.sleep(5)

phone_code = input("Enter the phone code: ")

code_input = driver.find_element_by_xpath('//input[@class="focus"]')
code_input.send_keys(phone_code)

verify_button = driver.find_element_by_xpath('//input[@id="step_two_verify"]')
verify_button.click()

def scrapy():
	driver.get('https://www.coinbase.com/price/bitcoin')
	trading_activity = []
	trading_text = driver.find_element_by_xpath('//div[@class="PercentBarBuying__Text-pn1f5a-2 nlylV"]')
	trading_text = trading_text.text
	trading_value = trading_text.split("%")[0]
	# trading_value = random.random()*10
	file = open("myFile.txt","a+")
	file.write(str(trading_value) + "\n")
	file.close()
	return str(trading_value)

app = Flask(__name__)
@app.route("/")
def trading():
	return render_template('index.html',data = scrapy())

@app.route("/data")
def trading_data():
	return scrapy()
if __name__ == '__main__':
	app.run(debug = True)

print('Done')