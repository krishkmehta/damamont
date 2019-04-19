#!/bin/bash

###############################
### Magento Permissions

find . -type f -exec chmod 644 {} \; && find . -type d -exec chmod 755 {} \; && chmod o+w var var/.htaccess includes includes/config.php app/etc && chmod 550 pear && sudo find *.sh -type f -exec chmod 755 {} \;

rm -rf var/cache/*
rm -rf var/session/*

chown -R www-data:www-data var media
