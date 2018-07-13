class Api {
    static ApiToken = "quotes-for-life-21234343dfrf23w";  //"kpS7JwowMbmsh6ZFAbCRAFdzkfS8p1EYgggjsnC99YQvV8spp3";
    static ApiUrl = "http://192.168.100.12";  //"https://andruxnet-random-famous-quotes.p.mashape.com/";
    
    static post (type, action, param) {
        var inputs = new FormData();
        inputs.append("TOKEN", this.ApiToken);
        inputs.append("TYPE", type);
        inputs.append("ACTION", action);

        for (var key in param){
            inputs.append(key, param[key]);
        }

        return fetch(this.ApiUrl+"/api/q/api.php",{
            method: 'POST',
            body: inputs
        })
        .then((res)=>res.json())
        .then((resJSON)=>{ return resJSON;})
        .catch((err)=>err);
    }

    static get (type, action, param) {

    }

}

//module.exports = Api;
export default Api;