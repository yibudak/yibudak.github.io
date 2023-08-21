---
layout: post
title: "Devilbox Kurulumu ve Kullanımı"
date:	2020-09-22 10:00:00
published: true
categories: [Araçlar]
tags : Devilbox LAMP
image:
  path: /post_resources/devilbox/header.png
  height: 453
  width: 154
  alt: Devilbox Kurulumu ve Kullanımı
---

![Devilbox Logo](post_resources/devilbox/header.png)


Merhaba, web uygulamaları için Ubuntu üzerinde XAMPP kullanmayı denemiştim fakat Linux'da çok da sağlıklı çalışmadığını fark ettim, çoğu zaman servisler kendi kendini kapatıyor veya yeniden başlıyordu. Durum böyle olunca ben de alternatif bir yazılım arayışına girdim ve karşıma Docker üzerinde çalışan bir mühendislik harikası çıktı, onun adı Devilbox. :)


### [](#header-3)Devilbox'ın Özellikleri

Devilbox, Docker'a sahip bütün cihazlarda ve işletim sistemlerinde çalışır. Başlıca özellikleri ise şunlardır:

* HTTPS desteğine sahip.
* Teorik olarak sınırsız sayıda web uygulaması çalıştırabilirsiniz.
* Her proje için özel domain atanabilir. (wordpress.proje, prestashop.proje gibi)
* Bir proje eklediğinizde sistemi yenilemeye gerek yok, kendisi otomatik olarak projenizi canlandırıyor.
* Sadece tek bir ayar dosyasını düzenleyerek servislerin onlarca farklı sürümünü kullanabilirsiniz.


![Devilbox Diyagramı](post_resources/devilbox/diagram.png)

Yukarıda Devilbox'ın çalışmasını gösteren diyagramı görebilirsiniz.

### [](#header-3)Devilbox Kurulumu

Devilbox kurulumu oldukça basit, aşağıda Linux veya macOS üzerine kurmak için gereken aşamalar mevcut:

1. `git clone https://github.com/cytopia/devilbox` komutunu kullanarak devilbox reposunu indirin.
1. `cd devilbox` komutu ile indirdiğiniz klasöre girin.
1. `cp env-example .env` ortam değişkenlerinin bulunduğu dosyayı isimlendirelim, eğer istersek `nano .env` komutunu kullanarak parametreleri inceleyip değiştirebilirsiniz.
1. `docker-compose up` komutu ile yazılımı çalıştırın ve paketleri indirmesini bekleyin, paketler indikten sonra sistemin çalıştığına dair log mesajlarını terminalinizde görebilirsiniz.


### [](#header-3)Devilbox Kullanımı

Devilbox'ımız çalıştığına göre `localhost/` adresine bağlanarak arayüzüne erişebiliriz. Bizi şöyle bir arayüz karşılıyor. 

![Devilbox Anasayfa](post_resources/devilbox/mainpage.png)

Sisteme projemizi eklememiz için `devilbox/data/www` dizini içerisine proje klasörümüzü oluşturuyoruz. Sonrasında ise proje klasörümüzün içinde htdocs adlı yeni bir klasör oluşturup dosyalarımızı bu htdocs'un içine atıyoruz.

Örnek olarak işin sonunda index.php dosyamız şöyle bir dizinin içinde olması gerekiyor.

`devilbox/data/www/projeAdi/htdocs/index.php`


Bütün bunları yaptıktan sonra Devilbox içerisinden 'Virtual Hosts' sekmesine tıkladığımızda aşağıdaki gibi bir hatayla karşılacağız, bunun çözümü ise çok basit.

![Devilbox hata](post_resources/devilbox/error.png)

Tek yapmanız gereken `sudo nano /etc/hosts` komutunu kullanarak hosts dosyanıza;

* 127.0.0.1	projeAdi.loc

kaydını eklemek. Bu pencereden sırasıyla CTRL+X ve Shift+Y tuşlarına basarak çıkın. 

![Devilbox Hata Çözümü](post_resources/devilbox/problemsolved.png)

Hata çözüldü, artık linke tıklayarak veya domain ismini adres çubuğuna yazarak web uygulamanıza erişebilirsiniz.

### [](#header-3)Ekstra Bilgiler

1. Devilbox klasörü içerisinde `sudo ./shell.sh` komutunu kullanarak konteyner terminaline erişebilirsiniz. Böylece 'mysql' gibi komutları kullanabilirsiniz.
1. Devilbox klasörü içerisinde bulunan `.env` dosyasını düzenleyerek istediğiniz servisin istediğiniz versiyonunu kullanabilirsiniz, ayrıca domain uzantısını değiştirmek gibi birçok ayara sahip.

### [](#header-3)Son Sözler

Özellikle macOS ve Linux'da can sıkıcı olan XAMPP'a çok güzel bir alternatiften bahsettik. Ayrıca Devilbox gibi basit ama etkili yazılımlar Docker dünyasına dalış yapmak için güzel bir yol. Kendinize iyi bakın!

yibudak
