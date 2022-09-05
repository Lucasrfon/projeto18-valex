import { findByApiKey } from "../repositories/companyRepository"

export async function isValidAPIKey(APIKey: string) {
    const apiKey = await findByApiKey(APIKey)
    if(apiKey) {
        return apiKey
    }
    throw { type: "unauthorized", message: "Invalid API Key" }
}