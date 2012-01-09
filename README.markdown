# DidYouMean.js
DidYouMean takes a query and returns similar words based on a dictionary of words that you feed it.

## Demo
Take a look at the [demo](http://dl.dropbox.com/u/46441/didYouMean/demo.html)

## Example usage
``` js
var dym = new DidYouMean(['hello', 'goodbye']);
var suggestions = dym.query('helo'); // this returns ['hello']
```

### Implementation
A [BK-Tree](http://en.wikipedia.org/wiki/BK-tree) is created with your dictionary words as nodes. When queried, it uses [Levenshtein Distance](http://en.wikipedia.org/wiki/Levenshtein_Distance) to compare how similar your query is to the words in the tree. If a word is within a certain edit distance threshold (default: 2), it's returned as a suggestion.
