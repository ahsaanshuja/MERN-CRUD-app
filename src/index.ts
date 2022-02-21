import { createConnection } from "typeorm";
import * as express from "express";
import { Blog_posts } from "./entity/post";
import postRoutes from "./routes/post.route";

const app = express();
const main = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "kwanso123",
      database: "typeORM-CRUD",
      synchronize: true,
      entities: [Blog_posts],
    });
    console.log("Connected to Postgres");
    app.use(express.json());
    app.use(postRoutes);
    app.listen(8080, () => {
      console.log("Now running on port 8080");
    });
  } catch (error) {
    console.log(error);
  }
};

main();
