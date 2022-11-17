import requests
from bs4 import BeautifulSoup

# Get arguments from command line
import sys
args = sys.argv
url = 'https://www.ebay.com/sch/i.html?_nkw=' + args[1]

response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')
# Find the minimum price and url of the product
price = soup.find_all('span', class_='s-item__price')
url = soup.find_all('a', class_='s-item__link')

# Get the minimum price
min_price = 0x3f3f3f3f
min_url = ""

for i in range(len(price)):
    price[i] = price[i].text
    price[i] = price[i].replace('$', '')
    price[i] = price[i].replace(',', '')
    price[i] = float(price[i])
    if price[i] < min_price and price[i] != 20:
        min_price = price[i]
        min_url = url[i]['href']
print('{"price": "' + str(min_price) + '", "url": "' + min_url + '"}')
