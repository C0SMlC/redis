const app = require("./app");
const morgan = require("morgan");

app.use(morgan("dev"));

const server = app.listen(3000, () => {
  console.log(`Listening to port 3000`);
});
