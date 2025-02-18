import clientPromise from "@/lib/mongodb";

export async function POST(request) {
    let body = await request.json()
    let handle = body.handle
    let desc = body.desc
    let link = body.links
    let img = body.img
    let client = await clientPromise
    const db = client.db("linktree")
    let collection = db.collection("links")

    let duplicate = await collection.findOne({handle})
    if (handle == "") {
        return Response.json({ status: "blank", msg:"Please Enter Some Value" })
    }
    if (duplicate) {
        return Response.json({ status: false, msg:"data not inserted" })
    }else{
       await collection.insertOne({handle,link,desc,img})
       return Response.json({ status: true,msg: "Data Inserted" })
    }


    
    
}