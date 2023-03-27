
export class EventPhotosClass{
    constructor(
        private id:string,
        private user_id_fk:string,
        private photo_url:string,
    ){}
    public getId() {
        return this.id
    }
    public setId(newId: string) {
        this.id = newId
    }
    
    public getUserId() {
        return this.user_id_fk
    }
    public setUserId(newUserId: string) {
        this.user_id_fk = newUserId
    }
    
    public getPhotoUrl() {
        return this.photo_url
    }
    public setPhotoUrl(newPhotoUrl: string) {
        this.photo_url = newPhotoUrl
    }
}