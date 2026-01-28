Add-Type -AssemblyName System.Drawing
$assetsDir = "assets"
$files = Get-ChildItem -Path $assetsDir -Filter "*.png"
foreach ($file in $files) {
    Write-Host "Checking $($file.Name)..."
    $bytes = Get-Content $file.FullName -Encoding Byte -TotalCount 2
    # FF D8 is JPEG
    if ($bytes[0] -eq 0xFF -and $bytes[1] -eq 0xD8) {
        Write-Host "Detected JPEG content in PNG file: $($file.Name). Converting..."
        $img = [System.Drawing.Image]::FromFile($file.FullName)
        $tempPath = $file.FullName + ".tmp.png"
        $img.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
        $img.Dispose()
        Move-Item $tempPath $file.FullName -Force
        Write-Host "Successfully converted $($file.Name) to real PNG."
    } else {
        Write-Host "$($file.Name) already has PNG or non-JPEG content."
    }
}
