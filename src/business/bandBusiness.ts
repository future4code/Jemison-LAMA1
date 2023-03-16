import { BandDatabase } from "../data/bandDatabase";
import { BandClass } from "../model/class/bandClass";
import { Authenticator } from "../services/authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { BandInputDTO } from "../model/class/DTO/bandDTOs";
import { AuthenticationDataDTO } from "../model/class/DTO/authenticatonsDTO";

export default class BandBusiness {
    constructor(
        private bandDatabase: BandDatabase,
        private authenticator: Authenticator,
        private idGeneratator: IdGenerator
    ) { }

    public bandRegister = async (band: BandInputDTO, token: AuthenticationDataDTO) => {
        try {
            const handleId: string = "";
            const { name, music_genre, responsible } = band;
            if (!name || !music_genre || !responsible) {
                throw new Error(
                    "Insira corretamente os campos 'name', 'music_genre' and 'responsible'"
                );
            }
            if (!token) {
                throw new Error("Coloque um token através do headers");
            }
            const tokenData = this.authenticator.getTokenData(token);

            if (!tokenData) {
                throw new Error("Token Inválido");
            }
            if (tokenData.role !== "ADMIN") {
                throw new Error("Você não tem permissão para essa execução");
            }

            const id = this.idGeneratator.generateId();

            const newBand = new BandClass(id, name, music_genre, responsible);

            await this.bandDatabase.createBand(newBand);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}