import { Model } from "sequelize";
import { Schema } from "../../database/schema";
import { Feeder } from "./data-objects";

class FeedData {
  private async feedLanguages() {
    return await Schema.Languages.findByPk("hindi").then(
      async (m: Model<any, any> | null) => {
        if (m === null)
          return await Schema.Languages.bulkCreate(Feeder.Languages);
      }
    );
  }
  async feedPreConfiguedDataSets() {
    try {
      const resp = Promise.all([this.feedLanguages()]);
    } catch (error) {
      console.error({ error });
    }
  }
}

export const feeder = new FeedData();
