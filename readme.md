![A CSR vue project off of which to base your apps](/public/images/logo-full.png)

## Gettings started
Run `npm run dev` to start webpacking and serving to `localhost:3005`

## Npm Scripts
 - `dev` - Starts webpacking and starts serving the content on port `3005`
 - `pack:prod` - Runs webpack in production mode
 - `serve:prod` - Starts the server in production mode (Don't forget to pack first)
 - `clean` - deletes files in the dist directory

## HTTPS/HTTP2
The application serves up only http and expects you to use a reverse proxy for TLS.  
For local testing of Http2 there is an included docker compose file and and HAProxy config.  
For deployment, using HAProxy via the included config is also reccomended.  

## Things to edit for your own project
- [ ] Customize `config/config.js`  
- [ ] Add icons  
- [ ] Author, colors, twitter names in `config/meta.config.js`

## Notes
### rel="canonical"
When you update the site to have more pages *UPDATE THE REL CANONICAL.*

### URLS
In components use relative urls for images.

### IE
<!-- Replace with a blame link after this is pushed -->
I [explicitly](/package.json) do [not support IE](https://css-tricks.com/a-business-case-for-dropping-internet-explorer/). 

### Serving
*Remember:* there are section in `/docker-compose.yml` and `/haproxy.cfg` which need to be set for your environment. You won't be able to serve it they don't match either linux or mac.

## Fonts

Preloading Fonts
https://ashton.codes/preload-google-fonts-using-resource-hints/

Getting local copies of Google Fonts
https://google-webfonts-helper.herokuapp.com

## Todos

### Maybe Todos
- [ ] Add WebpackDevServerUtils.choosePort to projects
- [ ] Add <base>

## Watch 👀
1'unsafe-inline'1 scripts in csp: 
https://github.com/vuejs/vue-style-loader/issues/33


## Feedback ✉️

[Website 🌐](https://jacobsmith.tech)

[js@jacobsmith.tech](mailto:js@jacobsmith.tech)

[https://github.com/limeandcoconut](https://github.com/limeandcoconut)

[@limeandcoconut 🐦](https://twitter.com/limeandcoconut)

Cheers!

## License

ISC, see [license](/license) for details.
