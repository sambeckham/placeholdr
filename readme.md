#Placeholdr

A placeholder image generator—similar to [placekitten](http://placekitten.com)—that pulls in images from [flickr](http://flickr.com).

##Usage
The URI structure goes like so:

http://localhost:3000/`[tag(s)]`/`[width]`/`[height]`

Note: In the absence of the height attribute, the image becomes a square based off the width.

##Setting up
Open up terminal and run the following for an example.

`npm install`
`npm start`
`open http://localhost:3000/banana/1024/`