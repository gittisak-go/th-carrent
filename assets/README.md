Place the profile image you want to use for the Flex Message here.

Steps:

1. Save the attached image as `nang-noi.jpg` (or another filename) on your machine.
2. Copy the file into this folder (`docs/assets/`).

PowerShell example:

```pwsh
mkdir -Force .\docs\assets
cp C:\path\to\your\downloaded\image.jpg .\docs\assets\nang-noi.jpg
git add docs/assets/nang-noi.jpg
git commit -m "docs: add nang-noi avatar for Flex Message"
git push origin main
```

After pushing, the Flex Message JSON points to the raw URL:
`https://raw.githubusercontent.com/gittisak-go/th-carrent/main/docs/assets/nang-noi.jpg`

If you prefer to keep images in `public/images/` adjust the URL in the template accordingly.
