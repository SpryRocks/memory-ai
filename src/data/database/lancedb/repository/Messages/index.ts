import {Field, Schema, Utf8} from "apache-arrow";
import {Table} from "@lancedb/lancedb";

import {IConversationMessage} from "@/types";

import {getConnection} from "../../utils";

type IGetMessagesResult = IConversationMessage[];

const TABLE_NAME = "messages";

enum Fields {
  Id = "id",
  Question = "question",
  Answer = "answer",
  CreatedAt = "createdAt",
}

type IDbMessage = {
  [Fields.Id]: string;
  [Fields.Question]: string;
  [Fields.Answer]: string;
  [Fields.CreatedAt]: string;
}

class MessagesRepository {
  private table: Table | undefined;

  public async createTable(): Promise<void> {
    const db = await getConnection();

    const schema = new Schema([
      new Field(Fields.Id, new Utf8(), false),
      new Field(Fields.Question, new Utf8(), false),
      new Field(Fields.Answer, new Utf8(), false),
      new Field(Fields.CreatedAt, new Utf8(), false),
    ]);

    this.table = await db.createTable({
      name: TABLE_NAME,
      schema,
      data: [],
    });
  }

  public async dropTable(): Promise<void> {
    const db = await getConnection();

    await db.dropTable(TABLE_NAME);
  }

  private async getTable(): Promise<Table> {
    const db = await getConnection();

    if (!this.table) {
      this.table = await db.openTable(TABLE_NAME);
    }

    return this.table;
  }

  async addMessage(message: IConversationMessage) {
    const table = await this.getTable();

    const dbMessage: IDbMessage = {
      [Fields.Id]: message.id,
      [Fields.Question]: message.question,
      [Fields.Answer]: message.answer,
      [Fields.CreatedAt]: message.createdAt.toISOString(),
    }

    await table.add([dbMessage]);
  }

  async getMessages(): Promise<IGetMessagesResult> {
    const table = await this.getTable();

    const entries: IDbMessage[] = await table
      .query()
      .orderBy({columnName: Fields.CreatedAt})
      .limit(20)
      .toArray()

    return entries.map(db => ({
      id: db[Fields.Id],
      question: db[Fields.Question],
      answer: db[Fields.Answer],
      createdAt: new Date(db[Fields.CreatedAt]),
    }));
  }
}

export const messagesRepository = new MessagesRepository();
