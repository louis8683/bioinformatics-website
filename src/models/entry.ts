export interface Entry {
    id: number,
    userId: string,
    sessionId: number,
    timestamp: string,
    latitude: number,
    longitude: number,
    coLevel: number,
    pm2_5Level: number,
    temperature: number,
    humidity: number
}