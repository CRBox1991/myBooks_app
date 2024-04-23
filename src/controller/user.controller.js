const { response } = require("../app");
const {connection} = require("../database")

const postUser = async (request, response) =>
{
    try
    {        
    let sql = "INSERT INTO user (name, last_name, email, photo, password) VALUES ('" +     request.body.name + "', '" +
                                                                                           request.body.last_name + "', '" +
                                                                                           request.body.email + "', '" +
                                                                                           request.body.photo + "', '" +
                                                                                           request.body.password + "')"
    let [result] = await connection.query(sql)

    if(result.insertId){

    response.send(String(result.insertId))
    } else 
    {
    response.send("-1")
    }
    }
    catch(error)
    {
        console.log(error);
    }
}

const postUserLogin = async (request, response) =>
{
    try
    {     
                
        let params = [request.body.email, request.body.password]           
        sql = "SELECT user_id, name, last_name, email, photo FROM user WHERE email = ? AND password = ?";
        let [result] = await connection.query(sql, params)
        console.log(result);          
        
        if(result.length > 0)
        {
            response.send(result)
        } else 
        {
            console.log("Los datos no son correctos")
        }
        
    }
    catch(error)
    {
        console.log(error);
    }
}

const putUsuario = async (request, response) =>
{
    try{
        let params =[request.body.user_id]
        let sql = "SELECT user_id FROM user WHERE user_id = ?"
        let [result] = await connection.query(sql, params)

        console.log(result[0]);
        if(result[0] != undefined){
            if (request.body.name == ""){
                request.body.name = undefined;
            }
            if (request.body.last_name == ""){
            request.body.last_name = undefined;
            }
            if (request.body.email == ""){
            request.body.email = undefined;
            }
            if (request.body.photo == ""){
            request.body.photo = undefined;
            }
            params = [
                request.body.name,
                request.body.last_name,
                request.body.email,
                request.body.photo,
                request.body.user_id]
            sql = "UPDATE user SET name = COALESCE(?, name), last_name = COALESCE(?, last_name), email = COALESCE(?, email), photo = COALESCE(?, photo)  "
             +  " WHERE user_id = ?;";
            [result] = await connection.query(sql, params);
            console.log(result)


            respuesta = {error: false, codigo: 200, message: 'This user has been edited succesfully.', dataUser: result[0]}
            }
        else{
            respuesta = {error: true, codigo: 200, message: 'The user has not been found'}
        }
        response.send(respuesta); 
    }
    catch(error){
        console.log(error);
    }
}




module.exports = {postUser, postUserLogin, putUsuario}