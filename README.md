# s2v-iia-shoppingcart-demo

This is a working demo of a native HTML5 Shoping cart that uses drag and drop (dropable) features to select a specific colour of a Sphero. Then after checking out the cart, it will hook into the "s2v-iia-sphero-node"  project (also found in this account as a separate repository) and changes the colour of the Sphero depending on the selected colour(s).

In order to run it, simply:

1. Clone or Download the Zip file for this repository
2. Open the file cart.js and at the very end, update the following variables:
      > globalIPAddress: Set the IP Address where you are running the "s2v-iia-sphero-node" server. For example, in my case:
            var globalIPAddress = "10.0.0.97";
      > globalPort: By default it uses port 3001. If you changed the default port in project "s2v-iia-sphero-node", change accordingly
3. Open the main HTML file: "s2v_iii_shoppingcart.html"
4. Drag and drop any preferred Sphero Colour into the droppable are and checkout your account.
5. That's it, enjoy seeing how your Sphero changes colours.


NB... You can drop multiple Spheros colours and checkout your cart, notice how the Sphero changes colours accordingly.

If you have any question or comment, do not hesitate to drop an email to barack.dorman@gmail.com

Thanks for watching...


