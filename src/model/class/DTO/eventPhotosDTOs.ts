
export class CreateEventPhotosInputDTO{
  constructor(
    private photoUrl:string
  ){}
public getPhotoUrl(){
    return this.photoUrl
}
}


export class ReturnGetPhotoDTO {
    constructor(
        public photoId: string,
        public userId : string,
        public userName:string,
        public photoUrl:string,
        public postTime:string   
    ) { }
}

export class ReturnCreateEventPhotosDTO {
    constructor(
        public message: string
    ) { }
}