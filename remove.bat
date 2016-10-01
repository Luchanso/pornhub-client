@echo off
echo Clearing ph-client cache...
ping -n 4 127.0.0.1 >nul
rmdir data\Default /s /q
rmdir data\ShaderCache /s /q
rm "data\First Run"
rm "data\Local State"
exit
