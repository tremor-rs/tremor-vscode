# Publishing

Publishing a new version of the extension

## Getting the right publisher permissions

How to attain publisher permissions:

https://stackoverflow.com/questions/56032912/vs-marketplace-add-member-displayes-invalid-domain-error

## Publishing steps

A short summary, based on published process [here](https://code.visualstudio.com/api/working-with-extensions/publishing-extension).

### If you are not logged in
1. Great a personal access token on the [tremorproject for vscode](https://tremorproject.visualstudio.com) 
  - Personal access tokens are a sub-menu of the personal settings page ( little figure with gears on right-hand side of the top browser menu )
2. **In the second field select "All accessible accounts"!!!!!!! (we forget this every time)**
3. Add 'Marketplace / Manage' permission (you have to click `show all permissios`)
4. The token is **not saved** and should be stored securely and not shared with others
5. Save the token.
  - Regenerating the token will generate a new token
  - If a token is compromised ( shared ), it should be **revoked** and a new token generated
4. run `vsce login tremorproject`
5. Provide the current non-revoked operational personal access token from this process.

### Once you're logged in

1. run `npm install`
1. run `vsce publish`

### Development

If you simply wish to develop, debug and test changes to the extension without
publication to the vscode marketplace follow the [development](./development.md) guide.
