const HTTPS = "https";
const HOST = "lux212.azurewebsites.net";
const PORT = "";
const VERSION = "Api";

// export const BASE_URL = HTTPS + "://" + HOST + ":" + PORT + "/" + VERSION + "/";
export const BASE_URL = HTTPS + "://" + HOST + "" + PORT + "/" + VERSION + "/";

export const Get_Game_Types_Post = BASE_URL + "GetGameTypes";
export const Get_Providers_Post = BASE_URL + "GetProviders";
export const Login_User_Post = BASE_URL + "login";
export const ADS_Post = BASE_URL + "Ads";
export const MyBankAccounts_Post = BASE_URL + "MyBankAccounts";
export const CreditAccount_Post = BASE_URL + "CreditAccount";