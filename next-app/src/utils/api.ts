export class APIEndpoint{

    private url: string

    constructor(url?:string){
        this.url = url ? url : 'http://localhost:5000/api/'
    }

    private async makeRequest<T>(method: string, endpoint: string, data?: any){
        const url = `${this.url}${endpoint}`
        const options: RequestInit = {
            method: method,
            credentials: 'include'
        }
        if (data){
            if (data instanceof FormData) {
                options.body = data;
              } else {
                const formData = new FormData();
                
                for (const key in data) {
                  formData.append(key, data[key]);
                }
                options.body = formData;
              }
        }

        try{
            // console.log(options)
            const response = await fetch(url, options)
            const responseData: T = await response.json()
            return responseData
        }
        catch(err){
            console.error(err)
            throw err
        }
    }

    public async post<T>(endpoint: string, data: any): Promise<T>{
        return this.makeRequest('POST', endpoint, data)
    }

    public async get<T>(endpoint: string): Promise<T>{
        return this.makeRequest('GET', endpoint)
    }

}