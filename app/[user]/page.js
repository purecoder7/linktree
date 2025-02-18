import clientPromise from "@/lib/mongodb"
import { notFound } from "next/navigation"


export default async function Page({ params }) {
    const slug = (await params).user
    let client = await clientPromise
    const db = client.db("linktree")
    let collection = db.collection("links")

    let data = await collection.findOne({handle: slug})
    if (data) {
        console.log(data);  
    } else {
        return notFound()
        
    }
    

    return (
        <>
            <div className="mt-24">
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
                    <div className="max-w-md w-full flex flex-col items-center bg-gray-800 p-6 rounded-2xl shadow-lg">
                        {/* Profile Section */}
                        <img
                            src={data.img}
                            alt="Profile"
                            className="w-24 h-24 rounded-full border-4 border-gray-600"
                        />
                        <h2 className="mt-4 text-xl font-semibold">{data.handle}</h2>
                        <p className="text-gray-400">{data.desc}</p>

                        {/* Links Section */}
                        
                        <div className="w-full mt-6 space-y-4">
                            {data.link && data.link.map((link, index) => (
                            
                                <a
                                    key={index}
                                    href={link.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full text-center py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
                                >
                                    {link.text}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}