## Setup prettier for Javascript

https://github.com/prettier/eslint-config-prettier

## configuring IDE

### Vscode

`prettier-vscode` can be installed using the extension sidebar – it’s called “Prettier - Code formatter.” [Check its repository for configuration and shortcuts](https://github.com/prettier/prettier-vscode).

If you’d like to toggle the formatter on and off, install vscode-status-bar-format-toggle.

setting default formatter:

```
// my-project.code-worspace
{
	"settings": {
		"[javascript]": {
			"editor.defaultFormatter": "esbenp.prettier-vscode",
            "editor.formatOnPaste": true,		// Default (format when you paste)
            "editor.formatOnSave": true,// Default (format when you save)
		}

	}
}
```

### Webstorm

see [this](https://prettier.io/docs/en/webstorm.html) for more details.

### Installing packages

-   vscode
-   webstorm

###

### Prettier config format

Recomended to be in js, to allow comments.
