Some scripts to make life easier at ronin.

wallet-balance - Displays the ron or other token balance of all wallets

wallet-create - Create as many wallets as you need

wallet-disperse - Distributes ron or any other token in several wallets

wallet-refund - Get back all your ron or tokens back to one wallet

wallet-import - Import all wallets into your browser's ronin wallet extension.

wallet-import
Add the wallet's unlock password to the script.
Create a browser shortcut, in property > destination. Add the following line:
--remote-debugging-port=9222

Open the browser and then run the script:
node wallet-import

TODO:
promise to make multi transactions at same time.
implement https://scatter.roninchain.com/ to disperse tokens.

If you need any help, send me a message
