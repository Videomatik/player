/* eslint-disable no-underscore-dangle */
class VideomatikPlayer {
  constructor(containerSelector, options) {
    const {
      __playerURL,
      __apiURL,
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
    this.__apiURL = __apiURL;
    this.__playerURL = __playerURL;
    this.templateId = templateId;
    this.apiKey = apiKey;

    const onMessage = (event) => {
      const { data } = event;
      if (data.action === 'animationDuration') {
        this.animationDuration = Number(data.animationDuration);
      }
      if (data.action === 'currentTime') {
        this.currentTime = data.currentTime;
      }
      if (data.action === 'playerState') {
        this.playerState = data.playerState;
      }
    };
    window.addEventListener('message', onMessage);
  }

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

  seekTo(frame) {
    this.iframe.contentWindow.postMessage({ action: 'seekTo', frame }, '*');
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

  async getCompositions() {
    const response = await fetch(`${this.__apiURL}/v1/templates/${this.templateId}/compositions`, {
      headers: {
        Authorization: this.apiKey,
      },
    });
    return response.json();
  }

  getCurrentTime() {
    return this.currentTime;
  }

  getDuration() {
    return this.animationDuration;
  }

  async getFonts() {
    const response = await fetch(`${this.__apiURL}/player/v1/get-user-fonts`, {
      headers: {
        Authorization: this.apiKey,
      },
    });
    return response.json();
  }

  getIframe() {
    return this.iframe;
  }

  getPlayerState() {
    return this.playerState;
  }
}
module.exports = VideomatikPlayer;
