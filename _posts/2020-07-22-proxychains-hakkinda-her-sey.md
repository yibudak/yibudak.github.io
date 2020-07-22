---
title: "[TR] Proxychains Hakkında Her Şey"
date:	2020-07-22 15:00:00
published: true
---

selamlar, geçenlerde uplink oyununu öğreninirken her saldırıdan önce karmaşık bir ağ bağlantısı yapmam gerektiğini fark ettim ve bunun gerçek hayattaki karşılığı olan bir yazılım arayışına girdim ve karşıma proxychains çıktı.


# [](#header-3)proxychains nedir?

proxychains c dili ile yazılmış açık kaynak kodlu bir yazılımdır, kendisiyle beraber kullanılan programın gönderip/aldığı TCP paketlerini belirlemiş olduğumuz proxy sunucular üzerinden işlenmesini sağlar. başlıca özellikleri şunlardır:

1. socks5, socks4 ve http protekollerini destekler.
1. aynı anda birden çok bağlantı tipine sahip proxy sunucuları kullanabilir.
1. dns sorgularını proxy üzerinden gönderebilir.
1. içeriğinde proxy ayarı olmayan bir yazılımı belirlediğiniz proxy sunucu ile kullanabilirsiniz.

eğer kullandığınız linux dağıtımında proxychains yok ise aşağıdaki komutu kullanarak yükleyebilirsiniz:

`sudo apt-get install proxychains`

# [](#header-3)proxychains'i nerede kullanırız?

1. kısıtlı bir intranet ağında erişilemeyen adreslere erişmek için. buna örnek olarak ülkemizde yasaklanan web sitelerine erişmek verilebilir.
1. ağınızdaki güvenlik duvarının engellediği portlar üzerinden iletişim kurmak için.
1. birden fazla proxy sunucu kullanarak takip edilebilirliği azaltmak için.
1. dns sorgularını proxy sunucu üzerinden göndermek için.

![image](post_resources/proxychains/diyagram.png){:.postimg}

# [](#header-3)proxychains sözdizimi

proxychains'i biz sistemimizde bulunan diğer yazılımlarla birlikte kullanabiliriz. bunun için yapmamız gereken işlem çok basit:

![image](post_resources/proxychains/syntax.png){:.postimg}

`proxychains nmap scanme.nmap.org`

`proxychains firefox`

`proxychains /bin/sh`


# [](#header-3)proxychains'in ayarlanması

proxychains'i nasıl kullanacağımızı öğrendikten sonra proxy sunucularımızı eklemek ve gereken ayarları yapmak için `/etc/proxychains.conf` dosyasını düzenlememiz gerekiyor.

bunun için `sudo nano /etc/proxychains.conf` komutunu kullanmamız yeterli olacaktır.

![image](post_resources/proxychains/config.png){:.postimg}

proxychains.conf dosyası içerisinde ön tanımlı ayarları değiştirmeden kullanabilirsiniz fakat yine de içeriğinden bahsetmekte fayda var. etkinleştirmek istediğiniz satırın başındaki # işaretini silmeniz yeterli.

# [](#header-6)dynamic_chain

dynamic_chain seçeneğini aktif ettiğinizde bağlantınız, proxy zincirinizde bulunan ve erişilebilen sunucular üzerinden gerçekleşir. proxy zincirinizde bulunan ve erişilemeyen sunucular pas geçilir. eğer zincirde bulunan bütün sunucular ölü durumdaysa bağlantınız kesilir.

# [](#header-6)strict_chain

strict_chain, proxychains'in ön tanımlı olarak kullandığı seçenektir. proxy zincirinizdeki sunucuları aynı bir zincirmiş gibi kullanır. eğer zincirdeki bir sunucu ölü durumdaysa bağlantınız gerçekleşmez.

# [](#header-6)random_chain

bu seçenek ile bağlantınız proxy listenizde bulunan sunucular kullanılarak rastgele üretilmiş zincirler üzerinden gerçekleşir. chain_len ayarını kullanarak oluşturduğunuz rastgele zincirlerin uzunluğunu belirleyebilirsiniz.

# [](#header-6)quiet_mode

proxychains kullandığınızda yaptığınız her bağlantının sunucular üzerinden nasıl iletildiğini gösterir, bunu debug log olarak düşünebiliriz. nmap gibi yazılımlarda kısa süre içerisinde çok fazla paket gönderildiği için terminal üzerinde kirliliğe sebep olabilir, böyle bir durumda bu seçeneği aktif edebilirsiniz.
	
# [](#header-6)proxy_dns

proxychains'de ön tanımlı olarak aktif bu seçenek, yaptığınız dns sorgularının proxy sunucular üzerinden gerçekleşmesi için kullanılıyor.

# [](#header-3)proxy listesinin ayarlanması

![image](post_resources/proxychains/proxylist.png){:.postimg}

proxy listesini ayarlamak çok basit, tek yapmamız gereken `protokol` `sunucu adresi` `port` formatında /etc/proxychains.conf dosyasına eklemek. eğer kullandığınız proxy sunucu, kullanıcı adı ve şifre gerektiriyorsa port'un `kullanıcı adı` `şifre` yazmanız yeterli.
ön tanımlı olarak `socks4 127.0.0.1 9050` adresinin yorum satırından çıkarıldığını görebiliriz. tor ağına bağlanmak için bu ayar bizim için yeterli olacaktır fakat siz kendi istediğiniz bir proxy sunucu eklemek istediğinzde bu satırın altına ekleme yapabilir veya tor sunucusunu yorum satırı haline getirerek devre dışı bırakabilirsiniz.<
	
# [](#header-3)proxychains'in tor ağı ile kullanılması

tor ağı günümüzde ücretsiz olarak yüksek gizlilik sağlayan bir servistir. yukarıda da belirttiğim üzere proxychains ön tanımlı olarak tor ağıyla çalışacak şekilde gelir, bunun için tek yapmamız gereken şey terminal üzerinden `tor` servisini başlatmaktır.

kullandığınız linux dağıtımında tor servisi yoksa `sudo apt-get install tor` komutunu kullanarak yükleyebilirsiniz. sonrasında ise:

`sudo service tor start`

komutunu kullanarak tor servisini aktif etmeniz gerekiyor. artık proxychains'i tor ağıyla birlikte kullanabiliriz.

![image](post_resources/proxychains/tordig.png){:.postimg}


# [](#header-3)proxychains'i nmap ile birlikte kullanmak

proxychains'i diğer yazılımlarla birlikte kullanabileceğimizden bahsettim, yazıyı da bir örnekle bitirmek istedim. aşağıdaki görselde "scanme.nmap.org" üzerinde uygulamasını görebilirsiniz.

![image](post_resources/proxychains/nmap.gif){:.postimg}


# [](#header-3)son sözler

oyunlarda ve filmlerde gördüğümüz dünya haritası üzerindeki farklı sunucular kullanılarak yapılan "bağlantılar" gerçek hayatta nasıl oluyor görmüş olduk. proxychains bize internette anonim olmamızı sağlasa da ücretsiz servislerin kullanılması hiçbir zaman güvenli bir yol değildir. ayrıca unutmamak gerekiyor ki ülkemizde yasaklı sitelere erişmek "Türk Ceza Kanunu’nun Mühür bozma başlıklı 203.maddesine" göre suç olarak nitelendirebilir, bilgiyi etik yollarda kullanmak en doğrusudur. kendinize iyi bakın! 

yibudak