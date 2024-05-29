const app = require("./app");

// ℹ️ Sets the PORT for our app to have access to it.
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
