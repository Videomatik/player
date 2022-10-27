class VideomatikPlayer {
  constructor(containerSelector, options) {
    const {
      __playerURL,
      apiKey,
      templateId,
      compositionId = 'default',
      maxHeight = '100%',
      maxWidth = '100%',
    } = options;
    const container = document.querySelector(containerSelector);
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', `${__playerURL}/v1?templateId=${templateId}&apiKey=${apiKey}&compositionId=${compositionId}`);

    iframe.width = maxWidth;
    iframe.height = maxHeight;
    container.appendChild(iframe);
  }
}
module.exports = VideomatikPlayer;
