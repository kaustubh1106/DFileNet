import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
const crypto = require('crypto-js')
const Addfile = ({ Contract }) => {
    const { id } = useParams()
    //console.log(typeof(Number(id)))
    const [files, setfiles] = useState([])
    const [file, setfile] = useState(null)
    const [filename, setfilename] = useState(null)
    useEffect(() => {
        getfiles()
        //console.log(files)
    }, [Contract])
    const handleinput = (e) => {
        setfile(e.target.files[0])
        setfilename(e.target.files[0].name)
        console.log(typeof (e.target.files[0].name))
    }
    const uploadfile = async () => {
        //console.log("ok")
        const secretkey = crypto.lib.WordArray.random(32)
        const secretKeyHex = secretkey.toString(crypto.enc.Hex);
        //setsc(secretkey)
        console.log(typeof (secretKeyHex))
        const iv = crypto.lib.WordArray.random(16)
        const ivHex = iv.toString(crypto.enc.Hex);
        //setiv(iv)
        const abc = await Contract.showgroups()

        console.log(abc)
        try {
            //console.log("ok")
            const abc = await encryptionoffile(secretkey, iv);
            const enc_file = new File([abc], "pre")
            const res = await uploadenctopinata(enc_file)

            await Contract.addfile(Number(id) - 1, filename, res, secretKeyHex, ivHex)

            alert("File added to the Group successfully!")
            //setpindata(res)
        } catch (error) {
            console.log(error);
        }
    }
    // const test = async()=>{
    //     await Contract.addfile(id,filename, res, secretkey, iv)
    // }
    const encryptionoffile = (secretkey, iv) => {
        //console.log("ok")
        if (!file) {
            return
        }
        else {
            return filetoarraybuffer(file)
                .then((res) => {
                    //console.log(res)
                    const wordarrayfile = crypto.lib.WordArray.create(res)
                    ///console.log(wordarrayfile)
                    if (secretkey && iv) {
                        const encryptedfile = crypto.AES.encrypt(wordarrayfile, secretkey, { iv })   //iv is optional thats why {} are used
                        //console.log(encryptedfile)
                        //console.log(encryptedfile.toString())
                        console.log(encryptedfile)
                        const encrpfileblog = new Blob([encryptedfile])
                        console.log(encrpfileblog)
                        return encrpfileblog;
                    }
                    return
                })
                .catch((error) => {
                    console.log("error ", error)
                    return
                })
        }
    }
    const filetoarraybuffer = (file1) => {
        return new Promise((resolve, reject) => {       //retunr nhi karwa rha tha

            const reader = new FileReader()

            reader.readAsArrayBuffer(file1)
            reader.onload = () => {
                const filebuff = reader.result
                //console.log(filebuff)
                resolve(filebuff)
            }
            reader.onerror = (error) => {
                console.log("some error occured")
                reject(error)
            }
        })
    }
    const abc = process.env.REACT_APP_api_key
    const pqr = process.env.REACT_APP_secret_api_key
    console.log(abc)
    const uploadenctopinata = async (file) => {
        try {
            const formData = new FormData();
            // const uniqueName = `file_${Data.now()}_${file.name}`
            formData.append("file", file);
            console.log("ok")
            const response = await axios.post(
                "https://api.pinata.cloud/pinning/pinFileToIPFS",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        pinata_api_key: `${abc}`,
                        pinata_secret_api_key: `${pqr}`,
                    },
                }
            );
            return response.data.IpfsHash
            //console.log("File uploaded to Pinata:", response.data.IpfsHash);
        } catch (error) {
            console.error("Error uploading file to Pinata:", error);
        }

    }
    const getfiles = async () => {
        if (Contract) {
            const length = await Contract.length(Number(id) - 1);
            console.log(length)
            const results1 = []
            if (length > 0) {
                for (let i = 0; i < Number(length); i++) {
                    const abc = await Contract.showfiles1(Number(id) - 1, i);
                    results1.push(abc)
                }
            }

            //
            setfiles(results1)
            console.log(results1)
        }

    }
    console.log(files, "hello")


    //---------->for decryption

    const downloadfile = async (CID, sc, iv) => {
        console.log(typeof (sc))
        console.log((sc))
        const parsedSecretKey = crypto.enc.Hex.parse(sc)
        const parsediv = crypto.enc.Hex.parse(iv)

        const response = await axios.get(`${process.env.REACT_APP_gateway}/${CID}`, {
            responseType: "blob",
        })
        console.log(response.data)

        const encFileBlob = new Blob([response.data], {
            type: "application/octet-stream",
        });

        const textFromBlob = await getFileAsTextFromBlob(encFileBlob);
        const decryptedFile = await AESDecryptFile(textFromBlob, parsedSecretKey, parsediv);
        const uintArr = convertWordArrayToUint8Array(decryptedFile);
        const decryptedFileObject = new File([uintArr], "abc.png");
        console.log(decryptedFileObject)
        downloadFile(decryptedFileObject)
        return decryptedFileObject
    }

    function downloadFile(file) {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(file); // Create a URL for the File object
        a.download = file.name; // Set the file name for the download
        a.style.display = "none"; // Hide the anchor element
        document.body.appendChild(a); // Add the anchor element to the DOM
        a.click(); // Trigger a click event on the anchor element
        URL.revokeObjectURL(a.href); // Clean up the URL object to free resources
        document.body.removeChild(a); // Remove the anchor element from the DOM
    }


    function convertWordArrayToUint8Array(wordArray) {
        var arrayOfWords = wordArray.hasOwnProperty("words") ? wordArray.words : [];
        var length = wordArray.hasOwnProperty("sigBytes")
            ? wordArray.sigBytes
            : arrayOfWords.length * 4;
        var uInt8Array = new Uint8Array(length),
            index = 0,
            word,
            i;
        for (i = 0; i < length; i++) {
            word = arrayOfWords[i];
            uInt8Array[index++] = word >> 24;
            uInt8Array[index++] = (word >> 16) & 0xff;
            uInt8Array[index++] = (word >> 8) & 0xff;
            uInt8Array[index++] = word & 0xff;
        }
        return uInt8Array;
    }

    const AESDecryptFile = async (encryptedFile, secretKey, iv) => {
        var decrypted = crypto.AES.decrypt(encryptedFile, secretKey, {
            iv: iv,
        });
        return decrypted;
    };


    function getFileAsTextFromBlob(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                resolve(e.target?.result);
            };
            reader.onerror = reject;
            reader.readAsText(blob);
        });
    }

    return (
        <div>
            <div className="mb-3">
                <button className="btn btn-outline-success" type="submit" >
                    <Link to={`/joinedgroup/addmember/${id}`} className='btn btn-primary mylink'>Add Members</Link>
                </button>
                <label htmlFor="formFile" className="form-label">
                 
                </label>
                <input className="form-control" type="file" id="formFile" onChange={handleinput} />
                <button type="button" class="btn btn-light" onClick={uploadfile}>Uplaod</button>
            </div>
            {files?.map((log) => {
                return (
                    <>
                        <button type="button" class="btn btn-light" onClick={() => { downloadfile(log[1], log[2], log[3]) }}><h3>{log[0]}</h3> CID: {log[1]}</button>

                    </>
                )
            })}
        </div>
    )
}

export default Addfile