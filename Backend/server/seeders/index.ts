import { Model } from "sequelize";
import { v4 } from "uuid";
import { Schema } from "../../database/schema";
import { Feeder } from "./data-objects";

type DB_VALS = Model<any, any>[] | Model<any, any> | null;

class FeedData {
  private async feedLanguages() {
    return await Schema.Languages.findByPk("hindi").then(async (m: DB_VALS) => {
      if (m === null)
        return await Schema.Languages.bulkCreate(Feeder.Languages);
    });
  }

  private async feedCastes() {
    const castes: DB_VALS = await Schema.Caste.findAll();
    if (castes.length === 0) {
      const finalPayload: {
        id: string,
        caste: string;
        subCaste: string;
      }[] = [];

      Feeder.Castes.forEach((cas) => {
        if (cas.subCaste.length > 0) {
          cas.subCaste.forEach((c) => {
            finalPayload.push({
              id: v4(),
              ...cas,
              subCaste: c,
            });
          });
        } else {
          finalPayload.push({
            id: v4(),
            ...cas,
            subCaste: "",
          });
        }
      });

      await Schema.Caste.bulkCreate(finalPayload);
    }
  }

  async feedPreConfiguedDataSets() {
    try {
      const resp = Promise.all([this.feedLanguages(), this.feedCastes()]);
    } catch (error) {
      console.error({ error });
    }
  }
}

export const feeder = new FeedData();
