# Videomatik PLAYER

This module provides easy access to Videomatik's PLAYER to get a preview of your video template.

# Installation

```bash
npm i --save @videomatik/player
```

# Usage

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

## Templates

Videomatik is based on templates that can be seen on the platform browsing all templates available to edit. If you have access to private templates they will be available through the API too.
Templates may also have multiple compositions, which are different resolutions of the video. The most commons compositions IDs are `'default'`, usually a Vertical video (1080x1920), and `'feed'`, which is a square video (1080x1080).

## Custom JSON Concept

The customJSON is an object associated with a video Template with all the attributes you can edit to customize a video using a template. When requesting a customJSON from a template or sending your customized JSON to request a Video, it should have the following attributes:

  - **images**: Array of objects with Images available to edit.
    - Images should contain a `source` attribute which should be a public URL with the image to replace in the video. It should be in JPG or PNG format.
  - **texts**: Array of objects with Texts available to edit.
    - Texts may contain attributes like the text itself, font family, font size, font-weight, color, and more.
  - **shapes**: Array of objects with Shapes available to edit.
    - Shapes have an attribute `color` which is the color of the shape.
  - **colors**: (Optional) Array of objects with Colors available to edit.
  - **toggles**: (Optional) Array of objects with Toggle features available to edit.

Some templates may be available only through the API and their Custom JSON may be different.

# Methods


## Play: play()
This method will play the template animation.
```javascript
player.play()
```

## Pause: pause()
This method will pause the template animation.
```javascript
player.pause()
```
## Seek To: seekTo(frame)
This method sets the current frame of the animation. You need to pass the desired frame to the function.
```javascript
player.seekTo(frame)
```

## Destroy: destroy()
This method will destroy the player and remove all event listeners.
```javascript
player.destroy()
```

## Get Template Compositions: getCompositions()
This method will return the compositions for the playing animation. It will return an array of objects, where each object is an composition of the template.
```javascript
player.getCompositions()

// Response Example:
// [ 
//   {
//     compositionId: 'default', 
//     displayName: 'Vertical', 
//     width: 1080, 
//     height: 1920
//   },
//   {
//     compositionId: 'feed', 
//     displayName: 'Quadrado', 
//     width: 1080, 
//     height: 1080
//   }
// ]
```

## Get Animation Current Time: getCurrentTime()
This method will return the current frame of the animation. It will return the value in seconds.
```javascript
player.getCurrentTime()

// Response Example:
// 2.91

```

## Get Animation Duration: getDuration()
This method will return the total duration in seconds of the animation. It will return the value in seconds.
```javascript
player.getDuration()

// Response Example:
// 15
```

## Get Iframe: getIframe()
This method will return the iframe HTML tag.
```javascript
player.getIframe()

// Response Example:
// <iframe 
//  src="" 
//  width="100%" 
//  height="100%" >
// </iframe>
```

## Get Player State: getPlayerState()
This method will return the player state, that can be: playing, paused and loading.
```javascript
player.getPlayerState()

// Response Example:
// playing
// paused
// loading

```

## Set Custom JSON: setCustomJSON(customJSON)
This method will let you change the custom JSON of the animation. You will only need to pass the new custom JSON..
```javascript
player.setCustomJSON(customJSON)
```

## Set Composition: setComposition(compositionId)
This method will let you change the composition of your template. You will only need to pass the composition Id.
```javascript
player.setComposition(compositionId)
```

## Set Animation Size: setSize({ height, width })
This method will let you set the size of animation. You will need to pass the height and width desired, you don't need to pass both of them. The player will always make sure the aspect ratio of the animation is preserved, so it will fit the dimensions passed.
```javascript
player.setSize({ height, width })
```

## Set Template: setTemplate(templateId, compositionId, customJSON)
This change the template of the animation. You will need to pass the template Id, the composition Id, the custom JSON are optional in case you don't want the default composition or you want to update the default custom JSON.
```javascript
player.setTemplate(templateId, compositionId, customJSON)
```