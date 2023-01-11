/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VideomatikPlayer"] = factory();
	else
		root["VideomatikPlayer"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module) => {

eval("const getContainer = (containerSelectorOrElement) => {\n  if (typeof containerSelectorOrElement === 'string') {\n    const container = document.querySelector(containerSelectorOrElement);\n    if (!container) {\n      throw new Error(`Container Selector: \"${containerSelectorOrElement}\" could not be found in the DOM`);\n    }\n    return container;\n  }\n\n  if (containerSelectorOrElement instanceof HTMLElement) {\n    return containerSelectorOrElement;\n  }\n\n  throw new Error('Container must be a HTMLElement or a Selector string');\n};\n\n/* eslint-disable no-underscore-dangle */\nclass VideomatikPlayer {\n  constructor(containerSelectorOrElement, options) {\n    const {\n      __playerURL = 'https://player.videomatik.com.br/v1',\n      apiKey,\n      templateId,\n      compositionId = 'default',\n      customJSON,\n      height = 1024,\n      width = 576,\n    } = options;\n    const container = getContainer(containerSelectorOrElement);\n    const iframe = document.createElement('iframe');\n    iframe.style.border = 'none';\n\n    const urlParamsObj = {\n      templateId,\n      apiKey,\n      compositionId,\n      // prevent player to load original animation and reload new animation with user customJSON\n      preventLoad: Boolean(customJSON),\n    };\n    const urlParams = new URLSearchParams(urlParamsObj);\n    iframe.setAttribute('src', `${__playerURL}?${urlParams.toString()}`);\n\n    iframe.width = width;\n    iframe.height = height;\n    container.appendChild(iframe);\n\n    this.iframe = iframe;\n    this.__playerURL = __playerURL;\n    this.templateId = templateId;\n    this.apiKey = apiKey;\n    this.customJSON = customJSON;\n    this.isFirstLoad = true;\n\n    window.addEventListener('message', this.onMessage);\n  }\n\n  onMessage = (event) => {\n    const { data } = event;\n    // eslint-disable-next-line default-case\n    switch (data.action) {\n      case '_onLoad':\n        this.compositions = data.payload.compositions;\n        this.duration = data.payload.duration;\n        // TODO: insert next onFirstLoad logics bellow\n        if (this.isFirstLoad) {\n          if (this.customJSON) {\n            this.setCustomJSON(this.customJSON);\n          }\n          this.isFirstLoad = false;\n          this.iframe.contentWindow.postMessage({ action: '_initialize' }, '*');\n        }\n        break;\n\n      case '_setIframeSize':\n        this.iframe.height = data.payload.height;\n        this.iframe.width = data.payload.width;\n        break;\n\n      case 'currentTime':\n        this.currentTime = data.payload.currentTime;\n        break;\n\n      case 'playerState':\n        this.playerState = data.payload.playerState;\n        break;\n\n      case 'error':\n        throw new Error(data.payload.message);\n    }\n  };\n\n  destroy() {\n    window.removeEventListener('message', this.onMessage);\n    this.iframe.remove();\n  }\n\n  play() {\n    this.iframe.contentWindow.postMessage({ action: 'play' }, '*');\n  }\n\n  pause() {\n    this.iframe.contentWindow.postMessage({ action: 'pause' }, '*');\n  }\n\n  seekTo(time) {\n    this.iframe.contentWindow.postMessage({ action: 'seekTo', payload: { time } }, '*');\n  }\n\n  setCustomJSON(customJSON) {\n    // TODO: controlar o estado de loading adequadamente\n    // this.playerState = 'loading';\n    this.iframe.contentWindow.postMessage({ action: 'setCustomJSON', payload: { customJSON } }, '*');\n  }\n\n  setComposition(compositionId) {\n    // TODO: controlar o estado de loading adequadamente\n    // this.playerState = 'loading';\n    this.iframe.contentWindow.postMessage({ action: 'setComposition', payload: { compositionId } }, '*');\n  }\n\n  setSize({\n    // This fallback is used when the user omit one of the measurements\n    // with this the animation will always resize with the one who is declared\n    height = Infinity,\n    width = Infinity,\n  }) {\n    // Use a post message to resize the animation and the player, because\n    // using an resize event listener causes a infinite resize loop:\n    //\n    // Example:\n    //\n    // - A resize is triggered from external player (via \"setSize\" function)\n    // - This leads to a resize happening in the internal player\n    //   - The internal player sends a postMessage to the outside player to\n    //     resize the external player to fit perfectly within the animation\n    //   - The outside iframe resize causes the cycle to happen again.\n    this.iframe.contentWindow.postMessage({ action: '_resize', payload: { width, height } }, '*');\n  }\n\n  setTemplate(templateId, compositionId, customJSON) {\n    this.iframe.contentWindow.postMessage({\n      action: 'setTemplate',\n      payload: {\n        customJSON,\n        templateId,\n        compositionId: compositionId || 'default',\n      },\n    }, '*');\n  }\n\n  getCompositions() {\n    return this.compositions;\n  }\n\n  getCurrentTime() {\n    return this.currentTime;\n  }\n\n  getDuration() {\n    return this.duration;\n  }\n\n  getIframe() {\n    return this.iframe;\n  }\n\n  getPlayerState() {\n    return this.playerState;\n  }\n}\nmodule.exports = VideomatikPlayer;\n\n\n//# sourceURL=webpack://VideomatikPlayer/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});