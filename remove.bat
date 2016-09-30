@echo off
echo Clearing ph-client cache...
SLEEP 1
rmdir data\Default /s /q
rmdir data\ShaderCache /s /q
rm "data\First Run"
rm "data\Local State"
exit
