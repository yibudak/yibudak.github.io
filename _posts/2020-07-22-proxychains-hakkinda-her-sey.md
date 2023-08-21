---
layout: post
title: "Proxychains Hakkında Her Şey"
date:	2020-07-22 15:00:00
published: true
categories: [Araçlar]
tags : Proxy
image:
  path: /post_resources/proxychains/diyagram.png
  height: 508
  width: 125
  alt: Proxychains Hakkında Her Şey
---

Selamlar, geçenlerde uplink oyununu öğrenirken her saldırıdan önce karmaşık bir ağ bağlantısı yapmam gerektiğini fark ettim ve bunun gerçek hayattaki karşılığı olan bir yazılım arayışına girdim ve karşıma proxychains çıktı.


## Proxychains nedir?

Proxychains C dili ile yazılmış açık kaynak kodlu bir yazılımdır, kendisiyle beraber kullanılan programın gönderip/aldığı TCP paketlerini belirlemiş olduğumuz proxy sunucular üzerinden işlenmesini sağlar. Başlıca özellikleri şunlardır:

* Socks5, Socks4 ve HTTP protokollerini destekler.
* Aynı anda birden çok bağlantı tipine sahip proxy sunucuları kullanabilir.
* DNS sorgularını proxy üzerinden gönderebilir.
* İçeriğinde proxy ayarı olmayan bir yazılımı belirlediğiniz proxy sunucu ile kullanabilirsiniz.

Eğer kullandığınız linux dağıtımında proxychains yok ise aşağıdaki komutu kullanarak yükleyebilirsiniz:

`sudo apt-get install proxychains`

## Proxychains'i Nerede Kullanırız?

* kısıtlı bir intranet ağında erişilemeyen adreslere erişmek için. buna örnek olarak ülkemizde yasaklanan web sitelerine erişmek verilebilir.
* ağınızdaki güvenlik duvarının engellediği portlar üzerinden iletişim kurmak için.
* birden fazla proxy sunucu kullanarak takip edilebilirliği azaltmak için.
* dns sorgularını proxy sunucu üzerinden göndermek için.

![Proxychains Diyagramı](/post_resources/proxychains/diyagram.png)

## Proxychains Sözdizimi

Proxychains'i biz sistemimizde bulunan diğer yazılımlarla birlikte kullanabiliriz. Bunun için yapmamız gereken işlem çok basit:

![Proxychains Syntax](/post_resources/proxychains/syntax.png)

`proxychains nmap scanme.nmap.org`

`proxychains firefox`

`proxychains /bin/sh`


## Proxychains'in Ayarlanması

Proxychains'i nasıl kullanacağımızı öğrendikten sonra proxy sunucularımızı eklemek ve gereken ayarları yapmak için `/etc/proxychains.conf` dosyasını düzenlememiz gerekiyor.

Bunun için `sudo nano /etc/proxychains.conf` komutunu kullanmamız yeterli olacaktır.

![Proxychains Ayarları](/post_resources/proxychains/config.png)

proxychains.conf dosyası içerisinde ön tanımlı ayarları değiştirmeden kullanabilirsiniz fakat yine de içeriğinden bahsetmekte fayda var. Etkinleştirmek istediğiniz satırın başındaki # işaretini silmeniz yeterli.

#### dynamic_chain

dynamic_chain seçeneğini aktif ettiğinizde bağlantınız, proxy zincirinizde bulunan ve erişilebilen sunucular üzerinden gerçekleşir. Proxy zincirinizde bulunan ve erişilemeyen sunucular pas geçilir. Eğer zincirde bulunan bütün sunucular ölü durumdaysa bağlantınız kesilir.

#### strict_chain

strict_chain, proxychains'in ön tanımlı olarak kullandığı seçenektir. Proxy zincirinizdeki sunucuları aynı bir zincirmiş gibi kullanır. Eğer zincirdeki bir sunucu ölü durumdaysa bağlantınız gerçekleşmez.

#### random_chain

Bu seçenek ile bağlantınız proxy listenizde bulunan sunucular kullanılarak rastgele üretilmiş zincirler üzerinden gerçekleşir. chain_len ayarını kullanarak oluşturduğunuz rastgele zincirlerin uzunluğunu belirleyebilirsiniz.

#### quiet_mode

Proxychains kullandığınızda yaptığınız her bağlantının sunucular üzerinden nasıl iletildiğini gösterir, bunu debug log olarak düşünebiliriz. Nmap gibi yazılımlarda kısa süre içerisinde çok fazla paket gönderildiği için terminal üzerinde kirliliğe sebep olabilir, böyle bir durumda bu seçeneği aktif edebilirsiniz.
	
#### proxy_dns

Proxychains'de ön tanımlı olarak aktif bu seçenek, yaptığınız dns sorgularının proxy sunucular üzerinden gerçekleşmesi için kullanılıyor.

## Proxy Listesinin Ayarlanması

![Proxy Listesi](/post_resources/proxychains/proxylist.png)

Proxy listesini ayarlamak çok basit, tek yapmamız gereken `protokol` `sunucu adresi` `port` formatında /etc/proxychains.conf dosyasına eklemek. Eğer kullandığınız proxy sunucu, kullanıcı adı ve şifre gerektiriyorsa port'un yanına `kullanıcı adı` `şifre` yazmanız yeterli.
Ön tanımlı olarak `socks4 127.0.0.1 9050` adresinin yorum satırından çıkarıldığını görebiliriz. TOR ağına bağlanmak için bu ayar bizim için yeterli olacaktır fakat siz kendi istediğiniz bir proxy sunucu eklemek istediğinzde bu satırın altına ekleme yapabilir veya tor sunucusunu yorum satırı haline getirerek devre dışı bırakabilirsiniz.
	
## Proxychains'in Tor Ağı ile Kullanılması

TOR ağı günümüzde ücretsiz olarak yüksek gizlilik sağlayan bir servistir. Yukarıda da belirttiğim üzere proxychains ön tanımlı olarak tor ağıyla çalışacak şekilde gelir, bunun için tek yapmamız gereken şey terminal üzerinden `tor` servisini başlatmaktır.

Kullandığınız linux dağıtımında tor servisi yoksa `sudo apt-get install tor` komutunu kullanarak yükleyebilirsiniz. Sonrasında ise:

`sudo service tor start`

komutunu kullanarak tor servisini aktif etmeniz gerekiyor. Artık proxychains'i tor ağıyla birlikte kullanabiliriz.

![Proxychains ve TOR](/post_resources/proxychains/tordig.png)


## Proxychains'i Nmap ile Birlikte Kullanmak

Proxychains'i diğer yazılımlarla birlikte kullanabileceğimizden bahsettim, yazıyı da bir örnekle bitirmek istedim. Aşağıdaki görselde "scanme.nmap.org" üzerinde uygulamasını görebilirsiniz.

![Proxychains Nmap](/post_resources/proxychains/nmap.gif)


## Son Sözler

Oyunlarda ve filmlerde gördüğümüz dünya haritası üzerindeki farklı sunucular kullanılarak yapılan "bağlantılar" gerçek hayatta nasıl oluyor görmüş olduk. Proxychains bize internette anonim olmamızı sağlasa da ücretsiz servislerin kullanılması hiçbir zaman güvenli bir yol değildir. Ayrıca unutmamak gerekiyor ki ülkemizde yasaklı sitelere erişmek Türk Ceza Kanunu’nun Mühür bozma başlıklı 203.maddesine göre suç olarak nitelendirebilir, Bilgiyi etik yollarda kullanmak en doğrusudur. Kendinize iyi bakın! 

yibudak
