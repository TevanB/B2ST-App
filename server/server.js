const express = require("express");
const cors = require("cors");
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
require("dotenv").config({ path: "./.env" });
const app = express();
const port = process.env.PORT || 5000;
const db = require("./config/db");
//import sms.js
const { sendSMS, getSMS, router } = require("./routes/sms");
const { analyze } = require("./marketing_system/tasks/analytics");
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// The error handler must be before any other error middleware and after all controllers
// TODO - uncomment before deploying
app.use(Sentry.Handlers.errorHandler());

app.use(cors());
app.use(express.json());

db.connect(() => {
  app.set("script", analyze());
  app.use("/user", require("./routes/user"));
  app.use("/marketing", require("./routes/marketing"));
  app.use("/plans", require("./routes/plans"))
  app.use("/subs", require("./routes/subs"))
  app.use("/marketing", require("./routes/marketing"))
  app.use("/sms", router)
  app.use("/contact", require("./routes/contact"))
  app.use("/orders", require("./routes/orders"))
  app.get("/", (req, res)=>{
    res.send("Api Running")
  })
  app.listen(port, () => {
    // perform a database connection when server starts
    console.log(`Server is running on port: ${port}`);
  });
});
