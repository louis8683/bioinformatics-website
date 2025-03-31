export interface Session {
    id: number
    userId: string
    groupName: string | null
    className: string
    schoolName: string
    deviceName: string | null
    startTimestamp: number
    endTimestamp: number | null
    title: string
    description: string | null
  }