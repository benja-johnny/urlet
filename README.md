# urlet

Share the contents of a webpage via URL.

[Click here to get it!](https://benja-johnny.github.io/urlet/bookmarklet/)


## Features

- Exclude HTML by tags: Style, Script, Link, Meta, Template, Comment.
- Compression algorithms to choose from: lz-string, base-64.
- Share the generated URL via: direct link, GitHub Gist, Pastebin.
- Open shared links easily: The bookmarklet will try to load published URLs if it is clicked on the Pastebin website.
- The URL length counter goes from green to red. Green means the link is safe to share and will most likely work as expected.


## Bugs, Limitations

- The github.io page has to be online for the bookmarklet to work.
- Many websites (such as GitHub) do not allow bookmarklets to run.
- Style and script preservation only works if they are part of the document or in a linked .css or .js file.
- Images are not preserved.
- GitHub Gist and Pastebin sharing need API keys to work.
- Publishing to Pastebin is limited to 11 pastes per 24 hours.
- If the URL length counter is red, the link will most likely not work as expected and the browser may crash.


## Special Thanks

- [jstrieb](https://github.com/jstrieb) (idea source - [urlpages](https://github.com/jstrieb/urlpages))
- [pieroxy](https://github.com/pieroxy) (compression algorithm - [lz-string](https://github.com/pieroxy/lz-string))
- [Rob Wu](https://github.com/Rob--W) (CORS Anywhere - [cors-anywhere](https://github.com/Rob--W/cors-anywhere))


## Disclaimer

The developer will not be held responsible for improper use of this software.
