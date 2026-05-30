import { MigrationFn } from 'umzug';
import {messagesRepository} from "../repository";

export const up: MigrationFn = async () => {
  await messagesRepository.createTable();
};

export const down: MigrationFn = async () => {
  await messagesRepository.dropTable();
};
