import callAPI from "../../config";

const ROOT_API = import.meta.env.VITE_APP_API_URL;

export async function sendImunisasi(data:any) {
  const URL = "imunisasi";

  const url = `${ROOT_API}/${URL}`;

  return callAPI({
    url,
    method: "POST",
    data,
  });
}

export async function sendUser(data:any) {
  const URL = "user";

  const url = `${ROOT_API}/${URL}`;

  return callAPI({
    url,
    method: "POST",
    data,
  });
}

export async function getImunisasi(limit:number, offset:number) {
  const URL = `imunisasi?limit=${limit}&offset=${offset}`;

  const url = `${ROOT_API}/${URL}`;

  return callAPI({
    url,
    method: "GET",
  });
}

export async function getImunisasiScaller(tahun:any,limit:number, offset:number) {
  const URL = `imunisasi/${tahun}/scaller?limit=${limit}&offset=${offset}`;

  const url = `${ROOT_API}/${URL}`;

  return callAPI({
    url,
    method: "GET",
  });
}

export async function getImunisasiFilter(tahun:any) {
  const URL = `imunisasi/${tahun}/filter`;

  const url = `${ROOT_API}/${URL}`;

  return callAPI({
    url,
    method: "GET",
  });
}

export async function getImunisasiModelData(tahun:any) {
  const URL = `imunisasi/${tahun}/model`;

  const url = `${ROOT_API}/${URL}`;

  return callAPI({
    url,
    method: "GET",
    // data
  });
}

export async function getUser(limit:number, offset:number) {
  const URL = `user?limit=${limit}&offset=${offset}`;

  const url = `${ROOT_API}/${URL}`;

  return callAPI({
    url,
    method: "GET",
  });
}

export async function getImunisasiById(id:string) {
  const URL = `imunisasi/${id}`;

  const url = `${ROOT_API}/${URL}`;

  return callAPI({
    url,
    method: "GET",
  });
}

export async function getUserById(id:string) {
  const URL = `user/${id}`;

  const url = `${ROOT_API}/${URL}`;

  return callAPI({
    url,
    method: "GET",
  });
}

export async function getPuskesmas() {
  const URL = `data-puskesmas`;

  const url = `${ROOT_API}/${URL}`;

  return callAPI({
    url,
    method: "GET",
  });
}

export async function getKecamatan(id:string) {
  const URL = `kecamatan/${id}`;

  const url = `${ROOT_API}/${URL}`;

  return callAPI({
    url,
    method: "GET",
  });
}

export async function getKelurahan(id:string) {
  const URL = `kelurahan/${id}`;

  const url = `${ROOT_API}/${URL}`;

  return callAPI({
    url,
    method: "GET",
  });
}

export async function getRole() {
  const URL = `role`;

  const url = `${ROOT_API}/${URL}`;

  return callAPI({
    url,
    method: "GET",
  });
}


// CARI DATA IMUNISASI
export async function getImunisasiKeyword(limit: number, offset: number,keyword:string) {
  const URL = `imunisasi?limit=${limit}&offset=${offset}&keyword=${keyword}`;

  const url = `${ROOT_API}/${URL}`;

  return callAPI({
    url,
    method: "GET",
  });
}

// CARI DATA USER
export async function getUserKeyword(limit: number, offset: number,keyword:string) {
  const URL = `user?limit=${limit}&offset=${offset}&keyword=${keyword}`;

  const url = `${ROOT_API}/${URL}`;

  return callAPI({
    url,
    method: "GET",
  });
}


export async function updateImunisasi(id:string, data:any) {
  const URL = `imunisasi/${id}`;

  const url = `${ROOT_API}/${URL}`;

  return callAPI({
    url,
    method: "PUT",
    data
  });
}

export async function updateUser(id:string, data:any) {
  const URL = `user/${id}`;

  const url = `${ROOT_API}/${URL}`;

  return callAPI({
    url,
    method: "PUT",
    data
  });
}

export async function deleteImunisasi(id:string) {
  const URL = `imunisasi/${id}`;

  const url = `${ROOT_API}/${URL}`;

  return callAPI({
    url,
    method: "DELETE",
  });
}

export async function deleteUser(id:string) {
  const URL = `user/${id}`;

  const url = `${ROOT_API}/${URL}`;

  return callAPI({
    url,
    method: "DELETE",
  });
}
