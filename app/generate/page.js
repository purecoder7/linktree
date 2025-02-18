"use client";
import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

function SearchParamsWrapper({ sethandle }) {
    const search = useSearchParams();
    React.useEffect(() => {
        sethandle(search.get("handle") ?? "");
    }, [search, sethandle]);

    return null;
}

function Generate() {
    const [links, setlinks] = useState([{ link: "", text: "" }]);
    const [handle, sethandle] = useState("");
    const [img, setimg] = useState("");
    const [desc, setdesc] = useState("");
    const [treeurl, settreeurl] = useState("");

    const addMore = () => {
        setlinks(links.concat([{ link: "", text: "" }]));
    };

    const handleChange = (index, key, value) => {
        setlinks((initialLink) =>
            initialLink.map((item, i) => (i === index ? { ...item, [key]: value } : item))
        );
    };

    const createTree = async () => {
        let headersList = {
            Accept: "*/*",
            "Content-Type": "application/json",
        };

        let bodyContent = JSON.stringify({
            handle,
            desc,
            links,
            img,
        });

        let nexturl = process.env.NEXT_PUBLIC_URL;

        let response = await fetch(`${nexturl}/api/add`, {
            method: "POST",
            body: bodyContent,
            headers: headersList,
        });

        let data = await response.json();
        console.log(data.msg);

        sethandle("");
        setdesc("");
        setimg("");
        setlinks([]);
        if (data.status == "blank") {
            toast.error("Enter Required Fields");
        }
        if (data.status == true) {
            toast.success("Linktree Created");
            settreeurl(`${nexturl}/${handle}`);
        }
        if (data.status == false) {
            toast.error("Handle Already Claimed");
        }
    };

    return (
        <div className="bgreen min-h-screen p-6 md:p-16 lg:p-24 flex flex-col items-center">
            <Suspense fallback={<div>Loading...</div>}>
                <SearchParamsWrapper sethandle={sethandle} />
            </Suspense>

            <div className="w-full max-w-lg mt-4">
                <div className="pt-5">
                    <label className="text-white">Handle</label> <br />
                    <input
                        value={handle}
                        onChange={(e) => sethandle(e.target.value)}
                        className="mt-2 rounded-lg h-10 text-black p-2 w-full"
                        type="text"
                    />
                </div>

                <div className="pt-5">
                    <label className="text-white">Links</label> <br />
                    {links.map((item, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-2">
                            <input
                                onChange={(e) => handleChange(index, "text", e.target.value)}
                                className="mt-2 rounded-lg h-10 text-black p-2 w-full md:w-40"
                                type="text"
                                placeholder="Link Text"
                            />
                            <input
                                onChange={(e) => handleChange(index, "link", e.target.value)}
                                className="mt-2 rounded-lg h-10 text-black p-2 w-full md:w-80"
                                type="text"
                                placeholder="Paste Link"
                            />
                        </div>
                    ))}
                    <button onClick={addMore} className="text-white rounded-lg h-10 bg-slate-800 w-full md:w-16 mt-2">
                        + Add
                    </button>
                </div>

                <div className="pt-5">
                    <label className="text-white">Image</label> <br />
                    <input
                        value={img}
                        onChange={(e) => setimg(e.target.value)}
                        className="mt-2 rounded-lg h-10 text-black p-2 w-full"
                        type="text"
                        placeholder="URL of Image"
                    />
                </div>

                <div className="pt-5">
                    <label className="text-white">Desc</label> <br />
                    <input
                        value={desc}
                        onChange={(e) => setdesc(e.target.value)}
                        className="mt-2 rounded-lg h-10 text-black p-2 w-full"
                        type="text"
                        placeholder="Description"
                    />
                </div>

                <button onClick={createTree} className="rounded-lg h-10 bg-green-500 text-black w-full md:w-52 mt-4">
                    Create Linktree
                </button>

                <div className="mt-4">
                    <a href={treeurl}>{treeurl}</a>
                </div>
            </div>
        </div>
    );
}

export default Generate;
