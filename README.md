# hawk

easier than bookmarks. use hawk to organize your shortcuts in a clean ui, and access them with keyboard abbreviations.

![screenshot](screenshot.png)

## features

* literature clock to tell you the time but make it cool
* shortcuts that make bookmarks look weak
* support for calling apis and displaying output on the page
* access to the infinite internet (thanks google)

## requirements

* `npm`
* working knowledge of dictionaries

## getting started

fork this repo and clone it. then, run `npm install` followed by `npm run dev`. your start page is now running at http://localhost:3000! make some changes -- next.js will hot reload these while in dev mode.

once you're satisfied, run `npm run export`. this will generate an `out` folder that can be statically served.

## editing shortcuts

hawk has four types of shortcuts:

### keys
dictionaries but with a specified base url. for youtube channels, you'd want to use https://youtube.com/ as a base without having to type it out for every key-value pair. see some examples (and edit to your shortcuts!) in `data/with_keys.json`, copied partially below.

access by typing `@base key` into the search box and hitting enter (for example, `@gh h`).

```json
{
    "gh": {
        "base": "https://github.com/itsvs/",
        "hint": "some of my github repos",
        "keys": {
            "h": "hawk",   // https://github.com/itsvs/hawk
            "d": "dna",    // https://github.com/itsvs/dna
            "s": "starter" // https://github.com/itsvs/starter
        }
    }
}
```

### suffixes
ports, pages, shortlink targets, you name it. use tinyurl often? set it up as a suffix-based shortcut! stored in `data/with_suffix.json`, copied partially below.

access by typing `@base suffix` into the search box and hitting enter (for example, `@l 3000`).

```json
{
    "l": {
        "base": "http://localhost:",
        "suffix": "port",
        "hint": "localhost"
    },
    "t": {
        "base": "https://tinyurl.com/",
        "suffix": "shortlink",
        "hint": "tinyurl"
    }
}
```

### direct
exactly what it sounds like. stored in `data/with_direct.json`, copied below.

access by typing `-key` (for example, `-m`).

```json
{
    "m": {
        "link": "https://mail.google.com",
        "title": "gmail"
    }
}
```

### commands
handy dandy plaintext-output commands that may make things fun and easy for you to access. stored in `data/with_command.js` (not `.json`!).

access by typing `/key input` (for example, `/w berkeley`). add a command by following the template given for the weather command, copied partially below. the most important parts are the key, the `call` function, and the fact that the output should be displayed by calling `$(outputTarget).text(...)`.

```js
export default {
    w: {
        hint: "weather",
        title: "city",
        call: function weather(plus) {
            var url = "https://api.openweathermap.org/data/2.5/weather?q=" + plus;

            fetch(
                url + "&units=imperial&appid=" + owmAppId
            )
                .then((response) => response.json())
                .then((js) => {
                    var desc = js.weather["0"].description;
                    var temp = js.main.temp;
                    $(outputTarget).text(desc + ", " + temp + "F");
                });
        },
    },
};
```

## customizing

the first 15 lines of `public/style.css` are probably the most relevant.

```css
/* change this line to change the font used on the page */
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap');

* {
    /* change these to change how text is displayed */
    font-family: "Lato", sans-serif;
    font-size: large;
    color: whitesmoke;
    text-transform: lowercase;
    background-color: transparent;
}

body {
    /* change this to change the page background */
    background-image: linear-gradient(rgba(58, 58, 58, 0.8), rgba(58, 58, 58, 0.8)), url('https://source.unsplash.com/1920x1080/?nature+water');
    background-size: cover;
}
```

## credits

* literature clock: [@JohannesEN](https://github.com/JohannesNE/literature-clock)
* background images: [unsplash](https://unsplash.com/)

## license
this project is licensed under the mit license. see [license](LICENSE.md) for more information.