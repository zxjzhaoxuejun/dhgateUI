# VueShare
社交分享组件

```javascript
import {VueShare} from 'dhgate-ui'
```
##### HTML
### Using the Share Network component

```html
<vue-share
    shareMethod="facebook"
    url="https://news.vuejs.org/issues/180"
    title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
    description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
    quote="The hot reload is so fast it\'s near instant. - Evan You"
    hashtags="vuejs,vite"
  >
    Share on Facebook
</vue-share>
```

## Available networks and properties

The `url` is the only property required for all networks.

###### General properties

Name           | Data Type  | Description
-------------- | ---------- | -----------
`tag`          | String     | HTML tag used to render the network component. Default to "a" tag.

###### Baidu

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.

###### Buffer

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.

###### Email

Name           | Data Type  | Description
-------------- | ---------- | -----------
`title`        | String     | Shared as the email subject.
`url`          | String     | Shared in the email content.
`description`  | String     | Shared in the email content after the url.

###### EverNote

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.

###### Facebook

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.
`description`  | String     | Description of the shared content.
`quote`        | String     | A quote from the shared content.
`hashtags`     | String     | A list of comma-separated hashtags, only the first one will used by Facebook.

###### FlipBoard

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.

###### HackerNews

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.

###### InstaPaper

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.
`description`  | String     | Description of the shared content.

###### Line

Name           | Data Type  | Default   | Description
-------------- | ---------- | --------- | -----------
`title`        | String     | Shared in the message content.
`url`          | String     | Shared in the message content after the title.
`description`  | String     | Shared in the message content after the url.

###### LinkedIn

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.

###### Odnoklassniki

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.

###### Pinterest

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.
`media`        | String     | URL of an image describing the content.

###### Pocket

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.

###### Reddit

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.

###### Skype

Name           | Data Type  | Description
-------------- | ---------- | -----------
`title`        | String     | Shared in the message content.
`url`          | String     | Shared in the message content after the title.
`description`  | String     | Shared in the message content after the url.

###### SMS

Name           | Data Type  | Description
-------------- | ---------- | -----------
`title`        | String     | Shared in the message content.
`url`          | String     | Shared in the message content after the title.
`description`  | String     | Shared in the message content after the url.

###### StumbleUpon

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.

###### Telegram

Name           | Data Type  | Description
-------------- | ---------- | -----------
`title`        | String     | Shared in the message content.
`url`          | String     | Shared in the message content after the title.
`description`  | String     | Shared in the message content after the url.

###### Tumblr

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.
`description`  | String     | Description of the shared content.

###### Twitter

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.
`hashtags`     | String     | A list of comma-separated hashtags.
`twitter-user` | String     | Twitter user to mention.

###### Viber

Name           | Data Type  | Description
-------------- | ---------- | -----------
`title`        | String     | Shared in the message content.
`url`          | String     | Shared in the message content after the title.
`description`  | String     | Shared in the message content after the url.

###### VK

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.
`description`  | String     | Description of the shared content.
`media`        | String     | URL of an image describing the content.

###### Weibo

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.
`media`        | String     | URL of an image describing the content.

###### WhatsApp

Name           | Data Type  | Description
-------------- | ---------- | -----------
`title`        | String     | Shared in the message content.
`url`          | String     | Shared in the message content after the title.
`description`  | String     | Shared in the message content after the url.

###### Wordpress

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.
`description`  | String     | Description of the shared content.
`media`        | String     | URL of an image describing the content.

###### Xing

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.

###### Yammer

Name           | Data Type  | Description
-------------- | ---------- | -----------
`title`        | String     | Shared in the message content.
`url`          | String     | Shared in the message content after the title.
`description`  | String     | Shared in the message content after the url.

#### Available events

Events that are emitted on the vue $root instance:

Name                   | Data                       | Description
---------------------- | -------------------------- | --------------------------------------------------------------------------
`share_network_open`   | Network name, shared url   | Fired when a sharing popup is open
`share_network_change` | Network name, shared url   | Fired when the user open a new sharing popup while another is already open
`share_network_close`  | Network name, shared url   | Fired when a sharing popup is closed or changed by another popup

You can listen to a `vue-share` $root event by using the following code:
```javascript
Vue.$root.$on('share_network_open', function (network, url) {
  // your event code
});
```

Events that are emitted on the local `vue-share` instance:

Name                   | Data                       | Description
---------------------- | -------------------------- | --------------------------------------------------------------------------
`open`   | Network name, shared url | Fired when a sharing popup is open
`change` | Network name, shared url | Fired when the user open a new sharing popup while another is already open
`close`  | Network name, shared url | Fired when a sharing popup is closed or changed by another popup

You can listen to a `ShareItem` local event by using the following code:
```html
<ShareItem @open="open" @change="change" @close="close" />
```

> Note that the `share_network_close` event will not be fired for the WhatsApp, SMS and Email sharers.
