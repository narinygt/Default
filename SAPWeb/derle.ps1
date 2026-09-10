# ==========================================================================
# derle.ps1 — tek-dosya.html üretir
# --------------------------------------------------------------------------
# index.html + css/ + js/ + data/ + content/ dosyalarını tek bir HTML'e gömer.
# Amaç: tek dosyayı taşımak, e-postalamak veya başka bir AI sohbetine vermek.
#
# ÇALIŞTIRMA:  PowerShell'de bu klasörde ->  .\derle.ps1
#
# NOT: Asıl uygulama index.html'dir. tek-dosya.html ondan ÜRETİLİR;
#      elle düzenlenmez. İçerik değiştikçe bu betik yeniden çalıştırılır.
# ==========================================================================

$src = $PSScriptRoot
$out = Join-Path $src 'tek-dosya.html'

$html = Get-Content (Join-Path $src 'index.html') -Raw -Encoding UTF8

# index.html'deki <link> ve <script src> sırasını KAYNAK OLARAK KULLAN:
# böylece yeni konu eklendiğinde bu betiği güncellemeye gerek kalmaz.
$cssFiles = [regex]::Matches($html, '<link rel="stylesheet" href="([^"]+)"') |
            ForEach-Object { $_.Groups[1].Value }
$jsFiles  = [regex]::Matches($html, '<script src="([^"]+)"></script>') |
            ForEach-Object { $_.Groups[1].Value }

Write-Host "CSS : $($cssFiles.Count) dosya"
Write-Host "JS  : $($jsFiles.Count) dosya"

$eksik = @($cssFiles + $jsFiles) | Where-Object { -not (Test-Path (Join-Path $src $_)) }
if ($eksik) { Write-Error "Eksik dosya: $($eksik -join ', ')"; exit 1 }

$css = ($cssFiles | ForEach-Object {
    "/* ================= $_ ================= */`n" +
    (Get-Content (Join-Path $src $_) -Raw -Encoding UTF8)
}) -join "`n"

$js = ($jsFiles | ForEach-Object {
    "/* ================= $_ ================= */`n" +
    (Get-Content (Join-Path $src $_) -Raw -Encoding UTF8)
}) -join "`n"

# Güvenlik: içerikte </script> geçerse gömülü blok erken kapanır.
if ($js -match '</script') { Write-Error "JS icinde </script> dizisi var - gomulemez."; exit 1 }

# Etiketleri temizle, gömülü blokları yerleştir.
# DİKKAT: -replace kullanılmaz; .NET'in $1/$& gibi ozel dizileri buyuk JS
# govdesini bozabilir. Duz metin bolme (Replace metodu) kullanilir.
foreach ($f in $cssFiles) { $html = $html.Replace("<link rel=""stylesheet"" href=""$f"">", '') }
foreach ($f in $jsFiles)  { $html = $html.Replace("<script src=""$f""></script>", '') }

$html = $html.Replace('</head>', "<style>`n$css`n</style>`n</head>")
$html = $html.Replace('</body>', "<script>`n$js`n</script>`n</body>")

$banner = '<!-- OTOMATIK URETILDI - ELLE DUZENLEME. Kaynak: index.html + css/ + js/ + data/ + content/  ·  Yeniden uretmek icin: .\derle.ps1 -->'
$html = $banner + "`n" + $html

Set-Content -Path $out -Value $html -Encoding UTF8
Write-Host ("`ntek-dosya.html uretildi: {0:N0} KB" -f ($html.Length / 1KB)) -ForegroundColor Green
Write-Host "Acmak icin: Windows Gezgini'nden CIFT TIKLA (Claude onizleme paneli JS calistirmaz)."
