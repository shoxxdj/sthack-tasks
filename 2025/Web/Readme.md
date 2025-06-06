# Bad dev

## Context

FR :

```
Notre developpeur préféré à mis en place une interface pour que vous puissiez le contacter.
Il lit tous vos messages.
Nous savons qu'il héberge une application en cours de développement sur son réseau.
Nous comptons sur vous pour récupérer le flag qu'elle héberge.
```

EN :

```
Our favorite developer has set up an interface so that you can contact him.
He reads all your messages.
We know he's hosting an application under development on his network.
We're counting on you to recover the flag he's hosting.
```

## Remark

For the CTF a captcha was set on the first interface to avoid automated attacks that may put the bot in trouble ( like fuzzers )

## Deploy

```
docker-compose build
docker-compose up
```

## Writeup :
 - https://shoxxdj.fr/writeups/sthack-25-bad-dev.html
