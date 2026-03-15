# GitScribe

[GitScribe](https://git-scribe-aybm.vercel.app/) is a tool for developers to generate commit message suggestions.

There are two ways to use it:

- Command Line Interface (CLI) using Python Package Manager
- Uploading Files on our web-interface on our website [GitScribe](https://git-scribe-aybm.vercel.app/) 



## CLI Installation

For both Windows and Mac OS systems, install gitscribe on terminal/command prompt/powershell. Make sure you have Python Package Manager installed first.
```
pip install gitscribe-cli
```

Check you have it installed by entering this in your terminal:
```
pip --version
```
[Offical pip installation documentation](https://pip.pypa.io/en/stable/installation/)

### Using GitScribe in Terminal

1. First setup gitscribe with
```
gs setup
``` 
2. Setup your GitHub model personal access token

[Quick Start Guide (Part 1)](https://docs.github.com/en/github-models/quickstart)

[Personal Access Token Information](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

2. First make sure you are in the repository you want to generate a commit message for.

3. Generate commit message.
```
gs generate
```
### Optional

To get multiple commit message suggestions use the -nm flag.

Example:
```
gs generate -nm 3
```
This will generate three commit messages.

## Using Our Website

1. Go to [GitScribe](https://git-scribe-aybm.vercel.app/)
2. Log in with your GitHub account
3. Upload the old version of your file first
4. Upload the new version of your file under
5. Enter the amount of suggestions you want to generate
6. View the generated messages below, copy them with the copy button

