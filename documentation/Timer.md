# Timer Syncing in Charades

This should probably just be a medium article. But here are the challenges of syncing time across multiple devices in JS and how we handled them.

### Problem

We knew we wanted to start a timer at the same time for all users across different devices in different timezones. We also knew that we wanted this to be a mostly client side process where once the timer starts it does not need to keep pinging the server to check if it is still at the same time. Ultimately the times didn't need to be 100% accurate with each other but should be close enough for no confusion.

### First Approach - setInterval()

When the actor clicks "ready" the server would set the round start as 5 seconds in the future and emit that updated party object to all clients. Then client side the timer would start when their system time was equal to the remote time. The timer would then use `setInterval` to increment the timer each second.

Unfortunatly `setInterval` is unreliable. If a users computer or phone is under heavy load, the interval will fire late. Similarly, if the users phone goes to sleep or navigates away from the browser, the interval will pause until they refocus on the window. This meant that users would see wildly different times.

Another potential problem with this, is that if a users system clock happens to be different from our server (something rare in these modern times but still worth considering) then the timers would be off by that difference.

These three problems: unreliable intervals, falling asleep phones, and differing system clocks meant we needed a new solution.

### Working Solution - setTimeout() with resync at every 10th of a second with server/client system clock sync

To solve the issue of differing system clocks we calulate the difference between the servers time and each client and use add that difference to the end time of a round (see `useServerTime.js` hook). This means that even if a client clock had been manually set to something completely random the timer should still be in sync.

Two fix the issues caused by setInterval, we use recursivly call setTimeout every 10th of a second until the time runs out.

This solves the issue of unreliable intervals b/c setInterval is adjustable
