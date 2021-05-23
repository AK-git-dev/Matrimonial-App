import { join } from "path";
import { Sequelize } from "sequelize";

class Database {
  private dir = join(__dirname, "");
  public schema: Sequelize;
  constructor() {
    // For MySQL Setup
    this.schema = new Sequelize("matrimonialDB", "root", "root", {
      dialect: "mysql",
      pool: {
        min: 5,
        max: 10,
      },
    });

    // For SQLITE3 Setup
    // this.schema = new Sequelize({
    //   dialect: "sqlite",
    //   storage: `${this.dir}/db-store.sqlite`,
    //   database: "projectDB",
    // });

    this.authenticate();
  }

  /**
   * authenticate
   */
  public async authenticate() {
    try {
      await this.schema.authenticate();
      console.log("### Database Synced!!");
      console.log("Connection has been established successfully.");
      /*
                ** Add this line by replacing 25;
                * if Your Database is not syncing with SchemaChanges.
                await this.schema.sync({force: true});
             */
      await this.schema.sync({});
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}

export const db = new Database();
