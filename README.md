# Videomatik Player SDK (Alpha!)

```
⚠ This lib is currently in alpha version and still in development, we are accepting feedback from the developers. ⚠
```

This module provides easy access to Videomatik's Player to get a preview of your video template with your customizations via the customJSON data.

Check the [Support section](#support) for help.

# Installation

```bash
npm i --save @videomatik/player@latest
```

# Usage

Simple usage example rendering the player inside a div element. 

```javascript
import VideomatikPlayer from '@videomatik/player';

const player = new VideomatikPlayer('#videomatik-player', {
  apiKey: 'WDSi8lOCua5KKzPvzx2DI86medihfQj0U8T--qSm',
  templateId: 'conheca-a-italia', 
  compositionId: 'default', 
  height: 1280,
  width: 720,
});

<div id="videomatik-player"></div>
```

## Authentication

First, you should get your Videomatik **API Key** on the [Dashboard page](https://dashboard.videomatik.com.br/api-keys/), then
you can start using this project by instantiating the main class.

```javascript
const player = new VideomatikPlayer('<css selector or HTMLElement instance>', {
  apiKey: '< your api key >',
  templateId: '< your template id >', 
  compositionId: '< the selected composition id >', 
});
```

## Options

WIP: More player options available in the future.
See a preview of future options below:

```javascript
const player = new VideomatikPlayer('#player', {
  apiKey: 'apiKey',
  templateId: 'templateId', 
  compositionId: 'compositionId',
  customJSON: {...}, // Optional, initial customJSON when load
  options: {
    autoplay: true, // default
    loaderColor: '#fffff',
    disabledLoader: false, // default
    pauseOnClick: true, // default
    progressUpdateInterval: 100, // default in milliseconds
  },
  events: {
    'onLoad' () => {},
    ...
  }
});
```

## Templates and CustomJSON

If you are not familiar with the Template and CustomJSON entities for Videomatik, please check our [API SDK documentation](https://github.com/Videomatik/node-sdk) for more information. The same concept of customJSON applies to the Videomatik Player.


# Update Player Methods

## setTemplate(templateId: String, [compositionId: String, customJSON: Object])
 - templateId: Id of the Template to set
 - compositionId *(Optional)*: Id of the template composition to set. Default is `'default'`
 - customJSON *(Optional)*: Initial customJSON to be passed on the first player render.

Updates the current template on the player, it will load the new template if not loaded yet.

Example:
```javascript
player.setTemplate(templateId, compositionId, customJSON)
```

## getCompositions()
Returns the compositions available for the current video Template. Returns `Array[Object]`.  

Example:
```javascript
player.getCompositions()

// Response Example:
[ 
  {
    compositionId: 'default', 
    displayName: 'Vertical', 
    width: 1080, 
    height: 1920
  },
  {
    compositionId: 'feed', 
    displayName: 'Quadrado', 
    width: 1080, 
    height: 1080
  }
]
```

## setComposition(compositionId: String)
- compositionId: Id of the Composition to set.

Change the composition of your template. It will load the new composition video if not loaded yet.

Example:
```javascript
player.setComposition('feed')
```

## setCustomJSON(customJSON: Object)
- customJSON`: Valid customJSON object with customized parameters for the video.

Updates the custom JSON of the video.

Example:
```javascript
player.setCustomJSON({
  "version": "1",
  "soundtrack": {...},
  "images": [...],
  "texts": [...],
  "shapes": [...],
  "colors": [...],
})
```

# Player Methods

## setSize({ height: Number, width: Number })
Updates the size of the video player. Only one dimension is required. The player will fit the dimension specified and keep the video aspect ratio.

Example:
```javascript
player.setSize({ height: 1280, width: 720 })
```

## getCurrentTime()
This method will return the current time of the video (in seconds).

## getDuration()
This method will return the total duration of the video (in seconds).

## play()
Play the video.

## pause()
Pause the video.
## seekTo(time: Number)
 - time **in seconds**

Sets the current time of the player. The time must be between 0 and the video duration.  
Example: 
```javascript
player.seekTo(12.5) // Will seek to 12.5 seconds of the video
```

## getPlayerState()
Returns the player state, which can be: `'playing'`, `'paused'` or `'loading'`.
## destroy()
Destroy the player and remove all event listeners.

# Advanced Methods

## getIframe()
This method will return the iframe HTML element.

# Error Handling

## Player API Errors

There are three known errors you can receive from our API.

| Error type            | Occurs                                                                                                                        |
|-----------------------|-----------------------------------------------------------------------------------------------------------------------------|
| Invalid API Key       | When the player is being created. Check your [Dashboard's page](https://dashboard.videomatik.com.br/api-keys/) to get the correct API key.     |
| Template not found    | When the player is being created or when you are setting a new template. Check your [Dashboard's page](https://dashboard.videomatik.com.br/templates/) to get the ID of the desired template.                                           |
| Composition not found | When the player is being created or when you are setting a new template or composition. Find valid compositions on `getCompositions()` method. |

## Render errors
### Invalid custom JSON

When an invalid custom JSON is passed to the `setCustomJson()` method or when creating the player, the Player will return the following error:

```javascript
{
  message: 'Invalid CustomJSON, verify CustomJSON fields.',
}
```
# Support

Please read the API documentation available on [Videomatik's website](https://videomatik.com.br) or contact the developers through our Discord server (invite link available at our website).
