# Pornhub Client Beta

Download [here](https://github.com/Luchanso/pornhub-client/releases).

# Features
* Application password lock
* Hotkey 'Escape' for close all windows
* Without save sessions, data, history and other...
* There is a portable version
* With TOR proxy on board (for escape ISP blocking)

# Plans
* Add content cache for faster loading
* Add setting - cookie save

More plans you can see in [project management](https://github.com/Luchanso/pornhub-client/projects/1)

If you have suggestions, write to me luchansodev@gmail.com or [open new issue](https://github.com/Luchanso/pornhub-client/issues)

# Screenshots:
![screen2](https://cloud.githubusercontent.com/assets/2098777/19022780/8b10aaba-88e8-11e6-98dd-cb439e5495bf.png)
![screen1](https://cloud.githubusercontent.com/assets/2098777/19022803/0bfb387a-88e9-11e6-98ed-9428634686db.png)
![screen5](https://cloud.githubusercontent.com/assets/2098777/19022806/1db7428e-88e9-11e6-9b3a-3a64c59213e3.png)

Onboard:
* TOR v0.2.8.6 (git-4d217548e3f05569)
* NW.js v0.17.6 (latest)

Platforms: Win32, Win64

### How to build from source

```sh
git clone https://github.com/Luchanso/pornhub-client ph-client
cd ph-client
git clone -b tor https://github.com/Luchanso/pornhub-client temp

# Copy TOR
cp -R temp/tor tor/

### Remove tempory directory
rm -rf temp

npm install nw-builder
npm run build
# Or portable version:
# npm run build-portable

### Running:
cd build/ph-client/win32/
 ./ph-client
```
