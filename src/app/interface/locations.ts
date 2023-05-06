export interface Locations {
    ClinicName: string
    Address1: string
    Address2: string
    PhoneNumber: string
    Distance: string
    OperationHours1: any
    OperationHours2: any
    OperationHours3: any
    location: Location
  }
  
  export interface Location {
    lat: number
    lng: number
  }