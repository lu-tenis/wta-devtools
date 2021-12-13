# Best victories ranking wise

This little script provides the best victories ranking wise for WTA players. It prints both all the victories of the player (sorted by the opponent's ranking) and the best 10 victories ranking wise (in a more human-readable way).

### Attention!
You need to use a desktop browser. Also, as it extracts the info from the WTA website, only the tournaments that have already been counted towards the ranking are considered (this is, tournaments from the current week and W15&W25 tournaments are not taken into account).

### Instructions

1. Go to the WTA profile of the player

2. Go to the Matches tab

3. Make sure the filters show all years and all tournaments for singles matches

4. Scroll down until you see a black rectangle saying "Show more". Click on the button until you see all the matches of the player and the black button doesn't show anymore

5. Open the Developer Tools of the browser (you can Google how to do that in your browser, but generally it's `F12`, or `Ctrl`+`Shift`+`c`, or "Right click > Inspect") and go to the Console tab

6. Copy the code from the `best_victories_ranking_wise.js` file, paste it in the Console tab of the Developer Tools and hit `Enter` to execute it

7. As mentioned before, all the victories (sorted by the opponent's ranking) and the best 10 victories ranking wise will be printed on screen.


#### Considerations
This has been developed for singles matches. It won't work for doubles, as the ranking of the opponents doesn't appear on the WTA website.

Even if it has been developed for singles matches, I don't guarantee it works perfectly. Take this into account when using it!

If you see any bug, let me know on Twitter! ([@lu_tenis](https://twitter.com/lu_tenis))