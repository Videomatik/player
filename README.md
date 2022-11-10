# Videomatik Player SDK (Alpha!)

```
⚠ This lib is current in alpha version and still in development, we are accepting feedbacks from the developers. ⚠
```

This module provides easy access to Videomatik's Player to get a preview of your video template with your customizations via the customJSON data.

Check the [Support section](#support) for help.

# Installation

```bash
npm i --save @videomatik/player@latest
```

# Usage

Simple usage example rendering the player inside a div element:

```javascript
TODO
```

## Authentication

First, you should get your Videomatik API **Api Key** on your [Account Settings](https://videomatik.com.br/settings/), then
you can start using this project by instantiating the main class.

```javascript
import VideomatikPlayer from '@videomatik/player';

const player = new VideomatikPlayer('<css selector or HTMLElement instance>', {
  apiKey: '< your api key >',
  templateId: '< your template id >', 
  compositionId: '< the selected composition id >', 
});
```

## Templates and CustomJSON

If you are not familiar with the Template and CustomJSON entities for Videomatik, please check our [API SDK documentation](https://github.com/Videomatik/node-sdk) for more information. The same concept of customJSON applys to the Videomatik Player.

# Methods

## Update Player Methods
## setTemplate(templateId: String, [compositionId: String, customJSON: Object])
 - templateId: Id of the Template to set
 - compositionId *(Optional)*: Id of the template composition to set. Default is `'default'`
 - customJSON *(Optional)*: Initial customJSON to be passed on the first player render.

Updates the current template on the player, it will load the new template if not loaded yet.

### Errors
// TODO Errors

Example:
```javascript
player.setTemplate(templateId, compositionId, customJSON)
```

## getCompositions()
Returns the compositions available for the current video Template. 
Returns `Array[Object]`.
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
- compositionId: Id of the Composition to set
Change the composition of your template, it will load the new composition video if not loaded yet.

```javascript
player.setComposition('feed')
```

## setCustomJSON(customJSON: Object)
- customJSON`: Valid customJSON object with customized parameters for the video.

Updates the custom JSON of the video.
```javascript
player.setCustomJSON({
  // TODO
})
```

## setSize({ height: Number, width: Number })
Updates the size of the video player. Only one dimension is required. The player will fit the dimension specified keep the video aspect ratio.
```javascript
player.setSize({ height: 1280, width: 720 })
```

## play()
Play the video player.
```javascript
player.play()
```

## pause()
Pause the video player.
```javascript
player.pause()
```
## seekTo(time: Number)
 - time: in Seconds

Sets the current time of the player. The time must be between 0 and the video duration.
```javascript
player.seekTo(12.5) // Will seek to 12.5 seconds of the video
```


## getCurrentTime()
This method will return the current time(seconds) of the video.
```javascript
player.getCurrentTime()

// Response Example:
2.91

```

## getDuration()
This method will return the total duration in seconds of the video. It will return the value in seconds.
```javascript
player.getDuration()

// Response Example:
15
```

## getPlayerState()
This method will return the player state, that can be: playing, paused and loading.
```javascript
player.getPlayerState()

// Responses Example:
'playing'
'paused'
'loading'

```



## destroy()
Destroy the player and remove all event listeners.
```javascript
player.destroy()
```

## Advanced Methods

## getIframe()
This method will return the iframe HTML element.
```javascript
player.getIframe()
```

# Support

Please read the API documentation available on [Videomatik website](https://videomatik.com.br) or contact the developers through our Discord server, (invite available at our website).