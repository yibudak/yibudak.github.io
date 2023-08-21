---
layout: post
title: "Odoo Loglarını Veritabanına Kaydetmek"
published: true
date:	2023-08-19 20:00:00
categories: [Odoo]
tags : Odoo Python
image:
   path: /post_resources/odoo_logs/header-tr.png
   height: 1600
   width: 900
   alt: Odoo Loglarını Veritabanına Kaydetmek
---

Üretim ortamında çalışan bir Odoo sunucusunda hatalar gözden rahatlıkla kaçabiliyor. Bu yüzden Odoo'da dosyaya veya terminale
basılan logları kaydedecek bir modül yapmayı planlıyordum ama bu özelliğin Odoo tarafında zaten bulunduğunu öğrendim. Lafı fazla
uzatmadan nasıl yapıldığına geçelim.

## Nasıl Yapılır?

1. İlk adımda, log_db parametresine bir veritabanı ismi veya veritabanı bağlantı URL'si yazmanız gerekmektedir.
   *  Örnek olarak: `log_db = DATABASE_NAME` veya `log_db = postgres://USER:PASSWORD@HOST:PORT/DATABASE_NAME`
2. İkinci adımda ise, log_db_level parametresine log seviyesini yazmanız gerekmektedir.
   *  Buraya gelebilecek değerler: `debug`, `info`, `warning`, `error`, `critical`


İşte bu kadar! Artık arkamıza yaslanıp Odoo'nun bizim için logları kaydetmesini bekleyebiliriz.

## Logları Nasıl Görüntüleyebiliriz?

Logları görüntülemek için Odoo'nun arayüzünü kullanabiliriz. Bunun için `Ayarlar > Teknik > Loglama` yolunu izleyerek
kaydedilen logları görüntüleyebilirsiniz. Unutmayın, bu menüyü görüntülemek için debug modunda olmanız gerekmektedir.
