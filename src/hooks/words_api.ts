import { IWord } from "../models/word";
import {IUser} from "../models/user";
import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { ILanguage } from "../models/language";

async function fetchData(input:RequestInfo,init?:RequestInit) {
    const response = await fetch(input,init);
    
    if (response.ok){
        return  response;
    }else{
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        if (response.status ===401) {
            throw new UnauthorizedError(errorMessage);
        } else if (response.status === 409) {
            throw new ConflictError(errorMessage);
        }else{
           throw Error("Request failed.Status:"+response.status+". Error:"+errorMessage);  
        }
       
    }
}


export async function getLoggedUser(): Promise<IUser> {
    
    const response = await fetchData("/api/user",{method:'GET'})
    return response.json();
}

export async function getUsers(): Promise<IUser[]> {
    
    const response = await fetchData("/api/user/users",{method:'GET'})
    return response.json();
}

export interface IUserInput{
    email?:string,
    rights?:string,
    password?:string,
}

export async function updateUser(userId:string,user:IUserInput) :Promise<IUser> {
    const response = await fetchData("/api/user/users/"+userId, {
        method:'PATCH',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    }); 
    return  response.json();//await
}

export interface ISignUpCredentials{
    username:string,
    password:string,
    email: string,
}

export async function signUp(credentials:ISignUpCredentials): Promise<IUser> {
    const response = await fetchData("api/user/signup",{
        method:'POST',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

export interface ILoginCredentials{
    username:string,
    password:string,
}

export async function login(credentials:ILoginCredentials): Promise<IUser> {
    const response = await fetchData("api/user/login",{
        method:'POST',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

export async function logout() {
    
    await fetchData("/api/user/logout",{method:'POST'})
   
}

export async function fetchWords():Promise<IWord[]>{
    const response = await fetchData("/api/words", {method:'GET'});
    return   response.json();//await
}

export interface IWordInput{
    title:string,
    language:string,
}
export async function createWord(word:IWordInput):Promise<IWord> {
    const response = await fetchData("/api/words/", {
        method:'POST',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(word)
    });
    return  response.json();//await
}

export async function updateWord(wordId:string,word:IWordInput) :Promise<IWord> {
   
    const response = await fetchData("/api/words/"+wordId, {
        method:'PATCH',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(word)
    }); 
    return  response.json();//await
}

export async function deleteWord(wordId:string) {
     await fetchData("/api/words/"+wordId, {
        method:'DELETE',
    });    
}

export interface ILangInput{
    name:string,
}

export async function createLang(language:ILangInput):Promise<ILanguage> {
    const response = await fetchData("/api/lang/", {
        method:'POST',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(language)
    });
    return  response.json();//await
}

export async function updateLang(langId:string,language:ILangInput) :Promise<ILanguage> {
    const response = await fetchData("/api/lang/"+langId, {
        method:'PATCH',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(language)
    }); 
    return  response.json();//await
}

export async function fetchLanguages():Promise<ILanguage[]>{
    const response = await fetchData("/api/lang", {method:'GET'});
    return   response.json();//await
}
export async function fetchLanguagesview():Promise<ILanguage[]>{
    const response = await fetchData("/api/lang/view", {method:'GET'});
    return   response.json();//await
}