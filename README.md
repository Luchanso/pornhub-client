# Pornhub Client Alpha

Download [here](https://github.com/Luchanso/pornhub-client/releases).

Screenshots:
![Loading...](https://cloud.githubusercontent.com/assets/2098777/18818028/2e434d2c-8377-11e6-9bac-4b0a1d85d8d2.png)
![Site](https://cloud.githubusercontent.com/assets/2098777/18818027/2e41ff4e-8377-11e6-8ee7-eef655e08683.png)

Onboard:
* TOR v0.2.8.6 (git-4d217548e3f05569)
* NW.js v0.17.4 (sdk) (latest)

Platforms: Win32

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

### Change ffmpeg.dll, because default ffmpeg.dll not include mp3 and hc.264 codecs
cp ffmpeg.dll build/ph-client/win32/ffmpeg.dll

### Running:
cd build/ph-client/win32/
 ./ph-client
```
