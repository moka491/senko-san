import { createToken, Lexer } from "chevrotain";

/* TOKENS */
// General text tokens
const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /\s+/,
  group: Lexer.SKIPPED,
});
const String = createToken({
  name: "String",
  pattern: /"[^"]+"/,
});
const Number = createToken({
  name: "Number",
  pattern: /"[^"]+"/,
});
const Separator = createToken({
  name: "Separator",
  pattern: /(and|,)/i,
});

// Command prefix tokens
const Every = createToken({ name: "Every", pattern: /(every|each)/i });
const Next = createToken({ name: "Next", pattern: /next/i });
const ToRun = createToken({ name: "ToRun", pattern: /to run/i });
const To = createToken({ name: "To", pattern: /to/i });
const At = createToken({ name: "At", pattern: /at/i });
const Mentioning = createToken({ name: "Mentioning", pattern: /mentioning/i });

// Command content tokens
const Weekday = createToken({
  name: "Weekday",
  pattern: /(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i,
});
const TimeUnit = createToken({
  name: "TimeUnit",
  pattern: /(seconds|minutes|hours|days|months)/i,
});
const TimeUnitSingle = createToken({
  name: "TimeUnitSingle",
  pattern: /(second|minute|hour|day|month)/i,
});

const User = createToken({
  name: "User",
  pattern: /@\w+/,
});

const UserMe = createToken({
  name: "UserMe",
  pattern: /me/,
});

/*

-schedule every Monday to run "say hello"
-schedule every day to run "say hello" mentioning me, @User1 and @User2
-schedule every 3 minutes mentioning me to run "say time to ping you"

-remind me and @User1 to "watch anime now!" every day at 20:00

-schedule [every day] [to run "say hello"] [mentioning me, @User1 and @User2] 


*/
