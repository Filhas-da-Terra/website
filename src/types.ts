export interface Project {
  id: number
  title: string
  description: string
  imageUrl: string | null
  projectUrl: string | null
}

export interface CarouselImage {
  name: string
  url: string
}

export interface Alert {
  id: number
  title: string
  message: string
  active: boolean
  startsAt: string | null
  endsAt: string | null
  imageUrl?: string | null
  videoUrl?: string | null
  linkUrl?: string | null
  linkLabel?: string | null
}

export type AlertPayload = {
  title: string
  message: string
  active: boolean
  startsAt?: Date
  endsAt?: Date
  imageUrl?: string
  videoUrl?: string
  linkUrl?: string
  linkLabel?: string
}

export type PublicAlert = {
  title: string
  message: string
  imageUrl?: string | null
  videoUrl?: string | null
  linkUrl?: string | null
  linkLabel?: string | null
}
