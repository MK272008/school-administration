import { storage } from '@/lib/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react'

export default function dikkat() {
    const [file, setFile] = useState<File|null>(null)
  return (
    <div>
        {/* @ts-ignore */}
        <input type="file" onChange={e => setFile( e.target.files[0])} />
        <button onClick={e => submit(file)}>ye</button>
    </div>
  )
}

async function submit(file: File|null) {

    const data = { email: "kumarmoney272008@gmail.com"}

    const bucket = ref(storage, `/users/profile-pics/${data.email}`);

    await uploadBytes(bucket, file as Blob);
    const downloadURL = await getDownloadURL(bucket);

    console.log( downloadURL)
  }
