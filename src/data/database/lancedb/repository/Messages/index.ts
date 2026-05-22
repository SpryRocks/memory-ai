import {Field, Schema, Utf8} from "apache-arrow";
import {Table} from "@lancedb/lancedb";

import {getConnection} from "../../utils";

interface IAddMessageOptions {
  question: string;
  answer: string;
}

enum Fields {
  Question = "question",
  Answer = "answer",
}

class MessagesRepository {
  private table: Table | undefined;

  private async getTable(): Promise<Table> {
    const db = await getConnection();

    if (!this.table) {
      const schema = new Schema([
        new Field(Fields.Question, new Utf8(), false),
        new Field(Fields.Answer, new Utf8(), false),
      ]);

      this.table = await db.createTable({
        name: "messages",
        schema,
        data: [],
        existOk: true,
      });
    }

    return this.table;
  }

  async addMessage(options: IAddMessageOptions) {
    const table = await this.getTable();

    await table.add([{
      [Fields.Question]: options.question,
      [Fields.Answer]: options.answer,
    }]);
  }
}

export const messagesRepository = new MessagesRepository();
