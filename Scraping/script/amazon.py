# Use web scraping to get the price of a product on amazon

import requests
from bs4 import BeautifulSoup

url = 'https://www.amazon.com/s?k=html+and+css'

response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# Find first price and url of the product

price = soup.find('span', class_='a-offscreen')
url = soup.find('a', class_='a-link-normal a-text-normal')

# Print
print(price.text)
print(url['href'])

