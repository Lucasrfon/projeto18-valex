import { findByApiKey } from "../repositories/companyRepository"

export async function isValidAPIKey(APIKey: string) {
    if(await findByApiKey(APIKey)) {
        return
    }
    throw { type: "unauthorized", message: "Invalid API Key" }
}