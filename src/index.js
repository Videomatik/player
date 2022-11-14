/* eslint-disable no-underscore-dangle */
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

    this.iframe = iframe;
    this.__playerURL = __playerURL;
    this.templateId = templateId;
    this.apiKey = apiKey;

    window.addEventListener('message', this.onMessage);
  }

  onMessage = (event) => {
    const { data } = event;
    // eslint-disable-next-line default-case
    switch (data.action) {
      case '_onLoad':
        this.compositions = data.payload.compositions;
        this.duration = data.payload.duration;
        break;

      case 'currentTime':
        this.currentTime = data.payload.currentTime;
        break;

      case 'playerState':
        this.playerState = data.payload.playerState;
        break;

      case 'error':
        throw new Error(data.payload.message);
    }
  };

  destroy() {
    window.removeEventListener('message', this.onMessage);
    this.iframe.remove();
  }

  play() {
    this.iframe.contentWindow.postMessage({ action: 'play' }, '*');
  }

  pause() {
    this.iframe.contentWindow.postMessage({ action: 'pause' }, '*');
  }

  seekTo(time) {
    this.iframe.contentWindow.postMessage({ action: 'seekTo', time }, '*');
  }

  setCustomJSON(customJSON) {
    // TODO: controlar o estado de loading adequadamente
    // this.playerState = 'loading';
    this.iframe.contentWindow.postMessage({ action: 'setCustomJSON', customJSON }, '*');
  }

  setComposition(compositionId) {
    // TODO: controlar o estado de loading adequadamente
    // this.playerState = 'loading';
    this.iframe.contentWindow.postMessage({ action: 'setComposition', compositionId }, '*');
  }

  setSize({ height, width }) {
    if (height) {
      this.iframe.height = height;
    }
    if (width) {
      this.iframe.width = width;
    }
  }

  setTemplate(templateId, compositionId, customJSON) {
    this.iframe.contentWindow.postMessage({
      action: 'setTemplate',
      customJSON,
      templateId,
      compositionId: compositionId || 'default',
    }, '*');
  }

  getCompositions() {
    return this.compositions;
  }

  getCurrentTime() {
    return this.currentTime;
  }

  getDuration() {
    return this.duration;
  }

  getIframe() {
    return this.iframe;
  }

  getPlayerState() {
    return this.playerState;
  }
}
module.exports = VideomatikPlayer;
