#!/bin/bash
echo "admin ready"
#while true; do casperjs --ignore-ssl-errors=true --local-to-remote-url-access=true --web-security=no --ssl-protocol=any /scripts/script.js; sleep 5;done
while true; do chromium-browser --headless --disable-gpu --run-all-compositor-stages-before-draw http://172.13.37.10/the-admin-secure-interface/review_comment.php --no-sandbox --virtual-time-budget=200000 --disable-features=NetworkService;  done
