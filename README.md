## Waste an Hour Having Fun

a rock paper scisossros game for lazy people wanting to waste time.

### User story

As a bored lazy person I would like to:

> Play rock paper scisossros vs my device.

> Track my score and the possiblilty to reset it in case I'm losing.

> Keep the score even if I closed the browser.

> Play with both mouse and keyboard.

> I might be too lazy to think so I want to watch my device play against himself.

> When I open the game I want it to be in the same mode it was when I closed it the last time.

> Able to play using my smartphone or tablet.

> Able to play on diffrent browsers.

### Running Instructions.

1. Clone this repo.
2. Install depndancies `npm install`
3. Build the app `npm run build`
4. Start the app `npm start`
5. Waste Time

### Contributing

- If you want to extend the game:
  - Go to `src/config.json`
  - Add a new key for the new item with an object as value, the object will contain keys of other items that has 0 or 1 as a value. 0 if the new item is weaker and 1 if srtoneger and make sure the new image in the html file has an attribute `data-choice` with the same name as the key. you don't need to change anything else. e.g.

```json
spock: {
"rock": 1,
"paper": 0,
"scissors": 1
}
```

```html
 <li data-choice='spock'>
    <img src="./assets/spock.png" alt="spock">
</li>
```

- write tests for the new cases. I will appreciate it if you also wrote more UI autmoated tests.

- Run `npm run watch` for watching changes and auto-build.

- You could use the latest es6 syntax. as it's all transformed while building.

- Becareful there is a precommit hook for code format, linter, copy paste detection and tests.

### Stack:

- Browserify and Babel: to transform es6 syntax to es5 for cross borwser support.
- Mocha, Chai and Puppeteer: for end -to-end testing.
- Prettier and Eslint : for code formatting and linting.
- jscpd: for copy paste detection.
- nyc: for code coverage.

Developed for Chrome Version 68.0.3440.84

Tested on:

- Desktop: Chrome Version 68.0.3440.84 and Firefox Quantom Version 61.0.1
- Smartphone: One plus 6 running android 8.1.0
