/*____________¶¶¶
___________¶___¶
____________¶¶¶
____________¶_¶
____________¶_¶
__________¶¶¶_¶¶¶
________¶¶__¶¶¶__¶¶¶
______¶¶__¶¶¶¶¶¶¶___¶
_____¶_______________¶
____¶_________________¶
____¶_________________¶
____¶_____¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶
____¶____¶_______________¶
____¶____¶___¶¶¶¶¶¶¶¶¶¶¶¶¶
____¶___¶___¶___________¶¶¶
____¶___¶___¶_¶¶¶___¶¶¶__¶¶
____¶___¶___¶_¶¶¶___¶¶¶__¶¶
____¶___¶___¶___________¶¶¶
____¶____¶___¶¶¶¶¶¶¶¶¶¶¶¶¶
____¶_____¶¶¶¶¶¶¶¶¶¶¶¶¶¶
____¶_________________¶
____¶____¶¶¶¶¶¶¶¶¶¶¶¶¶¶
____¶___¶__¶__¶__¶__¶
____¶__¶¶¶¶¶¶¶¶¶¶¶¶¶¶
____¶__¶___¶__¶__¶__¶
____¶___¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶
___¶¶¶_________________¶¶¶
I am going to build my own logo whit blackjack and hookers
In fact forget the logo.
*/
const server = require("./src/app.js");
const { conn } = require("./src/db.js");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3010, () => {
    console.log("%s listening at 3010"); // eslint-disable-line no-console
  });
});
