---
layout: post
title: "How to Save Odoo Logs in Database?"
published: true
date:	2023-08-19 20:00:00
categories: [Odoo]
tags : Odoo Python
image:
   path: /post_resources/odoo_logs/header-en.png
   height: 1600
   width: 900
   alt: How to Save Odoo Logs in Database?
---

Errors can be easily overlooked when you are running Odoo in production environment.
I was planning to make a module to record the logs printed, but I found out that this feature is already available on the Odoo side.
without further ado, let's move on to how it is done.

## How to Enable Saving Logs?

1. In the first step, you need to add a database name or database connection URL in the log_db parameter.
   * For example: `log_db = DATABASE_NAME` or `log_db = postgres://USER:PASSWORD@HOST:PORT/DATABASE_NAME`
2. In the second step, you need to write the log level in the log_db_level parameter.
   * Values that can be set here are: `debug`, `info`, `warning`, `error`, `critical`


That's it! Now we can sit back and wait for Odoo to record the logs for us.

## How Can We View Logs?

We can use Odoo's interface to view the logs. We can do this by going to `Settings > Technical > Logging
you can view the recorded logs. Remember, you must be in debug mode to view this menu.
