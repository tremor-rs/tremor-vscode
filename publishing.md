

Publishing has issues right now so there are a few hoops to jump through.

## Getting the permissions
If you are not yet at a publisher there is a explenation here what is needed:

https://stackoverflow.com/questions/56032912/vs-marketplace-add-member-displayes-invalid-domain-error

## Publishing

This is a short summary, a full explanation is [here](https://code.visualstudio.com/api/working-with-extensions/publishing-extension).

### If you are not logged in
1. Great a personal access token on https://tremorproject.visualstudio.com (little figure with gears on top right)
2. **In the second field select "All accessible accounts"!!!!!!! (we forget this every time)**
3. Add 'Marketplace / Manage' permission (you have to click `show all permissios`)
4. run `vsce login tremorproject`
5. provide the token from 1.

### Once you're logged in

1. run `vsce publish`