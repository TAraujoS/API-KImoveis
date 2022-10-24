import app from "./app";
import AppDataSource from "./data-source";

(async () => {
  await AppDataSource.initialize().catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log("Servidor executando");
  });
})();
