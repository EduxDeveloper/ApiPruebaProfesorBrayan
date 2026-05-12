import app from "./app.js"
import database from "./database.js"

async function main(){
    app.listen(4000)
    console.log("server on port 4000")
}

main()