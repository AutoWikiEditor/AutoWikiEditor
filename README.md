[![Build Status](https://travis-ci.org/AutoWikiEditor/AutoWikiEditor.svg?branch=master)](https://travis-ci.org/AutoWikiEditor/AutoWikiEditor)

# AutoWikiEditor

AutoWikiEditor is a semi-automated MediaWiki editing tool, a web-based heir of AutoWikiBrowser. It is still in early stages of development.

# Development

## Code style

See the code for a live example of formatting used. Details:
* Use tabs for indentation, don't assume any particular tab width.
* Always use blocks in conditionals, even if you need to write a single line:
```lang=js
if (foo)
    bar(); // BAD

if (foo) {
    bar(); // GOOD
}
```

## Testing
* Write tests for all the backend code. Yes, that means that all code must be testable!
* Never commit code with failing tests.

## Browser support
Unlike Wikipedia, we don't need to support every prowser in existence, current minimum requirement is ES6 support.
