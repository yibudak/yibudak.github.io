---
layout: post
title: "Python'da En Hızlı Şekilde Veri Çekme"
date:	2021-02-19 07:00:00
published: true
categories: [Python]
tags : Request Web Scraping
---

![image](post_resources/python-veri-cekme/head.png)


Merhaba, Python kullanarak veri madenciliği (web scraping) yapmak günümüzün popüler konularından bir tanesi. Hem gelişmiş kütüphaneler, hem de Python söz diziminin diğer dillere göre nispeten daha kolay olmasından dolayı Python bu işte çok yetenekli. İnternetteki verinin değeri ise paha biçilemez seviyeye gelmiş durumda. Böylesine bir madenin en hızlı nasıl kazılacağını bu yazımda sizlere bahsettim. Keyifli okumalar dilerim.


# [](#header-3)HTTP istemcileri (HTTP clients)

Python'da birçok HTTP istemcisi bulunuyor. Bunlardan bazıları;

1. Requests (en yaygın kullanılan)
1. Urllib
1. PycURL
1. Faster-than-request (en hızlısı fakat gelişmesi lazım)

Aralarında en kararlı çalışan `requests` modülü olduğu için bu yazıda onu kullanacağız.

# [](#header-3)Çalıştırma yöntemleri

Aslında bize zaman kazandıracak olay burada başlıyor. Kodumuzu çalıştıracağımız yöntem türüne göre veri hızı inanılmaz boyutta artıyor. Dilerseniz yöntemlerden ve detaylarından bahsedelim. En hızlıdan, en yavaşa sıralayacak olursak.

1. aiohttp ile asenkron çalıştırmak.
1. concurrent.futures ile paralel çalıştırmak.
1. requests.session ile oturum oluşturmak.
1. requests.get kullanmak (en yaygın kullanılanı bu).

Şimdi bu yöntemleri tek tek deneyerek sonuçlara göz atalım. Bunun için aşağıdaki kodu kullanabiliriz.

```python
import requests
import aiohttp
import asyncio
from requests_futures import sessions as ses
import contextlib
import time

URL = 'http://httpbin.org/gzip'
COUNT = 50

@contextlib.contextmanager
def calc_execution_time(method):
    start_time = time.time()
    yield
    print("`%s' yönteminde geçen zaman: %.2fs" % (method, time.time() - start_time))

with calc_execution_time("requests"):
    for i in range(COUNT):
        requests.get(URL)

sessions = requests.Session()
with calc_execution_time("session"):
    for i in range(COUNT):
        sessions.get(URL)

session = ses.FuturesSession(max_workers=10)
with calc_execution_time("concurrent.futures"):
    futures = [session.get(URL)
               for i in range(COUNT)]
    for f in futures:
        f.result()

async def get(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            await response.read()

loop = asyncio.get_event_loop()
with calc_execution_time("aiohttp"):
    loop.run_until_complete(
        asyncio.gather(*[get(URL)
                         for i in range(COUNT)]))
```

Çıktı olarak elde ettiğimiz sonuç ise muazzam!

```
requests yönteminde geçen zaman: 15.85s
session yönteminde geçen zaman: 9.12s
concurrent.futures yönteminde geçen zaman: 1.08s
aiohttp yönteminde geçen zaman: 0.58s
```

![image](post_resources/python-veri-cekme/chart.png)

Kod çıktısı ve grafik bize gösteriyor ki asenkron yöntem, geleneksel yöntemden 27 kat daha hızlı.


* Ayrıca söylemek gerekirse, scriptinizi kontrolsüz bir şekilde asenkron veya paralel çalıştırırsanız büyük ihtimal hedef websitesinin güvenlik duvarı tarafından engelleneceksiniz. Fazla abartmamakta fayda var.


# [](#header-3)Son Sözler

Kısa ve öz bir yazı oldu fakat teknik açıdan birçok geliştiriciye yön göstereceğine inanıyorum. Maalesef ki veri madenciliği konusunda yeterli Türkçe kaynak yok, olanlar da bilgi açısından tatmin etmeyecek seviyede. Eğer bu alanda iş yapmak istiyorsanız size tavsiyem Github üzerinden insanların kodlarını okumanız olacaktır.

Herkese kolay gelsin.

Kaynakça:
1. https://docs.aiohttp.org/en/stable/client_quickstart.html
1. https://docs.python.org/3/library/concurrent.futures.html
1. https://julien.danjou.info/python-and-fast-http-clients/