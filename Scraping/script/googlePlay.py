import requests
from bs4 import BeautifulSoup
# Get arguments from command line
import sys
args = sys.argv
url = "https://play.google.com/store/search?q=isbn&c=books&hl=en_US&gl=US"
url = url.replace("isbn", args[1])
# Headers to make the request look more authentic
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36"
}
# Scrap https://play.google.com
page = requests.get(url, headers=headers,)
# Print the page
soup = BeautifulSoup(page.content, "html.parser")
# Get price and url of the books
# Price is in the span tag under another span tag with class "VfPpfd VixbEe"
# Url is in the a tag under a div tag with class "WsMG1c nnK0zc"

# Get the price under the span tag
price = soup.find("span", class_="VfPpfd VixbEe")
if price == None:
    print('{}')
    exit()
price = price.text

# Eliminate the dollar sign
price = price.replace("$", "")
# Get url which is in the a <a> with class "Si6A0c.ZD8Cqc"

url = soup.find("a", class_="Si6A0c ZD8Cqc")
if url == None:
    print('{}')
    exit()
url = url["href"]
url = "https://play.google.com" + url
# Print the price and url
print('{"price": "' + price + '", "url": "' + url + '"}')