---
title: "[TR] Python ile Twitter Scrapping (Twint)"
published: true
date:	2021-02-24 15:00:00
---

Merhaba, son zamanlarda birçok insanın bu işle ilgilenmesinden dolayı Twitter'dan veri çekmek hayli zorlaşmış durumda. Limitlere takılmayan, doğru sonuç üreten bir scrapper yazmak istediğiniz zaman artık Twitter API'den başka bir yol yokmuş gibi görünse de Twint kütüphanesi bu işi muazzam derecede başarıyor.

![image](post_resources/twitter-scrapping/head.png){:.postimg}

# [](#header-3)Twint kütüphanesi hakkında

Twint kütüphanesi son zamanlarda kullandığım en sorunsuz twitter scrapping aracı. Diğer kütüphanelere baktığımızda çoğunun çalışmadığını veya API key istediğini görüyoruz. Twint ise ne API erişimi istiyor ne de bizi saçma sapan hatalarla uğraştırıyor.

Başlıca özellikleri şu şekilde;

* Neredeyse bütün tweetleri çekebilir. (yaklaşık 3200 tweet ile sınırlı)
* Tor ağı desteği
* Verileri dataframe'e kaydetme (pandas kullanarak)
* Hızlı ve basit kurulum
* Kullanmak için Twitter'a giriş yapmaya gerek yok, anonim olarak bütün fonksiyonlarını kullanabilirsiniz.


# [](#header-3)Kurulumu ve kullanımı

Kurmak için:
```
pip3 install --user --upgrade git+https://github.com/twintproject/twint.git@origin/master#egg=twint
```

Komut satırından kullanmak isterseniz:

`twint -u hesap_adi (tanımladığınız hesabın bütün tweetlerini listeler)`


`twint -u hesap_adi -s kelime (tanımladığınız hesapta X kelimeyi içeren bütün tweetleri listeler)`


`twint -u hesap_adi --following (tanımladığınız hesabın takip ettiği kullanıcılar listeler)`

gibi örnekler mevcut, isterseniz projenin Github sayfasına bakarak daha detaylı inceleyebilirsiniz.

# [](#header-3)Kod içerisinde Twint çalıştırmak

Can sıkıntısından yazdığım bir kodu aşağıya paylaşıyorum elimden geldiğince karmaşık yerlere yorum ekledim, kod merkezinize ekleyebilirsiniz. Herkese kolay gelsin.

```python
import requests
import twint
import pandas as pd
from tqdm import tqdm
import time
from requests.packages.urllib3.exceptions import InsecureRequestWarning


def get_verified_users():
'''
twitter mavi tikli kullanıcıları
@verified kullanıcısında takip ediyor.
'''
    c = twint.Config()
    c.Username = "verified"
    c.Store_csv = True
    c.Output = "verified_users.csv"
    twint.run.Following(c)


def get_unshorten_link(url):
'''
twitter hesabında ekli olan URL,
bir kısaltma servisinden geçiyor,
gerçek URL'ye erişmek için.
'''
    try:
        real_url = requests.head(url, allow_redirects=True, timeout=10,
                                 verify= False)
    except:
        real_url = "No website"
        return real_url
    return real_url.url


def library_caller(username):
    user_attr = []
    username = username.replace("\n", "")
    if username == 'username':
        return
    config = twint.Config()
    config.Username = username
    config.Store_object = True
    config.Store_object_users_list = user_attr
    config.Hide_output = True
    config.Retries_count = 3
    try:
        twint.run.Lookup(config)
    except:
        return
    if user_attr[0].url:
        web = get_unshorten_link(user_attr[0].url)
    else:
        web = "No Website"
    return username, web


def main():
    file_username = open('verified_users.csv', 'r')
    usernames = file_username.readlines()
    file_username.close()
    file = open("verified_users_data.csv", 'a', encoding="utf-8", newline='')
    for username in usernames:
        data = library_caller(username)
        try:
            if data:
                data_frame = pd.DataFrame({"Username": [data[0]], "Website": [data[1]]})
                data_frame.to_csv(file, header=file.tell() == 0, index=False)
        except:
            continue


if __name__ == '__main__':
    requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
    get_verified_users()
    main()




```