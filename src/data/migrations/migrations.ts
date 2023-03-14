import { TABLE_USERS, TABLE_BANDS, TABLE_SHOWS, TABLE_TICKETS, TABLE_TICKET_SALES } from './../tableNames';
import { BaseDatabase } from '../baseDatabase';
import users from './users.json';
import bands from './bands.json';
import shows from './shows.json';
import tickets from './tickets.json';
import ticketsSold from './ticketsSold.json';

export abstract class MigrationDataBase extends BaseDatabase {

    public static startMigration() {

        const createTables = async () => {
            await MigrationDataBase.connection.raw(`
             SET FOREIGN_KEY_CHECKS= 0;
 
                DROP TABLE IF EXISTS ${TABLE_USERS}, ${TABLE_BANDS}, ${TABLE_SHOWS}, ${TABLE_TICKETS}, ${TABLE_TICKET_SALES};
 
             SET FOREIGN_KEY_CHECKS= 1;

             CREATE TABLE IF NOT EXISTS ${TABLE_USERS}(
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
              );

              CREATE TABLE IF NOT EXISTS ${TABLE_BANDS}(
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL,
                music_genre VARCHAR(255) NOT NULL,
                responsible VARCHAR(255) UNIQUE NOT NULL 
              );

              CREATE TABLE IF NOT EXISTS ${TABLE_SHOWS}(
                id VARCHAR(255) PRIMARY KEY,
                week_day ENUM("sexta","sábado","domingo") NOT NULL,
                start_time INT NOT NULL,
                end_time INT NOT NULL,
                band_id_fk VARCHAR(255) NOT NULL,
                FOREIGN KEY(band_id_fk) REFERENCES ${TABLE_BANDS}(id)
              );

              CREATE TABLE IF NOT EXISTS ${TABLE_TICKETS}(
                id VARCHAR(255) PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                show_id_fk VARCHAR(255) NOT NULL,
                price DECIMAL (10, 2) NOT NULL,
                total_tickets INT NOT NULL,
                sold INT NOT NULL DEFAULT 0,
                FOREIGN KEY(show_id_fk) REFERENCES ${TABLE_SHOWS}(id)
              );

              CREATE TABLE IF NOT EXISTS ${TABLE_TICKET_SALES}(
              id VARCHAR(255) PRIMARY KEY,
              ticket_id_fk VARCHAR(255) NOT NULL,
              quantity INT NOT NULL,
              purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY(ticket_id_fk) REFERENCES ${TABLE_TICKETS}(id)
              );

            `)
                .then(() => {
                    console.log(`Tables created successfully!`)
                    insertData()
                })
                .catch((error: any) => console.log(error.sqlMessage || error.message))
        }
        const insertData = async () => {
            try {
                await MigrationDataBase.connection(`${TABLE_USERS}`)
                    .insert(users)
                    .then(() => console.log(`${TABLE_USERS} populated!`))
                    .catch((error: any) => printError(error))

                await MigrationDataBase.connection(`${TABLE_BANDS}`)
                    .insert(bands)
                    .then(() => console.log(`${TABLE_BANDS} populated!`))
                    .catch((error: any) => printError(error))


                await MigrationDataBase.connection(`${TABLE_SHOWS}`)
                    .insert(shows)
                    .then(() => console.log(`${TABLE_SHOWS} populated!`))
                    .catch((error: any) => printError(error))

                await MigrationDataBase.connection(`${TABLE_TICKETS}`)
                    .insert(tickets)
                    .then(() => console.log(`${TABLE_TICKETS} populated!`))
                    .catch((error: any) => printError(error))

                await MigrationDataBase.connection(`${TABLE_TICKET_SALES}`)
                    .insert(ticketsSold)
                    .then(() => console.log(`${TABLE_TICKET_SALES} populated!`))
                    .catch((error: any) => printError(error))

            } catch (error: any) {
                console.log(error.sqlMessage || error.message)
            } finally {
                console.log("Ending connection!")

                return MigrationDataBase.connection.destroy()
            }
        }

        const printError = (error: any) => {
            console.log(error.sqlMessage || error.message)
        }

        createTables()

    }
}

MigrationDataBase.startMigration()
