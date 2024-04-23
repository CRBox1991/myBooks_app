const { response } = require("../app");
const {connection} = require("../database")


const getBooks = async (request, response) =>
{
    try
    {   let sql;
        if (request.query.user_id != null && request.query.book_id == null) {
            let params = [request.query.user_id]
            sql = "SELECT * FROM book WHERE book.user_id=?"
            let [result] = await connection.query(sql, params)  
            response.send(result)
            console.log(result);
            console.log(request.query.user_id);
        } else {
            let params = [request.query.user_id, request.query.book_id]    
            sql = "SELECT * FROM book WHERE user_id =? AND book_id=?"  
            let [result] = await connection.query(sql, params)  
            response.send(result) 
            console.log(result);   
        }
    }
    catch(error)
    {
        console.log(error);
    } 

}

const postBook = async (request, response) =>
{
    try
    {   
         
        let params = [request.body.user_id,request.body.title, request.body.type, request.body.author, request.body.price, request.body.photo];
        let sql = "INSERT INTO book (user_id, title, type, author, price, photo) VALUES (?,?,?,?,?,?)";

        let [result] = await connection.query(sql,params);
        console.log(result);
        response.send(result);
    }
    catch(error)
    {
        console.log(error);
    }
    // mongodb+srv://dharianfenix:<password>@mongoatlas.kcg5bad.mongodb.net/


}

const putBook = async (request, response) =>
{
    try
    {   
            let params = [request.body.title, request.body.type, request.body.author, request.body.price, request.body.photo, request.body.book_id, request.body.user_id]
            let sql = "UPDATE book SET title=?, type=?, author=?, price=?, photo=? WHERE book_id=? AND user_id=?";
            let [result] = await connection.query(sql, params);
            
            console.log(result);
            response.send(result)
            
    }
    catch(error)
    {
        console.log(error);
    }
}

const deleteBook = async (request,response) =>
{
    try
    {   
        let params = [request.body.book_id]
        let sql = "DELETE FROM book WHERE book_id = ?"
        let [result] = await connection.query(sql, params)
        console.log(result);
        response.send(result)
        
    }
    catch(error)
    {
        console.log(error);
    }
    
}



module.exports = {getBooks, postBook, deleteBook, putBook}