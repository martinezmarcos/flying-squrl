const hostnameElement = document.getElementById('help-hostname')

if (hostnameElement) {
    const searchUrl = `${window.location.protocol}//${window.location.hostname}/search?cmd=%s`
    hostnameElement.innerHTML = searchUrl

    const searchUrlCopyButton = document.getElementById('help-searchUrl-copy')
    searchUrlCopyButton.onclick = async () => {
        await navigator.clipboard.writeText(searchUrl)
        alert('Copied URL!')
    }
}
