const getContainer = (containerSelectorOrElement) => {
  if (typeof containerSelectorOrElement === 'string') {
    const container = document.querySelector(containerSelectorOrElement);
    if (!container) {
      throw new Error(`Container Selector: "${containerSelectorOrElement}" could not be found in the DOM`);
    }
    return container;
  }

  if (containerSelectorOrElement instanceof HTMLElement) {
    return containerSelectorOrElement;
  }

  throw new Error('Container must be a HTMLElement or a Selector string');
};

/* eslint-disable no-underscore-dangle */
class VideomatikPlayer {
  constructor(containerSelectorOrElement, options) {
    const {
      __playerURL = 'https://player.videomatik.com.br/v1',
      apiKey,
      templateId,
      compositionId = 'default',
      customJSON,
      height = 1024,
      width = 576,
    } = options;
    const container = getContainer(containerSelectorOrElement);
    const iframe = document.createElement('iframe');
    iframe.style.border = 'none';

    const urlParamsObj = {
      templateId,
      apiKey,
      compositionId,
      // prevent player to load original animation and reload new animation with user customJSON
      preventLoad: Boolean(customJSON),
    };
    const urlParams = new URLSearchParams(urlParamsObj);
    iframe.setAttribute('src', `${__playerURL}?${urlParams.toString()}`);

    iframe.width = width;
    iframe.height = height;
    container.appendChild(iframe);

    this.iframe = iframe;
    this.__playerURL = __playerURL;
    this.templateId = templateId;
    this.apiKey = apiKey;
    this.customJSON = customJSON;
    this.isFirstLoad = true;

    window.addEventListener('message', this.onMessage);
  }

  onMessage = (event) => {
    const { data } = event;
    // eslint-disable-next-line default-case
    switch (data.action) {
      case '_onLoad':
        this.compositions = data.payload.compositions;
        this.duration = data.payload.duration;
        // TODO: insert next onFirstLoad logics bellow
        if (this.isFirstLoad) {
          if (this.customJSON) {
            this.setCustomJSON(this.customJSON);
          }
          this.isFirstLoad = false;
          this.iframe.contentWindow.postMessage({ action: '_initialize' }, '*');
        }
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
    this.iframe.contentWindow.postMessage({ action: 'seekTo', payload: { time } }, '*');
  }

  setCustomJSON(customJSON) {
    // TODO: controlar o estado de loading adequadamente
    // this.playerState = 'loading';
    this.iframe.contentWindow.postMessage({ action: 'setCustomJSON', payload: { customJSON } }, '*');
  }

  setComposition(compositionId) {
    // TODO: controlar o estado de loading adequadamente
    // this.playerState = 'loading';
    this.iframe.contentWindow.postMessage({ action: 'setComposition', payload: { compositionId } }, '*');
  }

  setSize({ height, width }) {
    if (height) {
      this.iframe.height = height;
    }
    if (width) {
      this.iframe.width = width;
    }
    // Use a post message to resize the animation and the player, because
    // using an resize event listener causes a infinite resize loop:
    //
    // Example:
    //
    // - A resize is triggered from external player (via "setSize" function)
    // - This leads to a resize happening in the internal player
    //   - The internal player sends a postMessage to the outside player to
    //     resize the external player to fit perfectly within the animation
    //   - The outside iframe resize causes the cycle to happen again.
    this.iframe.contentWindow.postMessage({ action: '_resize' }, '*');
  }

  setTemplate(templateId, compositionId, customJSON) {
    this.iframe.contentWindow.postMessage({
      action: 'setTemplate',
      payload: {
        customJSON,
        templateId,
        compositionId: compositionId || 'default',
      },
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
